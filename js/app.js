/* =====================================================
   学习管理系统 - 应用逻辑
   无框架、无外部依赖，数据持久化在 localStorage
   ===================================================== */

(function () {
  'use strict';

  const STORE_KEY = 'lms_v1';
  const $ = sel => document.querySelector(sel);

  /* ---------- 数据层 ---------- */
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.progress && s.settings) return s;
      }
    } catch (e) { /* 损坏则重建 */ }
    return buildSeedState();
  }

  function save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  function resetAll() {
    localStorage.removeItem(STORE_KEY);
    state = loadState();
    save();
  }

  /* ---------- 工具函数 ---------- */
  const courses = () => window.SEED_COURSES;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function isoDate(d) {
    const x = d instanceof Date ? d : new Date(d);
    return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  }
  const today = () => isoDate(new Date());
  const dayOffset = n => isoDate(new Date(Date.now() - n * 86400000));

  function fmtDateCN(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return y + '年' + m + '月' + d + '日';
  }
  function fmtMD(iso) {
    const [, m, d] = iso.split('-');
    return Number(m) + '/' + Number(d);
  }
  function fmtDuration(min) {
    if (min < 60) return min + ' 分钟';
    const h = Math.floor(min / 60), m = min % 60;
    return m === 0 ? h + ' 小时' : h + ' 小时 ' + m + ' 分';
  }
  function fmtTime(ts) {
    const d = new Date(ts);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function genId(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ---------- 业务查询 ---------- */
  function flatLessons(course) {
    const list = [];
    course.chapters.forEach(ch => ch.lessons.forEach(l => list.push({ lesson: l, chapter: ch })));
    return list;
  }
  function courseById(id) { return courses().find(c => c.id === id); }

  function courseProgress(course) {
    const list = flatLessons(course);
    const done = list.filter(x => isDone(x.lesson.id)).length;
    return { total: list.length, done, pct: list.length ? Math.round(done / list.length * 100) : 0 };
  }
  function courseMinutes(course) {
    return flatLessons(course).reduce((s, x) => s + x.lesson.duration, 0);
  }
  function isDone(lessonId) {
    return !!(state.progress[lessonId] && state.progress[lessonId].completed);
  }
  function totalStats() {
    let totalLessons = 0, totalDone = 0, totalMin = 0;
    courses().forEach(c => {
      const p = courseProgress(c);
      totalLessons += p.total; totalDone += p.done;
    });
    Object.values(state.studyLog).forEach(v => totalMin += v);
    const finishedCourses = courses().filter(c => courseProgress(c).pct === 100).length;
    return { totalLessons, totalDone, totalMin, finishedCourses };
  }
  function streakDays() {
    let n = 0;
    // 今天没学不打断昨天的连续记录（从今天开始算，若今天为 0 则从昨天起算）
    let start = 0;
    if (!(state.studyLog[today()] > 0)) start = 1;
    for (let i = start; ; i++) {
      if ((state.studyLog[dayOffset(i)] || 0) > 0) n++;
      else break;
      if (i > 3650) break;
    }
    return n;
  }
  function nextLessonOf(course) {
    return flatLessons(course).find(x => !isDone(x.lesson.id));
  }
  function currentLessonTarget() {
    if (state.lastLessonId) {
      const hit = findLessonEverywhere(state.lastLessonId);
      if (hit && !isDone(hit.lesson.id)) return hit;
    }
    for (const c of courses()) {
      const nx = nextLessonOf(c);
      if (nx) return nx;
    }
    return null;
  }
  function findLessonEverywhere(lessonId) {
    for (const c of courses()) {
      const hit = flatLessons(c).find(x => x.lesson.id === lessonId);
      if (hit) return { ...hit, course: c };
    }
    return null;
  }

  /* ---------- 操作 ---------- */
  function toggleComplete(lessonId) {
    const hit = findLessonEverywhere(lessonId);
    if (!hit) return;
    const p = state.progress[lessonId] || {};
    if (p.completed) {
      p.completed = false;
      state.progress[lessonId] = p;
      save();
      toast('已取消该课时的学完状态');
    } else {
      state.progress[lessonId] = { completed: true, completedAt: Date.now() };
      const t = today();
      state.studyLog[t] = (state.studyLog[t] || 0) + hit.lesson.duration;
      save();
      toast('🎉 学完「' + hit.lesson.title + '」，记入今日 ' + hit.lesson.duration + ' 分钟');
    }
  }

  function addNote(lessonId, content) {
    const hit = findLessonEverywhere(lessonId);
    if (!hit || !content.trim()) return;
    state.notes.unshift({
      id: genId('n'), lessonId, courseId: hit.course.id,
      content: content.trim(), createdAt: Date.now()
    });
    save();
    toast('笔记已保存');
  }
  function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    save();
    toast('笔记已删除');
  }

  function addTodo(title, deadline) {
    if (!title.trim()) return;
    state.todos.unshift({ id: genId('t'), title: title.trim(), deadline, done: false, createdAt: Date.now() });
    save();
    toast('已添加学习任务');
  }
  function toggleTodo(id) {
    const t = state.todos.find(x => x.id === id);
    if (!t) return;
    t.done = !t.done;
    save();
  }
  function deleteTodo(id) {
    state.todos = state.todos.filter(t => t.id !== id);
    save();
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ---------- UI 临时状态 ---------- */
  const ui = { category: '全部', keyword: '', noteDraft: {} };

  /* ---------- 路由 ---------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    let page = parts[0] || 'dashboard';
    const main = $('#main');
    window.scrollTo(0, 0);

    try {
      if (page === 'dashboard') renderDashboard(main);
      else if (page === 'courses') renderCourses(main);
      else if (page === 'course' && parts[1]) renderCourseDetail(main, parts[1]);
      else if (page === 'lesson' && parts[1] && parts[2]) renderLesson(main, parts[1], parts[2]);
      else if (page === 'stats') renderStats(main);
      else if (page === 'todos') renderTodos(main);
      else if (page === 'notes') renderNotes(main);
      else if (page === 'settings') renderSettings(main);
      else renderDashboard(main);
    } catch (e) {
      main.innerHTML = '<div class="card"><div class="empty"><span class="emoji">😵</span>页面渲染出错：' + escapeHtml(e.message) + '</div></div>';
    }

    // 导航高亮
    const navPage = (page === 'course' || page === 'lesson') ? 'courses' : page;
    document.querySelectorAll('#nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.route === navPage);
    });

    renderUserCard();
  }

  function renderUserCard() {
    $('#userName').textContent = state.settings.name;
    $('#userAvatar').textContent = state.settings.name.slice(0, 1);
    $('#userStreak').textContent = '🔥 连续打卡 ' + streakDays() + ' 天';
  }

  /* ---------- 页面：学习中心 ---------- */
  function renderDashboard(main) {
    const s = totalStats();
    const goal = state.settings.goalMinutes;
    const todayMin = state.studyLog[today()] || 0;
    const goalPct = Math.min(100, Math.round(todayMin / goal * 100));
    const cur = currentLessonTarget();
    const undoneTodos = state.todos.filter(t => !t.done).length;

    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">你好，${escapeHtml(state.settings.name)} 👋</div>
          <div class="page-desc">${fmtDateCN(today())} · 今天也要坚持学习呀</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <span class="stat-icon bg-red">⏱️</span>
          <div>
            <div class="stat-value">${todayMin} <span style="font-size:13px;color:var(--text-3)">/ ${goal} 分钟</span></div>
            <div class="stat-label">今日学习 · 已达目标 ${goalPct}%</div>
            <div class="progress-track" style="margin-top:6px"><div class="progress-fill ${goalPct >= 100 ? 'full' : ''}" style="width:${goalPct}%"></div></div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon bg-orange">🔥</span>
          <div>
            <div class="stat-value">${streakDays()} 天</div>
            <div class="stat-label">连续打卡</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon bg-green">✅</span>
          <div>
            <div class="stat-value">${s.totalDone}/${s.totalLessons}</div>
            <div class="stat-label">已完成课时 · 完整学完 ${s.finishedCourses} 门课</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon bg-blue">📋</span>
          <div>
            <div class="stat-value">${undoneTodos}</div>
            <div class="stat-label">待办学习任务</div>
          </div>
        </div>
      </div>

      <div class="dash-grid">
        <div class="dash-col">
          ${cur ? `
          <div class="card continue-card">
            <div class="card-title">▶ 继续学习</div>
            <div class="continue-course">${cur.course.icon} ${escapeHtml(cur.course.title)} · ${escapeHtml(cur.chapter.title)}</div>
            <div class="continue-lesson">${escapeHtml(cur.lesson.title)}</div>
            <div class="continue-meta">预计 ${cur.lesson.duration} 分钟 · ${cur.course.title}已学 ${courseProgress(cur.course).pct}%</div>
            <a class="btn btn-primary" href="#/lesson/${cur.course.id}/${cur.lesson.id}">开始学习</a>
          </div>` : `
          <div class="card"><div class="empty"><span class="emoji">🏆</span>所有课程都已学完，快去「全部课程」添加新目标吧！</div></div>`}

          <div class="card">
            <div class="card-title">近 7 天学习时长（分钟）
              <span class="link" data-action="goto" data-hash="#/stats">查看统计 →</span>
            </div>
            ${chartHtml(7)}
          </div>
        </div>

        <div class="dash-col">
          <div class="card">
            <div class="card-title">📌 学习任务
              <span class="link" data-action="goto" data-hash="#/todos">全部 →</span>
            </div>
            ${todoListHtml(state.todos.slice().sort((a, b) => Number(a.done) - Number(b.done)), 4)}
          </div>

          <div class="card">
            <div class="card-title">📚 课程进度</div>
            ${courses().map(c => {
              const p = courseProgress(c);
              return `
              <div style="margin-bottom:14px;cursor:pointer" data-action="goto" data-hash="#/course/${c.id}">
                <div class="progress-row"><span>${c.icon} ${escapeHtml(c.title)}</span><span>${p.pct}%</span></div>
                <div class="progress-track"><div class="progress-fill ${p.pct === 100 ? 'full' : ''}" style="width:${p.pct}%"></div></div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- 柱状图 ---------- */
  function chartHtml(days) {
    const items = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = dayOffset(i);
      items.push({ date: d, min: state.studyLog[d] || 0, isToday: i === 0 });
    }
    const max = Math.max(10, ...items.map(x => x.min));
    if (items.every(x => x.min === 0)) {
      return '<div class="chart-empty">暂无学习记录，去学一课吧～</div>';
    }
    const wk = ['日', '一', '二', '三', '四', '五', '六'];
    return `<div class="chart">${items.map(x => {
      const h = Math.max(3, Math.round(x.min / max * 100));
      const label = x.isToday ? '今天' : '周' + wk[new Date(x.date).getDay()];
      return `<div class="chart-col ${x.isToday ? 'today' : ''}">
        <div class="chart-bar" style="height:${h}%" data-min="${x.min}"></div>
        <span class="chart-label">${label}</span>
      </div>`;
    }).join('')}</div>`;
  }

  /* ---------- 待办列表片段 ---------- */
  function todoListHtml(todos, limit) {
    const list = limit ? todos.slice(0, limit) : todos;
    if (!list.length) {
      return '<div class="empty" style="padding:24px"><span class="emoji">🎉</span>暂无任务，点击下方添加</div>';
    }
    const t0 = today();
    return list.map(t => {
      const overdue = !t.done && t.deadline && t.deadline < t0;
      return `<div class="todo-item ${t.done ? 'done' : ''}">
        <span class="todo-check ${t.done ? 'done' : ''}" data-action="todo-toggle" data-id="${t.id}"></span>
        <div class="todo-body">
          <div class="todo-title">${escapeHtml(t.title)}</div>
          ${t.deadline ? `<div class="todo-meta ${overdue ? 'tag-overdue' : ''}">📅 ${fmtDateCN(t.deadline)}${overdue ? ' · 已逾期' : (t.deadline === t0 ? ' · 今天截止' : '')}</div>` : ''}
        </div>
        <button class="todo-del" data-action="todo-del" data-id="${t.id}" title="删除">✕</button>
      </div>`;
    }).join('');
  }

  /* ---------- 页面：全部课程 ---------- */
  function renderCourses(main) {
    const cats = ['全部', ...new Set(courses().map(c => c.category))];
    const kw = ui.keyword.trim().toLowerCase();
    const list = courses().filter(c =>
      (ui.category === '全部' || c.category === ui.category) &&
      (!kw || c.title.toLowerCase().includes(kw) || c.description.toLowerCase().includes(kw) || c.category.toLowerCase().includes(kw))
    );

    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">全部课程</div>
          <div class="page-desc">共 ${courses().length} 门课程 · ${totalStats().totalLessons} 个课时</div>
        </div>
      </div>
      <div class="toolbar">
        <div class="search-box">🔍<input id="courseSearch" type="text" placeholder="搜索课程名称 / 分类…" value="${escapeHtml(ui.keyword)}"></div>
        <div class="chips">
          ${cats.map(c => `<button class="chip ${ui.category === c ? 'active' : ''}" data-action="filter-cat" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}
        </div>
      </div>
      ${list.length ? `<div class="course-grid">${list.map(courseCardHtml).join('')}</div>`
        : '<div class="card"><div class="empty"><span class="emoji">🔍</span>没有找到匹配的课程</div></div>'}
    `;

    const search = $('#courseSearch');
    search.addEventListener('input', () => {
      ui.keyword = search.value;
      const pos = search.selectionStart;
      renderCourses(main);
      const s2 = $('#courseSearch');
      s2.focus();
      s2.setSelectionRange(pos, pos);
    });
  }

  function courseCardHtml(c) {
    const p = courseProgress(c);
    const chapters = c.chapters.length;
    const lessons = p.total;
    return `<div class="course-card" data-action="goto" data-hash="#/course/${c.id}">
      <div class="course-cover" style="background:${c.color}">
        <span>${c.icon}</span>
        <span class="cat-tag">${escapeHtml(c.category)}</span>
        ${p.pct === 100 ? '<span class="done-badge">✓ 已学完</span>' : ''}
      </div>
      <div class="course-body">
        <div class="course-name">${escapeHtml(c.title)}</div>
        <div class="course-meta">${chapters} 章 · ${lessons} 课时 · 约 ${fmtDuration(courseMinutes(c))}</div>
        <div class="course-foot">
          <div class="progress-row"><span>已学 ${p.done} / ${lessons} 课时</span><span>${p.pct}%</span></div>
          <div class="progress-track"><div class="progress-fill ${p.pct === 100 ? 'full' : ''}" style="width:${p.pct}%"></div></div>
        </div>
      </div>
    </div>`;
  }

  /* ---------- 页面：课程详情 ---------- */
  function renderCourseDetail(main, courseId) {
    const c = courseById(courseId);
    if (!c) { location.hash = '#/courses'; return; }
    const p = courseProgress(c);
    const next = nextLessonOf(c);

    main.innerHTML = `
      <div class="breadcrumb"><a href="#/dashboard">学习中心</a> / <a href="#/courses">全部课程</a> / ${escapeHtml(c.title)}</div>
      <div class="card course-hero" style="padding:22px">
        <div class="hero-cover" style="background:${c.color}">${c.icon}</div>
        <div class="hero-info">
          <div class="hero-title">${escapeHtml(c.title)}<span class="cat-tag" style="background:${c.color};color:#fff;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:400">${escapeHtml(c.category)}</span></div>
          <div class="hero-desc">${escapeHtml(c.description)}</div>
          <div class="hero-meta">
            <span>📚 ${c.chapters.length} 章</span>
            <span>🎬 ${p.total} 课时</span>
            <span>⏱️ 约 ${fmtDuration(courseMinutes(c))}</span>
            <span>📈 已完成 ${p.pct}%</span>
          </div>
          <div class="hero-actions">
            ${next
              ? `<a class="btn btn-primary" href="#/lesson/${c.id}/${next.lesson.id}">${p.done > 0 ? '继续学习' : '开始学习'}</a>`
              : '<span class="btn btn-green" style="cursor:default">🎉 已全部学完</span>'}
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-title">课程目录</div>
        ${c.chapters.map((ch, ci) => `
        <div class="chapter ${ci === 0 || ch.lessons.some(l => !isDone(l.id)) ? 'open' : ''}">
          <div class="chapter-head" data-action="toggle-chapter">
            <span style="color:var(--accent)">第${['一', '二', '三', '四', '五'][ci] || ci + 1}章</span>
            <span>${escapeHtml(ch.title)}</span>
            <span style="font-size:12px;color:var(--text-3);font-weight:400">${ch.lessons.filter(l => isDone(l.id)).length}/${ch.lessons.length} 已学</span>
            <span class="arrow">▶</span>
          </div>
          <div class="chapter-body">
            ${ch.lessons.map(l => `
            <div class="lesson-row ${isDone(l.id) ? 'done' : ''}" data-action="open-lesson" data-course="${c.id}" data-lesson="${l.id}">
              <span class="lesson-index">${isDone(l.id) ? '✓' : ''}</span>
              <span class="lesson-name">${escapeHtml(l.title)}</span>
              <span class="lesson-tag">${l.type === 'video' ? '🎬 视频' : '📄 图文'}</span>
              <span class="lesson-dur">${l.duration} 分钟</span>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    `;
  }

  /* ---------- 页面：课时学习 ---------- */
  function renderLesson(main, courseId, lessonId) {
    const c = courseById(courseId);
    if (!c) { location.hash = '#/courses'; return; }
    const fl = flatLessons(c);
    const idx = fl.findIndex(x => x.lesson.id === lessonId);
    if (idx === -1) { location.hash = '#/course/' + courseId; return; }
    const { lesson, chapter } = fl[idx];
    const prev = fl[idx - 1], next = fl[idx + 1];
    const done = isDone(lesson.id);
    state.lastLessonId = lesson.id;
    save();

    const notes = state.notes.filter(n => n.lessonId === lesson.id);

    main.innerHTML = `
      <div class="breadcrumb">
        <a href="#/courses">全部课程</a> / <a href="#/course/${c.id}">${escapeHtml(c.title)}</a> / ${escapeHtml(chapter.title)}
      </div>
      <div class="learn-layout">
        <div class="dash-col">
          <div class="card">
            <div class="lesson-title">${escapeHtml(lesson.title)}</div>
            <div class="lesson-sub">
              <span class="lesson-tag">${lesson.type === 'video' ? '🎬 视频课时' : '📄 图文课时'}</span>
              <span>⏱️ 约 ${lesson.duration} 分钟</span>
              <span>${c.icon} ${escapeHtml(c.title)}</span>
            </div>
            <div class="lesson-content">${lesson.content}</div>
            <div class="lesson-actions">
              <button class="btn ${done ? 'btn-ghost' : 'btn-green'}" data-action="toggle-done" data-lesson="${lesson.id}">
                ${done ? '↩ 已学完（点击撤销）' : '✓ 标记为已学完 (+' + lesson.duration + '分钟)'}
              </button>
              <div class="lesson-nav">
                ${prev ? `<a class="btn btn-ghost" href="#/lesson/${c.id}/${prev.lesson.id}">← 上一课</a>` : ''}
                ${next ? `<a class="btn btn-ghost" href="#/lesson/${c.id}/${next.lesson.id}">下一课 →</a>`
                       : `<a class="btn btn-primary" href="#/course/${c.id}">返回课程</a>`}
              </div>
            </div>
          </div>

          <div class="card note-editor">
            <div class="card-title">📝 课时笔记</div>
            <textarea id="noteInput" placeholder="记录本课重点、疑问或心得…">${escapeHtml(ui.noteDraft[lesson.id] || '')}</textarea>
            <div class="row"><button class="btn btn-primary btn-sm" data-action="save-note" data-lesson="${lesson.id}">保存笔记</button></div>
            <div id="noteList">${notesHtml(notes)}</div>
          </div>
        </div>

        <div class="dash-col">
          <div class="card">
            <div class="card-title">课程目录 <span style="font-size:12px;color:var(--text-3);font-weight:400">${courseProgress(c).pct}%</span></div>
            <div class="outline-panel">
              ${c.chapters.map(ch => `
                <div class="outline-chapter">${escapeHtml(ch.title)}</div>
                ${ch.lessons.map(l => `
                  <div class="outline-item ${l.id === lesson.id ? 'active' : ''} ${isDone(l.id) ? 'done' : ''}" data-action="open-lesson" data-course="${c.id}" data-lesson="${l.id}">
                    <span class="dot"></span><span>${escapeHtml(l.title)}</span><span class="dur">${l.duration}分</span>
                  </div>`).join('')}
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function notesHtml(notes) {
    if (!notes.length) return '<div class="empty" style="padding:18px;font-size:12px">暂无笔记</div>';
    return notes.map(n => `
      <div class="note-item">
        <div class="note-content">${escapeHtml(n.content)}</div>
        <div class="note-meta"><span>${fmtTime(n.createdAt)}</span>
          <button class="del" data-action="note-del" data-id="${n.id}">删除</button>
        </div>
      </div>`).join('');
  }

  /* ---------- 页面：学习统计 ---------- */
  function renderStats(main) {
    const s = totalStats();

    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">学习统计</div>
          <div class="page-desc">坚持记录，看见自己的成长</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card"><span class="stat-icon bg-red">⏱️</span><div>
          <div class="stat-value">${fmtDuration(s.totalMin)}</div><div class="stat-label">累计学习时长</div></div>
        </div>
        <div class="stat-card"><span class="stat-icon bg-green">✅</span><div>
          <div class="stat-value">${s.totalDone} 课时</div><div class="stat-label">已完成 / 共 ${s.totalLessons} 课时</div></div>
        </div>
        <div class="stat-card"><span class="stat-icon bg-blue">🎓</span><div>
          <div class="stat-value">${s.finishedCourses} 门</div><div class="stat-label">完整学完的课程</div></div>
        </div>
        <div class="stat-card"><span class="stat-icon bg-orange">🔥</span><div>
          <div class="stat-value">${streakDays()} 天</div><div class="stat-label">连续打卡</div></div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-title">近 14 天学习时长（分钟）</div>
        ${chartHtml(14)}
      </div>

      <div class="card">
        <div class="card-title">各课程完成度</div>
        <div class="stat-rows">
          ${courses().map(c => {
            const p = courseProgress(c);
            return `<div class="stat-course-row">
              <span class="stat-course-name">${c.icon} ${escapeHtml(c.title)}</span>
              <div class="stat-course-bar">
                <div class="progress-track" style="height:8px"><div class="progress-fill ${p.pct === 100 ? 'full' : ''}" style="width:${p.pct}%"></div></div>
              </div>
              <span class="stat-pct">${p.pct}%</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title">笔记与任务</div>
        <div class="stat-grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
          <div class="stat-card" style="box-shadow:none;border:1px solid var(--line)"><span class="stat-icon bg-blue">📝</span><div>
            <div class="stat-value">${state.notes.length}</div><div class="stat-label">累计笔记</div></div></div>
          <div class="stat-card" style="box-shadow:none;border:1px solid var(--line)"><span class="stat-icon bg-orange">📋</span><div>
            <div class="stat-value">${state.todos.filter(t => !t.done).length}</div><div class="stat-label">未完成任务</div></div></div>
          <div class="stat-card" style="box-shadow:none;border:1px solid var(--line)"><span class="stat-icon bg-green">🎯</span><div>
            <div class="stat-value">${state.todos.filter(t => t.done).length}</div><div class="stat-label">已完成任务</div></div></div>
        </div>
      </div>
    `;
  }

  /* ---------- 页面：学习计划 ---------- */
  function renderTodos(main) {
    const sorted = state.todos.slice().sort((a, b) =>
      Number(a.done) - Number(b.done) || String(a.deadline || '9999').localeCompare(String(b.deadline || '9999'))
    );
    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">学习计划</div>
          <div class="page-desc">共 ${state.todos.length} 项任务 · 未完成 ${state.todos.filter(t => !t.done).length} 项</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">我的任务</div>
        ${todoListHtml(sorted)}
        <div class="todo-add">
          <input type="text" id="todoInput" placeholder="例如：复习 Java 面向对象章节…" style="flex:1;padding:9px 12px;border:1px solid var(--line);border-radius:8px;outline:none">
          <input type="date" id="todoDate" value="${today()}" style="padding:9px 12px;border:1px solid var(--line);border-radius:8px;outline:none">
          <button class="btn btn-primary" data-action="todo-add">添加任务</button>
        </div>
      </div>
    `;
    const input = $('#todoInput');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') addTodoFromInput();
    });
    input.focus();
  }

  function addTodoFromInput() {
    const t = $('#todoInput'), d = $('#todoDate');
    if (!t.value.trim()) { toast('请输入任务内容'); return; }
    addTodo(t.value, d.value || today());
    route();
  }

  /* ---------- 页面：我的笔记 ---------- */
  function renderNotes(main) {
    const notes = state.notes.slice().sort((a, b) => b.createdAt - a.createdAt);
    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">我的笔记</div>
          <div class="page-desc">共 ${notes.length} 条 · 在课时页面可随时记录</div>
        </div>
      </div>
      ${notes.length ? `
      <div class="card">
        ${notes.map(n => {
          const hit = findLessonEverywhere(n.lessonId);
          return `<div class="note-item">
            <div class="note-content">${escapeHtml(n.content)}</div>
            <div class="note-meta">
              <span>${hit ? `${hit.course.icon} <a href="#/lesson/${hit.course.id}/${n.lessonId}" style="color:var(--accent)">${escapeHtml(hit.lesson.title)}</a>` : '已删除课时'}</span>
              <span>${fmtTime(n.createdAt)}</span>
              <button class="del" data-action="note-del" data-id="${n.id}">删除</button>
            </div>
          </div>`;
        }).join('')}
      </div>` : '<div class="card"><div class="empty"><span class="emoji">📝</span>还没有笔记，去课时页面写下第一条吧</div></div>'}
    `;
  }

  /* ---------- 页面：设置 ---------- */
  function renderSettings(main) {
    main.innerHTML = `
      <div class="page-head">
        <div>
          <div class="page-title">设置</div>
          <div class="page-desc">个性化你的学习中心</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">基本设置</div>
        <div class="form-row">
          <span class="form-label">昵称</span>
          <div>
            <input type="text" id="setName" value="${escapeHtml(state.settings.name)}" style="width:240px">
            <div class="form-desc">显示在学习中心问候语与侧边栏</div>
          </div>
        </div>
        <div class="form-row">
          <span class="form-label">每日目标（分钟）</span>
          <div>
            <select id="setGoal">
              ${[30, 45, 60, 90, 120, 180].map(v =>
                `<option value="${v}" ${state.settings.goalMinutes === v ? 'selected' : ''}>${v} 分钟</option>`).join('')}
            </select>
            <div class="form-desc">用于首页"今日学习"目标进度</div>
          </div>
        </div>
        <div class="form-row">
          <span class="form-label"></span>
          <button class="btn btn-primary" data-action="save-settings">保存设置</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">数据管理</div>
        <div class="form-row">
          <span class="form-label">导出数据</span>
          <div>
            <button class="btn btn-ghost" data-action="export-data">导出 JSON 备份</button>
            <div class="form-desc">包含进度、笔记、任务等全部学习记录</div>
          </div>
        </div>
        <div class="form-row">
          <span class="form-label">导入数据</span>
          <div>
            <button class="btn btn-ghost" data-action="import-data">选择 JSON 文件</button>
            <input type="file" id="importFile" accept=".json" style="display:none">
            <div class="form-desc">导入后将覆盖当前全部数据</div>
          </div>
        </div>
      </div>

      <div class="card danger-zone">
        <div class="card-title" style="color:var(--accent)">危险操作</div>
        <div class="form-row" style="border-bottom:none">
          <span class="form-label">恢复初始数据</span>
          <div>
            <button class="btn btn-danger" data-action="reset-data">重置为演示数据</button>
            <div class="form-desc">将清空你的所有学习记录，恢复到初始演示状态</div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- 事件委托 ---------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    if (action === 'goto') {
      location.hash = el.dataset.hash;
    } else if (action === 'filter-cat') {
      ui.category = el.dataset.cat;
      route();
    } else if (action === 'open-lesson') {
      location.hash = '#/lesson/' + el.dataset.course + '/' + el.dataset.lesson;
    } else if (action === 'toggle-chapter') {
      el.parentElement.classList.toggle('open');
    } else if (action === 'toggle-done') {
      toggleComplete(el.dataset.lesson);
      route();
    } else if (action === 'save-note') {
      const lessonId = el.dataset.lesson;
      const ta = $('#noteInput');
      const val = ta.value;
      if (!val.trim()) { toast('笔记内容不能为空'); return; }
      addNote(lessonId, val);
      delete ui.noteDraft[lessonId];
      route();
    } else if (action === 'note-del') {
      deleteNote(el.dataset.id);
      route();
    } else if (action === 'todo-toggle') {
      toggleTodo(el.dataset.id);
      route();
    } else if (action === 'todo-del') {
      deleteTodo(el.dataset.id);
      route();
    } else if (action === 'todo-add') {
      addTodoFromInput();
    } else if (action === 'save-settings') {
      state.settings.name = $('#setName').value.trim() || '学习者';
      state.settings.goalMinutes = Number($('#setGoal').value) || 60;
      save();
      toast('设置已保存');
      route();
    } else if (action === 'export-data') {
      exportData();
    } else if (action === 'import-data') {
      $('#importFile').click();
    } else if (action === 'reset-data') {
      if (confirm('确定要清空所有数据并恢复初始演示数据吗？')) {
        resetAll();
        toast('已恢复初始数据');
        route();
      }
    }
  });

  // 笔记草稿：离开前暂存
  document.addEventListener('input', e => {
    if (e.target.id === 'noteInput') {
      const lessonId = document.querySelector('[data-action="save-note"]');
      if (lessonId) ui.noteDraft[lessonId.dataset.lesson] = e.target.value;
    }
  });

  // 导入文件
  document.addEventListener('change', e => {
    if (e.target.id !== 'importFile') return;
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result);
        if (obj && obj.progress && obj.settings) {
          state = obj;
          save();
          toast('数据导入成功');
          route();
        } else {
          toast('文件格式不正确');
        }
      } catch (err) {
        toast('文件解析失败');
      }
    };
    reader.readAsText(file, 'utf-8');
  });

  /* ---------- 导出 ---------- */
  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '学习管理系统备份_' + today() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('备份文件已导出');
  }

  /* ---------- 启动 ---------- */
  window.addEventListener('hashchange', route);
  save();
  route();
})();
