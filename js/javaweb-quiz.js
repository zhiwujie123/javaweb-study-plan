/* =====================================================
   JavaWeb 全程课 - 习题测验数据
   按课程章节出题：单选（options+answer 下标）与判断（选项为 正确/错误）
   题目根据课程知识点编写，附答案解析
   ===================================================== */

(function () {
  'use strict';

  function judge(q, ans, explain) {
    return { q: q, options: ['正确', '错误'], answer: ans ? 0 : 1, explain: explain };
  }
  function single(q, options, answer, explain) {
    return { q: q, options: options, answer: answer, explain: explain };
  }

  window.JW_QUIZ = [
    {
      id: 'w-c1', title: '第一章 · 课程导览',
      questions: [
        single('Web 开发中，负责"业务逻辑处理与数据存储"的一方通常是？', ['前端', '后端', '浏览器插件', '网页美工'], 1,
          '后端负责业务逻辑与数据存储（配合数据库），前端负责浏览器中呈现的页面与交互。'),
        single('前端开发"三件套"指的是哪三项技术？', ['Java / MySQL / Spring', 'HTML / CSS / JavaScript', 'HTTP / TCP / IP', 'Vue / React / Angular'], 1,
          'HTML 负责页面结构，CSS 负责样式，JavaScript 负责交互行为。'),
        judge('B/S 架构（Browser/Server）下，用户无需安装专门客户端，通过浏览器即可访问系统。', true,
          'B/S 架构只需要浏览器，程序升级只需更新服务器端，这也是 Web 应用普及的重要原因。'),
        judge('本课程以 tlias 教学管理系统为主线，贯穿需求分析、设计、前后端开发、测试到部署全流程。', true,
          '课程以 Tlias 教学管理系统实战贯穿，最后还会在 Linux/Docker 上完成部署。'),
        single('下列哪个属于"前端"的工作内容？', ['设计数据库表结构', '编写 Controller 接口', '实现页面布局与交互效果', '部署服务器'], 2,
          '页面布局与交互由前端完成；建表和接口属于后端，部署属于运维环节。'),
        judge('一个完整的 Web 项目通常需要前端、后端、数据库等多个部分协同工作。', true,
          '浏览器端页面 + 服务端程序 + 数据库三者协作，是典型的 Web 应用组成。')
      ]
    },
    {
      id: 'w-c2', title: '第二章 · HTML & CSS',
      questions: [
        single('以下哪个标签用于定义一级标题？', ['<head>', '<h1>', '<hr>', '<header>'], 1,
          '<h1>~<h6> 是标题标签，h1 最大；<head> 是页面头部区域，<hr> 是分割线。'),
        single('CSS 中"类选择器"的写法是？', ['#name', '.name', 'name', '*'], 1,
          '. 选择类，# 选择 id；标签名直接写标签选择器，* 是通配选择器。'),
        single('盒子模型从内到外的组成顺序是？', ['内容 → 内边距 → 边框 → 外边距', '内容 → 边框 → 内边距 → 外边距', '外边距 → 边框 → 内边距 → 内容', '内容 → 外边距 → 边框 → 内边距'], 0,
          'content → padding → border → margin，padding 是内容与边框间的留白，margin 是盒子之间的间距。'),
        judge('CSS 有行内、内嵌、外联三种引入方式，实际开发推荐使用外联样式表。', true,
          '外联样式实现结构与样式分离，可复用、便于维护，是推荐的写法。'),
        single('创建一个指向其他页面的超链接，应使用的标签是？', ['<a href="…">', '<img src="…">', '<link rel="…">', '<url>', ], 0,
          '<a> 标签的 href 属性指定跳转地址；<img> 用于图片；<link> 用于引入外部资源。'),
        single('<img> 标签中指定图片路径的必需属性是？', ['alt', 'title', 'src', 'href'], 2,
          'src 指定图片来源；alt 是加载失败时的替代文字，title 是悬停提示。'),
        judge('<div> 是块级元素（独占一行），<span> 是行内元素（一行可放多个）。', true,
          'div 常用于整体布局，span 常用于一行内容的局部包裹。'),
        single('CSS 中设置文字颜色的属性是？', ['text-color', 'color', 'font-color', 'colour'], 1,
          'CSS 属性是 color，如 color: red；背景色用 background-color。'),
        single('使用弹性布局时，容器（父元素）需要设置的属性是？', ['display: flex', 'float: left', 'position: absolute', 'overflow: auto'], 0,
          '父元素设置 display:flex 后成为弹性容器，可用 justify-content、align-items 控制排列。'),
        single('表单项中，用于输入密码（显示圆点）的类型是？', ['<input type="text">', '<input type="password">', '<input type="hidden">', '<input type="email">'], 1,
          'type="password" 会将输入内容以掩码显示；hidden 表示隐藏域。')
      ]
    },
    {
      id: 'w-c3', title: '第三章 · JavaScript',
      questions: [
        single('JS 中声明"不可重新赋值"的变量应使用？', ['var', 'let', 'const', 'static'], 2,
          'const 声明常量，不能重新赋值；let 声明的变量可以重新赋值；var 是旧写法。'),
        single('表达式 typeof "abc" 的结果是？', ['"number"', '"string"', '"boolean"', '"object"'], 1,
          'typeof 用于判断数据类型，字符串返回 "string"。'),
        judge('JS 是弱类型语言，同一变量可以先后赋予不同类型的值。', true,
          'JS 变量没有固定类型，赋什么值就是什么类型，这与 Java 等强类型语言不同。'),
        single('把 JSON 字符串解析为 JS 对象，应使用？', ['JSON.parse(str)', 'JSON.stringify(obj)', 'str.toJson()', 'eval(str)'], 0,
          'JSON.parse 解析字符串为对象，JSON.stringify 把对象序列化为字符串。'),
        single('下列哪个 API 可以按 CSS 选择器获取页面元素？', ['document.querySelector', 'window.selector', 'document.find', 'page.get'], 0,
          'querySelector / querySelectorAll 支持 "#id"、".class"、"标签" 等选择器写法。'),
        single('为按钮绑定点击事件，推荐的写法是？', ['btn.push("click")', 'btn.addEventListener("click", fn)', 'btn.click == fn', 'bind(btn, "click")'], 1,
          'addEventListener 是标准的事件绑定方式，可为同一事件绑定多个处理函数。'),
        judge('比较两个值时，== 会进行类型转换，=== 不会，开发中推荐使用 ===。', true,
          '"1" == 1 为 true 而 "1" === 1 为 false；=== 更严格，可避免隐式转换带来的坑。'),
        single('JSON 在开发中的主要用途是？', ['压缩图片', '作为一种轻量级数据交换格式', '加密数据', '绘制页面样式'], 1,
          'JSON 格式简洁、易读易解析，是前后端传输数据的通用格式。'),
        single('以下哪个不属于 JS 的数据类型？', ['number', 'string', 'int', 'undefined'], 2,
          'JS 没有整型 int，数字统一为 number 类型。'),
        judge('DOM（文档对象模型）把页面解析为对象树，JS 可以通过 DOM 动态修改页面内容与样式。', true,
          'JS 通过操作 DOM 节点实现页面动态更新，是网页交互的基础。')
      ]
    },
    {
      id: 'w-c4', title: '第四章 · Vue 入门与 Ajax',
      questions: [
        single('Vue 中插值表达式（显示 data 中的数据）的写法是？', ['${msg}', '{{ msg }}', '#msg#', '<% msg %>'], 1,
          'Vue 使用双大括号 {{ }} 插值，会把 data 中的数据渲染到标签体。'),
        single('使用 v-for 渲染列表时，绑定 key 的主要作用是？', ['美化样式', '帮助 Vue 标识每一项，提升更新性能', '设置字体大小', '防止报错必须手动写死'], 1,
          'key 是每项的唯一标识，Vue 依据它高效比对更新 DOM，一般用唯一 id 而不是下标。'),
        judge('v-if 是真正地创建/移除元素（控制 DOM），v-show 只是通过 display 控制显示隐藏。', true,
          '频繁切换显示状态用 v-show（开销小）；条件很少变化时用 v-if 更合适。'),
        single('实现表单输入与数据"双向绑定"的指令是？', ['v-bind', 'v-model', 'v-on', 'v-for'], 1,
          'v-model 让表单值变化自动同步到数据，数据变化也自动更新表单。'),
        single('v-bind 绑定属性的简写符号是？', ['@', ':', '#', '$'], 1,
          'v-bind:src 可简写为 :src；@ 是 v-on 事件绑定的简写。'),
        single('给按钮绑定点击事件，Vue 中的写法是？', ['v-on:click 或 @click', 'v-model:click', 'v-bind:click', 'onclickVue'], 0,
          'v-on:click 可简写为 @click，后接 methods 中的处理函数。'),
        judge('Ajax 的核心作用是：在不刷新整个页面的前提下，与服务器交换数据并更新部分页面。', true,
          'Ajax（异步 JavaScript 与 XML）让页面局部更新成为可能，大幅提升体验。'),
        single('创建 Vue 实例时，指定挂载容器的配置项是？', ['el', 'data', 'methods', 'url'], 0,
          'el 指定 Vue 管理的容器（如 "#app"）；data 存放数据；methods 存放方法。'),
        single('Ajax 请求发送后，处理服务器响应数据的时机是？', ['立即同步拿到', '在响应回来后的回调中处理', '刷新页面后处理', '需要手动循环等待'], 1,
          'Ajax 是异步的，通过回调函数（或 Promise）在响应到达后再处理数据。'),
        judge('Vue 是渐进式框架，可以在已有页面中只引入部分功能，也可以逐步扩展到大型工程。', true,
          '渐进式意味着用多少学多少，从简单引入到工程化开发都能支持。')
      ]
    },
    {
      id: 'w-c5', title: '第五章 · Maven 与单元测试',
      questions: [
        single('Maven 的两大核心功能是？', ['依赖管理 与 项目构建', '编写代码 与 调试', '测试 与 部署', '设计 与 建模'], 0,
          'Maven 统一管理 jar 包依赖，并按生命周期自动完成编译、测试、打包等构建过程。'),
        single('Maven 查找依赖 jar 包的顺序是？', ['中央仓库 → 本地仓库 → 私服', '本地仓库 → 私服 → 中央仓库', '私服 → 中央仓库 → 本地仓库', '随机查找'], 1,
          '先查本地，本地没有再去私服（如阿里云镜像），最后才到中央仓库。'),
        single('Maven 坐标的三要素是？', ['id / name / url', 'groupId / artifactId / version', 'class / method / field', 'src / test / target'], 1,
          'groupId 组织标识、artifactId 项目/模块名、version 版本号，三者唯一定位一个依赖。'),
        single('引入 junit 依赖时，scope 一般设置为？', ['compile', 'test', 'provided', 'runtime'], 1,
          'junit 只在测试阶段使用，scope 为 test：参与测试，不参与打包发布。'),
        judge('在同一套生命周期内，执行后面的阶段（如 install）会先自动执行前面的阶段（compile、test、package）。', true,
          '生命周期阶段有序串联，这保证构建过程完整、可复现。'),
        single('执行 mvn clean 命令的作用是？', ['清除本地仓库', '删除 target 目录（清理构建产物）', '清空数据库', '卸载 Maven'], 1,
          'clean 生命周期负责清理，默认删除 target 目录中的构建输出。'),
        single('JUnit 单元测试方法上需要标注的注解是？', ['@Test', '@TestRun', '@Unit', '@Check'], 0,
          '@Test 标注的方法可被 JUnit 独立运行；一个类中可有多个测试方法。'),
        single('断言"两个值相等"常用的 JUnit 方法是？', ['assertSame', 'assertEquals', 'assertNull', 'assertTrue'], 1,
          'assertEquals(期望值, 实际值)，不相等时测试失败并给出提示。'),
        judge('@BeforeAll 修饰的方法会在所有测试方法执行前执行一次，且必须声明为 static。', true,
          '与 @BeforeEach（每个方法前执行）不同，@BeforeAll 只执行一次，适合做全局初始化。'),
        single('单元测试的测试对象粒度通常是？', ['整个系统', '某个模块', '一个方法（最小可测单元）', '一行代码'], 2,
          '单元测试以方法为最小单元，验证单个方法的逻辑正确性。')
      ]
    },
    {
      id: 'w-c6', title: '第六章 · SpringBoot Web 基础',
      questions: [
        single('SpringBoot 内嵌的 Web 服务器是？', ['Nginx', 'Apache HTTP Server', 'Tomcat', 'IIS'], 2,
          'SpringBoot 内嵌 Tomcat，打成 jar 包后 java -jar 即可运行，无需单独装服务器。'),
        judge('起步依赖（starter）的本质是利用 Maven 的依赖传递，引入一个 starter 就能获得一整套相关依赖。', true,
          '例如 spring-boot-starter-web 会传递引入 web 开发所需的一批依赖，简化配置。'),
        single('编写"返回 JSON 数据"的接口，常在类上标注的组合注解是？', ['@Controller + @ResponseBody（即 @RestController）', '@Service', '@Component', '@Configuration'], 0,
          '@RestController = @Controller + @ResponseBody，方法返回值直接序列化为 JSON。'),
        single('HTTP 状态码 404 表示？', ['请求成功', '服务器内部错误', '请求的资源不存在', '重定向'], 2,
          '200 成功、404 资源不存在（路径错误）、500 服务器内部异常。'),
        single('GET 请求的请求参数一般放在哪里？', ['URL（请求行）中', '请求体中', 'Cookie 中', '响应头中'], 0,
          'GET 参数拼接在 URL 后（?name=value&…），有大小限制；POST 参数放在请求体中。'),
        judge('HTTP 协议是基于 TCP 的应用层协议，且每次请求之间相互独立（无状态）。', true,
          'HTTP 默认端口 80（HTTPS 443）；无状态意味着服务器不记忆上一次请求。'),
        single('三层架构中，负责"业务逻辑处理"的是哪一层？', ['Controller', 'Service', 'Dao', 'View'], 1,
          'Controller 接收请求，Service 处理业务逻辑，Dao 操作数据库。'),
        single('IOC（控制反转）的含义是？', ['对象的创建与管理工作交给容器，而不是程序员手动 new', '程序自动生成代码', '把对象序列化到磁盘', '异常统一捕获'], 0,
          'IOC 容器负责对象的创建与生命周期管理，降低耦合。'),
        single('从 IOC 容器中注入依赖对象，常用的注解是？', ['@Autowired', '@Override', '@Test', '@throws'], 0,
          '@Autowired 按类型从容器中注入 Bean；配合 @Component 等注解使用。'),
        judge('@Service、@Repository、@Controller 都能将类交给 IOC 容器管理，只是语义上区分了不同层。', true,
          '它们都派生自 @Component，按层使用语义更清晰，便于扫描与维护。')
      ]
    },
    {
      id: 'w-c7', title: '第七章 · MySQL 数据库',
      questions: [
        single('MySQL 属于哪一类数据库？', ['关系型数据库', '文档数据库', '键值数据库', '图形数据库'], 0,
          'MySQL 以二维表组织数据，通过外键表达表间关系，是典型的关系型数据库（RDBMS）。'),
        single('创建表时设置主键"自增"的关键字是？', ['AUTO_INCREMENT', 'IDENTITY', 'SERIAL', 'AUTOADD'], 0,
          'id INT PRIMARY KEY AUTO_INCREMENT，插入时不指定 id 会自动递增。'),
        judge('VARCHAR(n) 表示可变长字符串，n 是最大字符数，实际占用空间随内容变化。', true,
          '与 CHAR（定长）不同，VARCHAR 更节省空间，适合长度不固定的文本。'),
        single('以下哪个属于 DDL（数据定义语言）语句？', ['SELECT', 'INSERT', 'CREATE TABLE', 'UPDATE'], 2,
          'DDL 定义库表结构（CREATE/ALTER/DROP）；DML 增删改数据；DQL 查询。'),
        single('查询"姓张的用户"，条件写法是？', ["name = '张'", "name LIKE '张%'", "name IN ('张')", "name IS '张'"], 1,
          'LIKE 配合通配符 %（任意多个字符），\'张%\' 表示以张开头的任意字符串。'),
        single('分组查询后对聚合结果进行过滤，应使用？', ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], 1,
          'WHERE 在分组前过滤（不能用聚合函数），HAVING 在分组后过滤聚合结果。'),
        single('每页 10 条、取第 2 页数据，LIMIT 写法是？', ['LIMIT 10, 10', 'LIMIT 0, 10', 'LIMIT 2', 'LIMIT 10, 2'], 0,
          'LIMIT 起始索引, 条数；起始索引 = (页码-1)*每页条数 = 10。'),
        judge('WHERE 子句中不能直接使用聚合函数。', true,
          '聚合结果在分组后才产生，须用 HAVING 过滤，如 HAVING COUNT(*) > 5。'),
        single('COUNT(*) 的作用是？', ['求和', '统计满足条件的行数', '求平均值', '取最大值'], 1,
          'COUNT 统计行数；SUM 求和、AVG 平均、MAX/MIN 最值。'),
        single('DML 语句不包括以下哪个？', ['INSERT', 'UPDATE', 'DELETE', 'SELECT'], 3,
          'DML 负责增删改；SELECT 属于 DQL（数据查询语言）。')
      ]
    },
    {
      id: 'w-c8', title: '第八章 · JDBC 与 Mybatis',
      questions: [
        single('JDBC 编程中，用于获取数据库连接的入口类是？', ['DriverManager', 'Statement', 'ResultSet', 'Connection Pool'], 0,
          'DriverManager.getConnection(url, user, password) 获取 Connection 连接对象。'),
        judge('使用预编译 SQL（PreparedStatement）可以防止 SQL 注入，同时提升重复执行的效率。', true,
          '参数以 ? 占位单独传输，不会被拼接成 SQL 片段执行，安全且高效。'),
        single('SQL 注入产生的根本原因是？', ['数据库性能差', '用户输入被拼接进 SQL 语句一起执行', '网络不稳定', '密码太简单'], 1,
          '如密码输入 "or\'1\'=\'1" 被拼进 SQL 改变语义；预编译占位符可杜绝此类问题。'),
        single('Mybatis 的定位是？', ['前端框架', '持久层框架：简化 JDBC 操作', '构建工具', '版本管理工具'], 1,
          'Mybatis 封装了连接管理、结果映射等 JDBC 繁琐步骤，让开发者专注 SQL 本身。'),
        single('Mybatis 的 Mapper 接口绑定 XML 映射文件时，namespace 应为？', ['SQL 语句名', 'Mapper 接口的全类名', '数据库表名', '任意字符串'], 1,
          'namespace 必须是对应 Mapper 接口的全限定类名，方法 id 与接口方法名一致。'),
        judge('数据库连接池可以复用连接，避免每次请求都创建、销毁连接的开销。', true,
          '连接池预先建立并管理连接（如 Hikari），用完归还，大幅提升性能。'),
        single('SpringBoot 默认集成的数据库连接池是？', ['Druid', 'C3P0', 'HikariCP', 'DBCP'], 2,
          'SpringBoot 2.x 起默认使用 HikariCP（号称最快的连接池）。'),
        single('Mybatis 中 #{} 占位符的处理方式是？', ['字符串拼接进 SQL', '预编译占位（转换为 ?），防止注入', '直接忽略', '转成 JSON'], 1,
          '#{} 走预编译；${} 是字符串替换，有注入风险，动态表名列名才谨慎使用。'),
        single('开启 Mybatis"数据库字段下划线 → Java 属性驼峰"自动映射的配置项是？', ['map-underscore-to-camel-case', 'camel-case-on', 'auto-map', 'field-mapper'], 0,
          '配置 map-underscore-to-camel-case: true 后，create_time 自动映射为 createTime。'),
        single('Mybatis XML 映射中，指定查询结果封装类型的属性是？', ['resultType', 'type', 'class', 'entity'], 0,
          'resultType 指定每行记录封装成哪个类型（全类名或别名）。')
      ]
    },
    {
      id: 'w-c9', title: '第九章 · Tlias 后端实战',
      questions: [
        single('RESTful 风格中，"新增资源"应使用的请求方式是？', ['GET', 'POST', 'PUT', 'DELETE'], 1,
          '约定：GET 查询、POST 新增、PUT 修改、DELETE 删除。'),
        single('路径参数（如 /dept/{id}）在 Controller 中用什么注解接收？', ['@RequestParam', '@PathVariable', '@RequestBody', '@Param'], 1,
          '@PathVariable 接收 URL 路径中的参数；@RequestParam 接收查询参数；@RequestBody 接收 JSON 请求体。'),
        judge('统一响应结果（如 code/msg/data 的 Result 对象）便于前后端按统一格式判断成功失败并处理数据。', true,
          '前端根据 code 是否为成功码决定走成功还是失败逻辑，降低联调成本。'),
        single('课程中实现"分页查询"使用的插件是？', ['Mybatis Generator', 'PageHelper', 'Lombok', 'Redis'], 1,
          'PageHelper 通过 PageHelper.startPage(页码, 条数) 自动拼接分页，并返回总记录数。'),
        single('Spring 中声明式事务的注解是？', ['@Transactional', '@Transaction', '@Commit', '@RollbackOnly'], 0,
          '标注在方法/类上，出现异常自动回滚，保证一组操作要么全成功要么全失败。'),
        judge('@Transactional 默认只对 RuntimeException 和 Error 回滚，建议指定 rollbackFor = Exception.class 覆盖受检异常。', true,
          '默认策略下受检异常不回滚，可能造成数据不一致，所以实践中常显式指定 rollbackFor。'),
        single('事务的四大特性（ACID）不包括？', ['原子性', '一致性', '并发性', '隔离性'], 2,
          'ACID = 原子性、一致性、隔离性、持久性，没有"并发性"。'),
        single('文件上传接口的请求方式与参数格式通常是？', ['GET + JSON', 'POST + multipart/form-data', 'PUT + text', 'DELETE + XML'], 1,
          '文件属于二进制数据，需用 POST 提交 multipart/form-data 表单格式。'),
        single('相比 @Value 逐个注入配置项，@ConfigurationProperties 的优势是？', ['性能更快', '按前缀批量绑定配置到实体类', '可以不写配置文件', '自动加密配置'], 1,
          '通过 prefix 前缀把一组配置整体绑定到 Bean 属性，便于集中管理（如 OSS 配置）。'),
        single('实现"全局异常处理"，把异常与响应结果统一映射的注解组合是？', ['@RestControllerAdvice + @ExceptionHandler', '@Controller + @Service', '@Advice + @Error', '@Global + @Exception'], 0,
          '@RestControllerAdvice 标注全局处理类，@ExceptionHandler 指定捕获哪类异常并返回统一结果。')
      ]
    },
    {
      id: 'w-c10', title: '第十章 · 登录认证与 AOP',
      questions: [
        single('JWT 令牌由哪三部分组成？', ['Header.Payload.Signature', 'Head.Body.Tail', 'User.Pass.Token', 'Id.Name.Time'], 0,
          '头部（算法）、载荷（用户数据）、签名（防篡改），以 . 分隔。'),
        judge('JWT 的前两部分只是 Base64 编码、可被解码查看，因此不能存放敏感信息；防篡改依赖第三部分签名。', true,
          '令牌内容可读但不可伪造，私钥签名保证完整性，所以别把密码放进载荷。'),
        single('登录校验（拦截未登录请求）最适合统一放在哪里处理？', ['每个方法里重复写', 'Filter 过滤器或 Interceptor 拦截器中统一校验', '数据库触发器', '浏览器控制台'], 1,
          '统一在 Filter/Interceptor 中校验令牌，避免在每个接口重复编写校验代码。'),
        single('关于 Filter 与 Interceptor 的区别，说法正确的是？', ['完全相同', 'Filter 由 Servlet 容器管理、范围更大；Interceptor 是 Spring 提供、可注入使用容器中的 Bean', 'Interceptor 只能用于前端', 'Filter 只能校验格式'], 1,
          'Filter 属于 Servlet 规范，拦截所有请求；Interceptor 由 SpringMVC 提供，只拦截进入 Controller 的请求且依赖 IOC。'),
        single('拦截器 preHandle 方法中"放行"的返回值是？', ['return true', 'return false', 'return null', 'return -1'], 0,
          'preHandle 返回 true 放行继续执行；返回 false 表示拦截，请求到此结束。'),
        single('AOP（面向切面编程）的核心作用是？', ['加快页面加载', '把与业务无关的横切逻辑（日志、事务等）抽取出来统一处理', '替代数据库', '生成前端代码'], 1,
          'AOP 在不动业务代码的前提下，把日志记录、事务管理等通用逻辑织入目标方法。'),
        single('想要在目标方法执行前后都能编写逻辑并控制其执行，应使用哪种通知？', ['@Around 环绕通知', '@Before', '@AfterReturning', '@AfterThrowing'], 0,
          '@Around 可以在 proceed() 前后添加逻辑，功能最强。'),
        single('切入点表达式 execution(* com.itheima.service.*.*(..)) 的含义是？', ['匹配 service 包下所有类的所有方法', '只匹配 service 类', '匹配所有注解', '匹配数据库操作'], 0,
          '第一个 * 任意返回值，service 后两个 * 分别表示任意类、任意方法，(..) 表示任意参数。'),
        judge('JoinPoint 可以在通知中获取目标方法的信息，如类名、方法名、参数列表。', true,
          '常用于日志场景：记录"谁在什么时间调用了什么方法、传了什么参数"。'),
        single('课程中通过 AOP 实现的典型应用是？', ['自动登录', '记录操作日志', '数据加密', '页面美化'], 1,
          '利用环绕通知统一记录操作日志（操作人、时间、方法、参数等），无需修改业务代码。')
      ]
    },
    {
      id: 'w-c11', title: '第十一章 · 原理篇与 Maven 高级',
      questions: [
        single('SpringBoot 各种配置中优先级最高的是？', ['application.yml', 'application.properties', '命令行参数', '随机'], 2,
          '命令行参数 > properties/yml 等配置文件，部署时常用命令行覆盖配置。'),
        judge('@Bean 标注的方法，其返回值会交给 IOC 容器管理，常用于注册第三方库的对象。', true,
          '第三方类无法加 @Component（改不了源码），就在 @Configuration 类中用 @Bean 方法注册。'),
        single('IOC 容器中 Bean 默认的作用域是？', ['singleton 单例', 'prototype 原型', 'request', 'session'], 0,
          '默认单例：整个容器一个实例；@Scope("prototype") 每次获取都创建新对象。'),
        single('起步依赖能简化依赖配置，其原理是？', ['魔法', '依赖传递：starter 内部声明了一组依赖', '自动下载全部 jar', '删除无用依赖'], 1,
          'starter 自身也是普通 Maven 依赖，靠传递机制把它管理的依赖一并引入。'),
        single('SpringBoot 自动配置的常见实现方案包括？', ['手动 new', '@ComponentScan 扫描 与 @Import 导入（配合 @EnableXxx）', '复制源码', '修改 JVM 参数'], 1,
          '要么把启动类放在合适包下用组件扫描，要么通过 @Import/@EnableXxx 引入第三方配置类。'),
        judge('@Conditional 系列注解可按条件决定 Bean 是否注册，例如类路径存在某类、用户配置了某属性时才生效。', true,
          '如 @ConditionalOnClass、@ConditionalOnMissingBean，是自动配置"按需生效"的关键。'),
        single('自定义 starter 通常包含哪两个模块？', ['src 和 test', 'autoconfigure 自动配置模块 与 starter 依赖模块', 'web 和 dao', '前端和后端'], 1,
          'autoconfigure 写自动配置逻辑，starter 只负责聚合依赖，二者配合交付。'),
        single('Maven 分模块设计中，父工程统一管理依赖版本的标签是？', ['<dependency>', '<dependencyManagement>', '<modules>', '<parent>'], 1,
          '<dependencyManagement> 只声明版本不实际引入，子模块引用时无需写版本号。'),
        single('Maven 聚合（<modules>）的作用是？', ['合并代码文件', '在父工程上一键构建、打包所有子模块', '自动修复 Bug', '生成文档'], 1,
          '聚合让多条构建命令变成一条，保证模块按依赖顺序构建。'),
        judge('私服是搭建在局域网内的远程仓库，可代理中央仓库并托管公司内部的组件。', true,
          'Nexus/Artifactory 常见用途：加速依赖下载、分享内部 jar 包、统一版本管控。')
      ]
    },
    {
      id: 'w-c12', title: '第十二章 · Vue 工程化与 Tlias 前端',
      questions: [
        single('创建 Vue 工程化项目推荐使用的官方工具是？', ['create-vue（npm init vue@latest）', '手动复制文件', 'Word 模板', 'Photoshop'], 0,
          'create-vue 是官方脚手架，一键生成带路由、状态管理等可选功能的项目骨架。'),
        single('Vue 工程化项目的基本组成单位是？', ['单个巨大 HTML', '组件（.vue 单文件组件：模板+脚本+样式）', '图片', 'CSS 文件'], 1,
          '.vue 文件把页面拆成独立组件，各自维护模板、逻辑与样式，便于复用协作。'),
        judge('组合式 API 中，ref() 创建响应式数据；在 script 中读写要用 .value，模板中则不用。', true,
          'ref 包装后数据变化才能被 Vue 追踪并驱动视图更新。'),
        single('执行 npm run build 后，用于部署的产物目录是？', ['src', 'node_modules', 'dist', 'public'], 2,
          '构建把源码编译打包进 dist，把 dist 部署到 Nginx 等服务器即可访问。'),
        single('ElementPlus 中用于展示表格数据的组件是？', ['el-table', 'el-grid', 'el-list', 'el-form'], 0,
          'el-table 配合 el-table-column 定义列，支持自定义模板、排序等。'),
        single('ElementPlus 的分页组件是？', ['el-page', 'el-pagination', 'el-paging', 'el-split'], 1,
          'el-pagination 提供页码、每页条数、总数等事件与属性，配合后端分页接口使用。'),
        single('ElementPlus 中弹出对话框（如新增/编辑表单）的组件是？', ['el-alert', 'el-dialog', 'el-message', 'el-card'], 1,
          '通过 v-model 控制显示隐藏，内部可放表单完成新增编辑交互。'),
        single('ElementPlus 表单校验规则通过哪个属性配置？', ['rules', 'check', 'validate-list', 'limits'], 0,
          'el-form 定义 rules（必填、格式等），触发 validate() 完成校验。'),
        judge('VueRouter 的嵌套路由通过 children 配置实现"页面中再切换子页面"（如菜单内多级页面）。', true,
          '父路由组件内用 <router-view> 渲染子路由，实现布局与内容的层级复用。'),
        single('前端项目打包后，通常把它部署到？', ['数据库', 'Web 服务器（如 Nginx）', 'Java 编译器', '手机本地'], 1,
          'dist 目录放到 Nginx 等静态服务器，即可对外提供访问。')
      ]
    },
    {
      id: 'w-c13', title: '第十三章 · Linux 与 Docker 部署',
      questions: [
        single('Linux 中查看当前目录下内容的命令是？', ['ls', 'dir-only', 'show', 'cat'], 0,
          'ls 列出目录内容；常用 ls -l（详情）、ls -a（含隐藏）。'),
        single('递归删除一个目录及其内容，应使用？', ['rm -r', 'rm -f file', 'del /s', 'erase'], 0,
          'rm -r 递归删除目录；-f 强制不提示，组合 rm -rf 慎用。'),
        single('Linux 中常用的"打包压缩"命令是？', ['tar -zcvf', 'zip-file', 'compress -all', 'pack now'], 0,
          'tar -zcvf 目标.tar.gz 待打包目录；解压用 tar -zxvf。'),
        judge('Linux 的设计理念是"一切皆文件"：目录、设备等都以文件形式统一管理。', true,
          '如磁盘设备是 /dev 下的文件，系统信息可从 /proc 下的文件读取。'),
        single('Docker 中"镜像"与"容器"的关系是？', ['镜像运行后的实例是容器', '完全相同的概念', '容器生成镜像的模板', '互不相关'], 0,
          '镜像是不变的模板（类似安装包），容器是镜像运行起来的实例（类似安装的软件）。'),
        single('基于镜像启动一个新容器的命令是？', ['docker run', 'docker start -new', 'docker make', 'docker open'], 0,
          'docker run 镜像名：不存在时先拉取再创建并启动容器。'),
        single('Docker"数据卷挂载"的主要作用是？', ['加速网络', '让容器内目录与宿主机目录映射，实现数据持久化与同步', '压缩镜像', '限制内存'], 1,
          '容器删除后挂载的数据仍在宿主机上；修改也可双向同步。'),
        single('自定义 Docker 镜像时编写的构建说明文件是？', ['Dockerfile', 'docker.json', 'image.config', 'build.xml'], 0,
          'Dockerfile 通过 FROM、COPY、RUN、CMD 等指令描述构建步骤。'),
        judge('在自定义 Docker 网络中，容器之间可以直接通过容器名互相访问。', true,
          '自定义网络内置 DNS，容器名即可当域名使用，方便如应用连数据库。'),
        single('DockerCompose 解决的问题是？', ['代码加密', '用一个 YAML 声明并一键启动多个容器（如前后端+数据库）', '美化界面', '编写 SQL'], 1,
          'docker compose up 一条命令按依赖顺序编排启动整套服务。')
      ]
    }
  ];
})();
