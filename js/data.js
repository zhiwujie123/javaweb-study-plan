/* =====================================================
   学习管理系统 - 种子数据（课程 / 课时内容）
   ===================================================== */

const SEED_COURSES = [
  {
    id: 'maven',
    title: 'Maven 基础',
    category: '构建工具',
    icon: '🧱',
    color: 'linear-gradient(135deg, #ff9a8b, #e0342c)',
    description: 'Maven 是 Apache 旗下的开源项目管理工具，本课程讲解 Maven 的安装配置、依赖管理、生命周期与常用插件，帮助你告别手动导 jar 包的时代。',
    chapters: [
      {
        id: 'm-c1',
        title: '第一章 Maven 入门',
        lessons: [
          {
            id: 'm1', title: '什么是 Maven', type: 'video', duration: 8,
            content: `
              <div class="video-ph"><span class="play">▶</span>视频课时 · 约 8 分钟</div>
              <h4>本节目标</h4>
              <ul>
                <li>理解 Maven 是什么、能解决什么问题</li>
                <li>了解 Maven 的两大核心功能：<b>依赖管理</b> 与 <b>项目构建</b></li>
              </ul>
              <h4>为什么需要 Maven</h4>
              <p>在没有 Maven 之前，Java 项目需要手动下载 jar 包并添加到 classpath，容易出现版本冲突、jar 包找不到等问题。Maven 通过 <span class="inline-code">pom.xml</span> 统一管理项目的依赖与构建过程。</p>
              <div class="tip-box">💡 Maven 的核心思想：<b>约定优于配置</b>——项目结构、构建流程都有统一约定，减少手工配置。</div>
              <h4>Maven 仓库的分类</h4>
              <ul>
                <li><b>本地仓库</b>：本机磁盘上的 jar 包缓存目录</li>
                <li><b>远程仓库（私服）</b>：公司或团队内部搭建的仓库，如 Nexus</li>
                <li><b>中央仓库</b>：Maven 官方维护的全球公共仓库</li>
              </ul>
              <p>查找依赖的顺序：本地仓库 → 私服 → 中央仓库。</p>
            `
          },
          {
            id: 'm2', title: 'Maven 的安装', type: 'doc', duration: 15,
            content: `
              <h4>安装步骤</h4>
              <ol>
                <li><b>解压</b> <span class="inline-code">apache-maven-3.9.4-bin.zip</span> 到一个<b>没有中文、没有空格</b>的目录。</li>
                <li><b>配置本地仓库</b>：修改 <span class="inline-code">conf/settings.xml</span> 中的 <span class="inline-code">&lt;localRepository&gt;</span> 标签，指向自己的仓库目录。</li>
                <li><b>配置阿里云私服</b>：修改 <span class="inline-code">conf/settings.xml</span> 中 <span class="inline-code">&lt;mirrors&gt;</span> 标签，加速依赖下载。</li>
                <li><b>配置环境变量</b>：<span class="inline-code">MAVEN_HOME</span> 为 Maven 的解压目录，再将 <span class="inline-code">bin</span> 目录加入 <span class="inline-code">Path</span>。</li>
              </ol>
              <h4>① 解压压缩包</h4>
              <p>将 <span class="inline-code">apache-maven-3.9.4-bin.zip</span> 解压，例如解压到：</p>
              <pre><code>D:\develop\apache-maven-3.9.4</code></pre>
              <div class="warn-box">⚠️ 注意：解压目录中<b>不能有中文和空格</b>，否则后续构建可能出错。</div>
              <h4>② 配置本地仓库</h4>
              <p>打开 <span class="inline-code">conf/settings.xml</span>，找到 <span class="inline-code">&lt;localRepository&gt;</span> 标签，取消注释并修改为自己准备的目录：</p>
              <pre><code>&lt;localRepository&gt;D:\develop\apache-maven-3.9.4\mvn_repo&lt;/localRepository&gt;</code></pre>
              <h4>③ 配置阿里云私服（镜像）</h4>
              <p>在 <span class="inline-code">settings.xml</span> 的 <span class="inline-code">&lt;mirrors&gt;</span> 标签中添加：</p>
              <pre><code>&lt;mirror&gt;
    &lt;id&gt;alimaven&lt;/id&gt;
    &lt;name&gt;aliyun maven&lt;/name&gt;
    &lt;url&gt;http://maven.aliyun.com/nexus/content/groups/public/&lt;/url&gt;
    &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
&lt;/mirror&gt;</code></pre>
              <div class="tip-box">💡 不配置镜像时默认从国外中央仓库下载依赖，速度很慢；配置阿里云私服后下载速度会大幅提升。</div>
              <h4>④ 配置环境变量并验证</h4>
              <ul>
                <li>新建系统变量 <span class="inline-code">MAVEN_HOME</span> = <span class="inline-code">D:\develop\apache-maven-3.9.4</span></li>
                <li>编辑 <span class="inline-code">Path</span>，追加 <span class="inline-code">%MAVEN_HOME%\bin</span></li>
                <li>打开 cmd，执行以下命令验证：</li>
              </ul>
              <pre><code>mvn -v</code></pre>
              <p>能看到 Maven 版本信息（Maven home: D:\develop\apache-maven-3.9.4）即安装成功。</p>
            `
          },
          {
            id: 'm3', title: 'Maven 标准目录结构', type: 'doc', duration: 6,
            content: `
              <h4>约定优于配置</h4>
              <p>Maven 对项目目录结构有统一约定，创建项目时必须遵守：</p>
              <pre><code>project/
├── src/
│   ├── main/
│   │   ├── java/        # 放置 Java 源代码
│   │   └── resources/   # 放置配置文件
│   └── test/
│       ├── java/        # 放置测试代码
│       └── resources/   # 放置测试配置文件
└── pom.xml              # 项目对象模型（核心配置文件）</code></pre>
              <div class="tip-box">💡 IDEA 中创建 Maven 项目后，会自动生成这套标准结构，直接按约定放代码即可。</div>
            `
          }
        ]
      },
      {
        id: 'm-c2',
        title: '第二章 依赖管理',
        lessons: [
          {
            id: 'm4', title: '依赖配置与坐标', type: 'doc', duration: 10,
            content: `
              <h4>依赖的坐标</h4>
              <p>每个依赖由三个要素（坐标）唯一确定：<span class="inline-code">groupId</span>（组织）、<span class="inline-code">artifactId</span>（项目名）、<span class="inline-code">version</span>（版本）。</p>
              <p>在 <span class="inline-code">pom.xml</span> 中通过 <span class="inline-code">&lt;dependencies&gt;</span> 引入依赖：</p>
              <pre><code>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;junit&lt;/groupId&gt;
        &lt;artifactId&gt;junit&lt;/artifactId&gt;
        &lt;version&gt;4.13.2&lt;/version&gt;
        &lt;scope&gt;test&lt;/scope&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</code></pre>
              <div class="tip-box">💡 坐标可以从官网 mvnrepository.com 搜索获取，也可以在 IDEA 的 pom.xml 中按 Tab 自动补全。</div>
            `
          },
          {
            id: 'm5', title: '依赖传递与冲突解决', type: 'doc', duration: 12,
            content: `
              <h4>依赖传递</h4>
              <p>如果 A 依赖 B，B 依赖 C，那么 A 会自动获得 C —— 这就是<b>依赖传递</b>。直接引入的叫<b>直接依赖</b>，传递进来的叫<b>间接依赖</b>。</p>
              <h4>冲突原则</h4>
              <ul>
                <li><b>路径优先</b>：层级越深的依赖，优先级越低</li>
                <li><b>声明优先</b>：相同层级时，先声明的优先</li>
              </ul>
              <h4>排除依赖</h4>
              <p>当传递依赖的版本冲突时，可以使用 <span class="inline-code">&lt;exclusions&gt;</span> 排除不需要的间接依赖：</p>
              <pre><code>&lt;dependency&gt;
    &lt;groupId&gt;com.example&lt;/groupId&gt;
    &lt;artifactId&gt;a&lt;/artifactId&gt;
    &lt;version&gt;1.0&lt;/version&gt;
    &lt;exclusions&gt;
        &lt;exclusion&gt;
            &lt;groupId&gt;com.example&lt;/groupId&gt;
            &lt;artifactId&gt;c&lt;/artifactId&gt;
        &lt;/exclusion&gt;
    &lt;/exclusions&gt;
&lt;/dependency&gt;</code></pre>
              <div class="warn-box">⚠️ IDEA Maven 面板中可以查看依赖树（Show Dependencies），用于定位冲突来源。</div>
            `
          },
          {
            id: 'm6', title: '依赖范围 scope', type: 'doc', duration: 9,
            content: `
              <h4>三种常用范围</h4>
              <ul>
                <li><span class="inline-code">compile</span>（默认）：主程序、测试程序、打包运行都有效</li>
                <li><span class="inline-code">test</span>：只在测试程序中有效，如 junit</li>
                <li><span class="inline-code">provided</span>：编译和测试有效，运行时由环境提供，如 servlet-api（Tomcat 自带）</li>
              </ul>
              <pre><code>&lt;dependency&gt;
    &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
    &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
    &lt;version&gt;4.0.1&lt;/version&gt;
    &lt;scope&gt;provided&lt;/scope&gt;
&lt;/dependency&gt;</code></pre>
              <div class="tip-box">💡 记忆技巧：compile 全程有效，test 只管测试，provided 不参与打包。</div>
            `
          },
          {
            id: 'm7', title: '可选依赖与阻断传递', type: 'doc', duration: 8,
            content: `
              <h4>optional 可选依赖</h4>
              <p>在依赖上添加 <span class="inline-code">&lt;optional&gt;true&lt;/optional&gt;</span> 后，该依赖<b>不参与传递</b>，只有直接引用它的项目才会使用。</p>
              <pre><code>&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
    &lt;version&gt;8.0.33&lt;/version&gt;
    &lt;optional&gt;true&lt;/optional&gt;
&lt;/dependency&gt;</code></pre>
              <h4>与 exclusions 的区别</h4>
              <ul>
                <li><span class="inline-code">optional</span>：依赖提供方设置，从源头阻断传递</li>
                <li><span class="inline-code">exclusions</span>：依赖使用方设置，从引用处排除</li>
              </ul>
            `
          }
        ]
      },
      {
        id: 'm-c3',
        title: '第三章 生命周期与插件',
        lessons: [
          {
            id: 'm8', title: 'Maven 构建生命周期', type: 'doc', duration: 7,
            content: `
              <h4>三套生命周期</h4>
              <ul>
                <li><b>clean</b>：清理项目，常用命令 <span class="inline-code">mvn clean</span> 删除 target 目录</li>
                <li><b>default</b>：核心构建流程（编译、测试、打包、安装）</li>
                <li><b>site</b>：生成项目站点文档</li>
              </ul>
              <h4>default 中的常用阶段</h4>
              <pre><code>compile  →  test  →  package  →  install  →  deploy
编译        测试     打包       安装到本地仓库   发布到远程仓库</code></pre>
              <div class="tip-box">💡 在同一生命周期内，执行后面的阶段会自动先执行前面的阶段。例如执行 install 会先完成 compile、test、package。</div>
            `
          },
          {
            id: 'm9', title: '常用插件与 IDEA 集成', type: 'doc', duration: 8,
            content: `
              <h4>插件的作用</h4>
              <p>Maven 的每个构建动作都由插件完成，常用插件：</p>
              <ul>
                <li><span class="inline-code">maven-compiler-plugin</span>：编译代码，可指定 JDK 版本</li>
                <li><span class="inline-code">maven-surefire-plugin</span>：执行测试</li>
                <li><span class="inline-code">maven-jar-plugin</span> / <span class="inline-code">maven-war-plugin</span>：打包</li>
                <li><span class="inline-code">tomcat7-maven-plugin</span>：一键启动 Web 项目</li>
              </ul>
              <h4>IDEA 集成 Maven</h4>
              <ol>
                <li>File → Settings → Build Tools → Maven</li>
                <li>修改 Maven home path 为本地 Maven 目录</li>
                <li>修改 User settings file 勾选 Override，指向自己的 <span class="inline-code">settings.xml</span></li>
              </ol>
              <div class="tip-box">💡 IDEA 右侧 Maven 面板中双击 Lifecycle 下的命令即可执行构建；也可以直接在 Terminal 中执行 mvn 命令。</div>
            `
          }
        ]
      }
    ]
  },

  {
    id: 'java',
    title: 'Java 基础入门',
    category: '编程语言',
    icon: '☕',
    color: 'linear-gradient(135deg, #ffb36b, #e6862e)',
    description: '从环境搭建到面向对象，系统学习 Java 语法核心：变量、流程控制、面向对象三大特性与常用 API，为后续框架开发打下坚实基础。',
    chapters: [
      {
        id: 'j-c1',
        title: '第一章 快速入门',
        lessons: [
          {
            id: 'j1', title: '开发环境搭建与第一个程序', type: 'video', duration: 12,
            content: `
              <div class="video-ph"><span class="play">▶</span>视频课时 · 约 12 分钟</div>
              <h4>本节要点</h4>
              <ul>
                <li>安装 JDK，配置 <span class="inline-code">JAVA_HOME</span> 与 <span class="inline-code">Path</span></li>
                <li>编写第一个程序 HelloWorld.java</li>
              </ul>
              <pre><code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
              <div class="tip-box">💡 Java 是编译+解释型语言：.java 源码先编译成 .class 字节码，再由 JVM 执行，因此具备跨平台能力。</div>
            `
          },
          {
            id: 'j2', title: '变量与数据类型', type: 'doc', duration: 14,
            content: `
              <h4>八种基本数据类型</h4>
              <pre><code>整数：byte(1)  short(2)  int(4,默认)  long(8,加L)
浮点：float(4,加F)  double(8,默认)
字符：char(2)   布尔：boolean(true/false)</code></pre>
              <h4>类型转换</h4>
              <ul>
                <li>自动类型转换：小范围 → 大范围（byte → int → long → double）</li>
                <li>强制类型转换：大范围 → 小范围，可能丢失精度，如 <span class="inline-code">int i = (int) 3.99;</span></li>
              </ul>
              <div class="warn-box">⚠️ String 是引用类型不是基本类型；任何类型与 String 相加都会变成字符串拼接。</div>
            `
          },
          {
            id: 'j3', title: '运算符与流程控制', type: 'doc', duration: 16,
            content: `
              <h4>核心语句</h4>
              <ul>
                <li>分支：<span class="inline-code">if / else</span>、<span class="inline-code">switch</span>（支持 String）</li>
                <li>循环：<span class="inline-code">for</span>、<span class="inline-code">while</span>、<span class="inline-code">do-while</span></li>
                <li>跳转：<span class="inline-code">break</span>（跳出循环）、<span class="inline-code">continue</span>（跳过本次）</li>
              </ul>
              <pre><code>// 经典：打印 1~100 中 3 的倍数
for (int i = 1; i &lt;= 100; i++) {
    if (i % 3 == 0) {
        System.out.println(i);
    }
}</code></pre>
              <div class="tip-box">💡 无限循环 <span class="inline-code">while(true)</span> 配合 break 是写菜单程序的常用套路。</div>
            `
          }
        ]
      },
      {
        id: 'j-c2',
        title: '第二章 面向对象',
        lessons: [
          {
            id: 'j4', title: '类与对象', type: 'doc', duration: 12,
            content: `
              <h4>类的定义与使用</h4>
              <pre><code>public class Student {
    // 成员变量（属性）
    String name;
    int age;
    // 成员方法（行为）
    public void study() {
        System.out.println(name + " 正在学习");
    }
}

// 使用
Student s = new Student();
s.name = "张三";
s.study();</code></pre>
              <div class="tip-box">💡 类是对象的模板，对象是类的实例。成员变量在堆中，有默认值；局部变量必须先赋值才能使用。</div>
            `
          },
          {
            id: 'j5', title: '封装、继承与多态', type: 'doc', duration: 18,
            content: `
              <h4>三大特性一句话总结</h4>
              <ul>
                <li><b>封装</b>：属性私有化（private），提供 getter/setter 访问</li>
                <li><b>继承</b>：子类 <span class="inline-code">extends</span> 父类，复用代码；子类可重写（@Override）父类方法</li>
                <li><b>多态</b>：父类引用指向子类对象，运行时调用子类实现</li>
              </ul>
              <pre><code>Animal a = new Dog();   // 多态：编译看左边，运行看右边
a.eat();                 // 调用的是 Dog 重写后的 eat()</code></pre>
              <div class="warn-box">⚠️ 多态的前提：有继承/实现关系、有方法重写、父类引用指向子类对象。</div>
            `
          },
          {
            id: 'j6', title: '抽象类与接口', type: 'doc', duration: 13,
            content: `
              <h4>对比</h4>
              <ul>
                <li>抽象类：用 <span class="inline-code">abstract</span> 修饰，可有普通方法，单继承</li>
                <li>接口：全是抽象方法（JDK8 后可有 default 方法），多实现 <span class="inline-code">implements</span></li>
              </ul>
              <pre><code>public interface Flyable {
    void fly();   // 默认 public abstract
}</code></pre>
              <div class="tip-box">💡 选择建议：抽取共性模板用抽象类；定义行为规范（能做什么）用接口。</div>
            `
          }
        ]
      },
      {
        id: 'j-c3',
        title: '第三章 常用 API',
        lessons: [
          {
            id: 'j7', title: '字符串与集合', type: 'doc', duration: 15,
            content: `
              <h4>String 常用方法</h4>
              <pre><code>length()  charAt(i)  substring(a,b)  indexOf(str)
equals()  split(",")  replace(a,b)  toUpperCase()</code></pre>
              <h4>集合体系</h4>
              <ul>
                <li><span class="inline-code">ArrayList</span>：底层数组，查询快，最常用</li>
                <li><span class="inline-code">LinkedList</span>：底层链表，头尾增删快</li>
                <li><span class="inline-code">HashMap</span>：键值对存储，键唯一</li>
              </ul>
              <div class="warn-box">⚠️ 字符串比较永远用 equals()，== 比较的是地址值。</div>
            `
          },
          {
            id: 'j8', title: '异常处理', type: 'doc', duration: 10,
            content: `
              <h4>异常体系</h4>
              <pre><code>Throwable
├── Error            # 严重错误，如 StackOverflowError
└── Exception
    ├── RuntimeException  # 运行时异常（空指针、数组越界、类型转换）
    └── 其他              # 编译时异常（IO、SQL），必须处理</code></pre>
              <h4>处理方式</h4>
              <ul>
                <li>捕获：<span class="inline-code">try / catch / finally</span></li>
                <li>抛出：<span class="inline-code">throws</span> 声明 / <span class="inline-code">throw</span> 抛出对象</li>
              </ul>
              <div class="tip-box">💡 finally 中的代码无论是否发生异常都会执行，常用于释放资源。</div>
            `
          }
        ]
      }
    ]
  },

  {
    id: 'mysql',
    title: 'MySQL 数据库',
    category: '数据库',
    icon: '🐬',
    color: 'linear-gradient(135deg, #7ec8f5, #2b7fd6)',
    description: '学习关系型数据库 MySQL：SQL 增删改查、多表设计与查询、事务与索引，掌握后端开发必备的数据存储能力。',
    chapters: [
      {
        id: 'q-c1',
        title: '第一章 SQL 基础',
        lessons: [
          {
            id: 'q1', title: '数据库与表的 CRUD', type: 'doc', duration: 12,
            content: `
              <h4>DDL 常用语句</h4>
              <pre><code>CREATE DATABASE db1;              -- 建库
CREATE TABLE stu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    age INT
);
DROP TABLE stu;                    -- 删表</code></pre>
              <h4>DML 数据操作</h4>
              <pre><code>INSERT INTO stu(name, age) VALUES ('张三', 20);
UPDATE stu SET age = 21 WHERE id = 1;
DELETE FROM stu WHERE id = 1;</code></pre>
              <div class="tip-box">💡 UPDATE / DELETE 一定要带 WHERE，否则会操作整张表！</div>
            `
          },
          {
            id: 'q2', title: '查询语句详解', type: 'doc', duration: 16,
            content: `
              <h4>DQL 查询语法顺序</h4>
              <pre><code>SELECT 字段列表
FROM 表名
WHERE 分组前条件
GROUP BY 分组字段
HAVING 分组后条件
ORDER BY 排序字段
LIMIT 起始索引, 条数</code></pre>
              <h4>常用聚合函数</h4>
              <ul>
                <li><span class="inline-code">COUNT(*)</span> 统计行数、<span class="inline-code">SUM()</span> 求和、<span class="inline-code">AVG()</span> 平均、<span class="inline-code">MAX()/MIN()</span> 最值</li>
              </ul>
              <div class="tip-box">💡 WHERE 里不能用聚合函数，过滤聚合结果要用 HAVING。</div>
            `
          }
        ]
      },
      {
        id: 'q-c2',
        title: '第二章 多表与事务',
        lessons: [
          {
            id: 'q3', title: '外键与多表查询', type: 'doc', duration: 15,
            content: `
              <h4>多表关系</h4>
              <ul>
                <li>一对多：在"多"的一方建立外键指向"一"的主键</li>
                <li>多对多：建立中间表，存两方主键</li>
                <li>一对一：任一方加唯一外键</li>
              </ul>
              <h4>连接查询</h4>
              <pre><code>-- 内连接：取交集
SELECT s.name, c.name
FROM stu s
JOIN class c ON s.class_id = c.id;

-- 左外连接：左表全保留
SELECT * FROM stu s
LEFT JOIN class c ON s.class_id = c.id;</code></pre>
            `
          },
          {
            id: 'q4', title: '事务与索引', type: 'doc', duration: 12,
            content: `
              <h4>事务四大特性（ACID）</h4>
              <ul>
                <li><b>原子性</b>：事务中的操作要么全成功要么全失败</li>
                <li><b>一致性</b>：事务前后数据总量不变</li>
                <li><b>隔离性</b>：事务之间互不干扰</li>
                <li><b>持久性</b>：提交后永久生效</li>
              </ul>
              <pre><code>START TRANSACTION;
UPDATE account SET money = money - 100 WHERE id = 1;
UPDATE account SET money = money + 100 WHERE id = 2;
COMMIT;   -- 或 ROLLBACK 回滚</code></pre>
              <div class="tip-box">💡 索引相当于书的目录，能大幅提升查询速度，但会降低增删改的效率。</div>
            `
          }
        ]
      }
    ]
  },

  {
    id: 'springboot',
    title: 'Spring Boot 框架',
    category: '后端框架',
    icon: '🌿',
    color: 'linear-gradient(135deg, #8ee6a8, #1a9e56)',
    description: 'Spring Boot 是当前 Java 后端开发的主流框架，本课程覆盖快速搭建、配置文件、Bean 管理与整合 MyBatis，完成从入门到实战。',
    chapters: [
      {
        id: 's-c1',
        title: '第一章 快速入门',
        lessons: [
          {
            id: 's1', title: 'Spring Boot 介绍与项目搭建', type: 'doc', duration: 14,
            content: `
              <h4>为什么用 Spring Boot</h4>
              <ul>
                <li>简化配置：约定优于配置，告别繁琐的 XML</li>
                <li>内嵌服务器：内置 Tomcat，jar 包直接运行</li>
                <li>起步依赖：一个 starter 引入一整套依赖</li>
              </ul>
              <h4>快速搭建</h4>
              <ol>
                <li>访问 start.spring.io 或使用 IDEA 的 Spring Initializr</li>
                <li>选择 Spring Web 依赖，生成项目</li>
                <li>编写启动类上的 Controller，运行 main 方法</li>
              </ol>
              <pre><code>@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot!";
    }
}</code></pre>
              <div class="tip-box">💡 Spring Boot 3.x 要求 JDK 17+，学习时注意版本匹配。</div>
            `
          },
          {
            id: 's2', title: '配置文件与多环境', type: 'doc', duration: 11,
            content: `
              <h4>两种配置格式</h4>
              <p><span class="inline-code">application.properties</span> 与 <span class="inline-code">application.yml</span>（层级清晰，推荐）：</p>
              <pre><code>server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db1
    username: root
    password: 123456</code></pre>
              <h4>多环境切换</h4>
              <pre><code>spring:
  profiles:
    active: dev   # 激活 dev 环境</code></pre>
              <div class="warn-box">⚠️ yml 中缩进必须用空格，且冒号后要有一个空格。</div>
            `
          }
        ]
      },
      {
        id: 's-c2',
        title: '第二章 核心功能',
        lessons: [
          {
            id: 's3', title: 'Bean 管理与依赖注入', type: 'doc', duration: 13,
            content: `
              <h4>常用注解</h4>
              <ul>
                <li><span class="inline-code">@Component / @Service / @Repository</span>：声明 Bean</li>
                <li><span class="inline-code">@Autowired</span>：按类型注入依赖</li>
                <li><span class="inline-code">@Value</span>：注入配置项</li>
                <li><span class="inline-code">@Configuration + @Bean</span>：注册第三方对象</li>
              </ul>
              <pre><code>@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
}</code></pre>
              <div class="tip-box">💡 Bean 默认单例；@Autowired 先按类型匹配，多个同类型时再按名称。</div>
            `
          },
          {
            id: 's4', title: '整合 MyBatis 与接口开发', type: 'doc', duration: 15,
            content: `
              <h4>整合步骤</h4>
              <ol>
                <li>引入 <span class="inline-code">mybatis-spring-boot-starter</span> 与 MySQL 驱动</li>
                <li>配置数据源与 mybatis（映射文件位置、驼峰转换）</li>
                <li>编写 Mapper 接口 + SQL，Controller 调用返回 JSON</li>
              </ol>
              <pre><code>@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(Integer id);
}</code></pre>
              <div class="tip-box">💡 前后端分离项目中，Controller 返回对象会自动序列化为 JSON。</div>
            `
          }
        ]
      }
    ]
  },

  {
    id: 'vue',
    title: 'Vue.js 前端入门',
    category: '前端开发',
    icon: '💚',
    color: 'linear-gradient(135deg, #a8e6cf, #35b57c)',
    description: '学习渐进式前端框架 Vue：模板语法、响应式数据、组件化开发与路由，能够独立开发现代化的单页应用界面。',
    chapters: [
      {
        id: 'v-c1',
        title: '第一章 Vue 核心',
        lessons: [
          {
            id: 'v1', title: '初识 Vue 与模板语法', type: 'doc', duration: 12,
            content: `
              <h4>声明式渲染</h4>
              <pre><code>&lt;div id="app"&gt;{{ message }}&lt;/div&gt;

&lt;script&gt;
new Vue({
    el: '#app',
    data: { message: 'Hello Vue!' }
});
&lt;/script&gt;</code></pre>
              <h4>常用指令</h4>
              <ul>
                <li><span class="inline-code">v-bind / :</span>：绑定属性</li>
                <li><span class="inline-code">v-on / @</span>：绑定事件</li>
                <li><span class="inline-code">v-if</span> 与 <span class="inline-code">v-show</span>：条件渲染</li>
                <li><span class="inline-code">v-for</span>：列表渲染</li>
                <li><span class="inline-code">v-model</span>：表单双向绑定</li>
              </ul>
              <div class="tip-box">💡 v-if 是真正的增删 DOM，v-show 只是切换 display；频繁切换用 v-show。</div>
            `
          },
          {
            id: 'v2', title: '组件化开发', type: 'doc', duration: 13,
            content: `
              <h4>组件思想</h4>
              <p>把页面拆成一个个可复用的组件，每个组件包含自己的模板、数据与逻辑。</p>
              <pre><code>Vue.component('my-btn', {
    template: '&lt;button @click="count++"&gt;点击了 {{count}} 次&lt;/button&gt;',
    data() {
        return { count: 0 };
    }
});</code></pre>
              <h4>组件通信</h4>
              <ul>
                <li>父传子：<span class="inline-code">props</span></li>
                <li>子传父：<span class="inline-code">$emit</span> 自定义事件</li>
              </ul>
            `
          }
        ]
      },
      {
        id: 'v-c2',
        title: '第二章 工程化进阶',
        lessons: [
          {
            id: 'v3', title: 'Vue Router 路由', type: 'doc', duration: 10,
            content: `
              <h4>SPA 单页应用</h4>
              <p>通过路由在不刷新页面的情况下切换"页面"组件。</p>
              <pre><code>const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
];</code></pre>
              <ul>
                <li><span class="inline-code">&lt;router-link&gt;</span>：导航链接</li>
                <li><span class="inline-code">&lt;router-view&gt;</span>：渲染出口</li>
              </ul>
            `
          }
        ]
      }
    ]
  }
];

/* 初始学习状态（进度 / 日志 / 待办 / 笔记 / 设置） */
function buildSeedState() {
  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const today = new Date();
  const iso = d => {
    const x = new Date(d);
    return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  };

  // 学习日志：最近 14 天（分钟）
  const studyLog = {};
  const logVals = [45, 60, 0, 90, 30, 75, 120, 0, 60, 45, 85, 100, 70, 35];
  logVals.forEach((v, i) => { studyLog[iso(now - (13 - i) * day)] = v; });

  // 已完成课时：Java 基础全部完成，Maven 完成前 4 课
  const progress = {};
  const doneIds = ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'm1', 'm2', 'm3', 'm4'];
  doneIds.forEach((id, i) => {
    progress[id] = { completed: true, completedAt: now - (doneIds.length - i) * day - 3600000 };
  });

  const todos = [
    { id: 't1', title: '完成 Maven 依赖传递课后练习', deadline: iso(now + 1 * day), done: false, createdAt: now - 2 * day },
    { id: 't2', title: '复习 MySQL 多表查询', deadline: iso(now - 1 * day), done: false, createdAt: now - 3 * day },
    { id: 't3', title: '整理 Java 集合知识笔记', deadline: iso(now + 3 * day), done: false, createdAt: now - 1 * day },
    { id: 't4', title: '搭建 Spring Boot HelloWorld 项目', deadline: iso(now - 2 * day), done: true, createdAt: now - 5 * day }
  ];

  const notes = [
    {
      id: 'n1', lessonId: 'm2', courseId: 'maven',
      content: '本地仓库路径配置在 conf/settings.xml 的 <localRepository> 标签；阿里云镜像配在 <mirrors> 里，两个配置都在 settings.xml 中完成。',
      createdAt: now - 1 * day
    },
    {
      id: 'n2', lessonId: 'j7', courseId: 'java',
      content: 'ArrayList 底层是数组、查询快；LinkedList 底层是链表、增删快。字符串比较一定用 equals()，== 比较的是地址。',
      createdAt: now - 4 * day
    }
  ];

  return {
    progress,
    studyLog,
    todos,
    notes,
    lastLessonId: 'm5',
    settings: { name: '学习者', goalMinutes: 60 }
  };
}

/* 导出（app.js 使用） */
window.SEED_COURSES = SEED_COURSES;
window.buildSeedState = buildSeedState;
