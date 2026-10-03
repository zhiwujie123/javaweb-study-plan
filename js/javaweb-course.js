/* =====================================================
   JavaWeb 全程课（黑马 · Tlias 实战）课程数据
   200 集标题与时长取自 B 站分P列表（BV1yGydYEE3H）
   每集通过 lesson.url 直达对应分P
   ===================================================== */

(function () {
  'use strict';

  var BV_URL = 'https://www.bilibili.com/video/BV1yGydYEE3H';

  /* 默认标记已学：第 34 集（含）之前已完成，从 35 集继续学习
     想调整初始进度，只改这一个数字即可 */
  var JW_LEARNED_UNTIL_P = 34;

  /* 分P数据：[集数, 标题, 时长秒] */
  var EPISODES = [
    [1, 'Web开发-导学视频', 1355],
    [2, 'Web前端开发初识', 795],
    [3, 'HTML-CSS-入门程序', 1586],
    [4, 'HTML-CSS-VsCode开发工具', 1891],
    [5, 'HTML-CSS-常见标签和样式-央视新闻-标题-排版', 1004],
    [6, 'HTML-CSS-常见标签和样式-央视新闻-标题-样式', 1561],
    [7, 'HTML-CSS-常见标签和样式-央视新闻-标题-样式(选择器)', 945],
    [8, 'HTML-CSS-常见标签和样式-央视新闻-正文-排版', 1671],
    [9, 'HTML-CSS-常见标签和样式-央视新闻-正文-样式', 691],
    [10, 'HTML-CSS-常见标签和样式-央视新闻-整体布局', 1864],
    [11, 'HTML-CSS-常见标签和样式-tlias案例-顶部导航栏', 1800],
    [12, 'HTML-CSS-常见标签和样式-表单标签', 1077],
    [13, 'HTML-CSS-常见标签和样式-表单项标签', 1057],
    [14, 'HTML-CSS-常见标签和样式-tlias案例-搜索表单区域', 1021],
    [15, 'HTML-CSS-常见标签和样式-tlias案例-底部版权区域', 1559],
    [16, 'HTML-CSS-课程总结', 601],
    [17, 'JS-课程介绍', 367],
    [18, 'JS-核心语法-引入方式', 627],
    [19, 'JS-核心语法-变量&数据类型', 1352],
    [20, 'JS-核心语法-函数', 738],
    [21, 'JS-核心语法-自定义对象&JSON', 1261],
    [22, 'JS-核心语法-DOM', 1127],
    [23, 'JS-事件监听-语法&常见事件', 1863],
    [24, 'JS-事件监听-常见事件(优化-JS模块化)', 794],
    [25, 'Vue-快速入门', 1570],
    [26, 'Vue-常用指令-v-for', 1508],
    [27, 'Vue-常用指令-v-bind&v-if&v-show', 1177],
    [28, 'Vue-常用指令-v-model与v-on', 1533],
    [29, 'Ajax-入门', 1523],
    [30, 'Ajax-案例', 1483],
    [31, 'Maven-课程介绍', 1055],
    [32, 'Maven-概述-介绍&安装', 1315],
    [33, 'Maven-IDEA集成', 1438],
    [34, 'Maven-依赖管理', 1578],
    [35, '单元测试-概述&入门', 1389],
    [36, '单元测试-断言&常见注解', 1655],
    [37, '单元测试-企业开发规范&AI生成生成单元测试', 1711],
    [38, '单元测试-Maven依赖范围', 612],
    [39, 'Maven-常见问题解决方案', 338],
    [40, 'Web基础-课程安排', 562],
    [41, 'Web基础-SpringBootWeb入门-入门程序', 1696],
    [42, 'Web基础-SpringBootWeb入门-入门解析', 692],
    [43, 'Web基础-HTTP协议-概述', 611],
    [44, 'Web基础-HTTP协议-请求协议', 1239],
    [45, 'Web基础-HTTP协议-响应协议', 1541],
    [46, 'Web基础-SpringBootWeb案例', 2322],
    [47, 'Web基础-分层解耦-三层架构', 1348],
    [48, 'Web基础-分层解耦-IOC与DI入门', 1097],
    [49, 'Web基础-分层解耦-IOC&DI详解', 2513],
    [50, 'MySQL-课程介绍', 810],
    [51, 'MySQL-概述-安装&数据模型', 1626],
    [52, 'MySQL-SQL-DDL-数据库操作&图形化工具', 1848],
    [53, 'MySQL-SQL-DDL-表操作-创建表', 1827],
    [54, 'MySQL-SQL-DDL-表操作-数据类型', 1225],
    [55, 'MySQL-SQL-DDL-表操作-设计表案例', 1606],
    [56, 'MySQL-SQL-DDL-表操作-查询-修改-删除', 942],
    [57, 'MySQL-SQL-DML-insert&update&delete', 1820],
    [58, 'MySQL-SQL-DQL-基本查询', 1123],
    [59, 'MySQL-SQL-DQL-条件查询', 1286],
    [60, 'MySQL-SQL-DQL-分组查询', 1408],
    [61, 'MySQL-SQL-DQL-排序查询&分页查询', 1199],
    [62, 'JDBC-入门程序', 1370],
    [63, 'JDBC-执行DQL语句', 1269],
    [64, 'JDBC-预编译SQL', 1311],
    [65, 'Mybatis-入门程序', 1573],
    [66, 'Mybatis-辅助配置&JDBC VS Mybatis', 951],
    [67, 'Mybatis-数据库连接池', 941],
    [68, 'Mybatis-增删改查-删除操作', 967],
    [69, 'Mybatis-增删改查-新增操作', 552],
    [70, 'Mybatis-增删改查-更新操作', 404],
    [71, 'Mybatis-增删改查-查询操作', 1249],
    [72, 'Mybatis-XML映射配置', 1733],
    [73, 'SpringBoot项目配置文件', 1400],
    [74, '准备工作-开发规范-开发模式', 1131],
    [75, '准备工作-开发规范-Restful', 1262],
    [76, '准备工作-工程搭建', 1345],
    [77, '部门管理-列表查询-接口开发', 1838],
    [78, '部门管理-列表查询-结果封装', 635],
    [79, '部门管理-列表查询-前后端联调测试', 1404],
    [80, '部门管理-删除部门-接口开发', 1925],
    [81, '部门管理-新增部门-接口开发', 1267],
    [82, '部门管理-修改部门-查询回显', 1166],
    [83, '部门管理-修改部门-修改数据', 1258],
    [84, '日志技术-Logback入门程序', 1282],
    [85, '日志技术-Logback配置文件&日志级别', 1859],
    [86, '多表关系-一对多', 1993],
    [87, '多表关系-一对一&多对多', 989],
    [88, '多表关系-多表设计案例', 1097],
    [89, '多表查询-概述', 824],
    [90, '多表查询-内连接&外连接', 1619],
    [91, '多表查询-子查询', 1635],
    [92, '多表查询-案例', 1320],
    [93, '员工管理-准备工作', 749],
    [94, '员工管理-分页查询-原理分析', 1387],
    [95, '员工管理-分页查询-代码实现', 1976],
    [96, '员工管理-分页查询-PageHelper分页插件', 1833],
    [97, '员工管理-条件分页查询-基本实现', 2038],
    [98, '员工管理-条件分页查询-程序优化', 2195],
    [99, '员工管理-新增员工-保存员工基本信息', 1816],
    [100, '员工管理-新增员工-批量保存员工工作经历', 1945],
    [101, '事务管理-介绍与操作', 1176],
    [102, '事务管理-Spring事务管理-介绍', 952],
    [103, '事务管理-Spring事务管理-进阶&事务四大特性', 2336],
    [104, '文件上传-介绍', 1565],
    [105, '文件上传-本地存储', 1188],
    [106, '文件上传-阿里云OSS-准备工作', 1586],
    [107, '文件上传-阿里云OSS-入门程序', 951],
    [108, '文件上传-阿里云OSS-案例集成', 1278],
    [109, '文件上传-阿里云OSS-程序优化(@Value&@ConfigurationProperties)', 1278],
    [110, '员工管理-删除员工-请求参数接收', 1010],
    [111, '员工管理-删除员工-逻辑实现', 809],
    [112, '员工管理-修改员工-查询回显', 1896],
    [113, '员工管理-修改员工-修改数据', 1329],
    [114, '员工管理-修改员工-程序优化(动态更新)', 760],
    [115, '全局异常处理器', 1583],
    [116, '员工信息统计-职位统计-分析', 1128],
    [117, '员工信息统计-职位统计-实现', 1225],
    [118, '员工信息统计-性别统计', 940],
    [119, '项目实战-需求说明', 539],
    [120, '登录认证-登录功能-实现', 1611],
    [121, '登录认证-登录校验-会话技术-介绍', 796],
    [122, '登录认证-登录校验-会话技术-Cookie', 1139],
    [123, '登录认证-登录校验-会话技术-Session', 900],
    [124, '登录认证-登录校验-会话技术-令牌方案', 305],
    [125, '登录认证-登录校验-JWT-生成与校验', 1693],
    [126, '登录认证-登录校验-JWT-登录成功后下发令牌', 767],
    [127, '登录认证-登录校验-Filter-入门', 1272],
    [128, '登录认证-登录校验-Filter-令牌校验Filter', 1670],
    [129, '登录认证-登录校验-Filter-详解', 1197],
    [130, '登录认证-登录校验-Interceptor-入门', 1146],
    [131, '登录认证-登录校验-Interceptor-令牌校验Interceptor', 714],
    [132, '登录认证-登录校验-Interceptor-详解', 1174],
    [133, 'SpringAOP-基础-AOP入门程序', 1698],
    [134, 'SpringAOP-基础-核心概念', 1054],
    [135, 'SpringAOP-进阶-通知类型', 1324],
    [136, 'SpringAOP-进阶-通知顺序', 543],
    [137, 'SpringAOP-进阶-切入点表达式', 1711],
    [138, 'SpringAOP-进阶-连接点JoinPoint', 657],
    [139, 'SpringAOP-案例-记录操作日志', 1667],
    [140, 'SpringAOP-案例-获取当前登录员工', 1862],
    [141, '原理篇-SpringBoot配置优先级', 1333],
    [142, '原理篇-Bean管理', 2372],
    [143, '原理篇-SpringBoot原理-起步依赖原理', 242],
    [144, '原理篇-SpringBoot原理-自动配置-两种方案', 2067],
    [145, '原理篇-SpringBoot原理-自动配置-源码跟踪', 1350],
    [146, '原理篇-SpringBoot原理-自动配置-源码跟踪(@Conditional)', 1087],
    [147, '原理篇-SpringBoot原理-自动配置-自定义starter', 2224],
    [148, 'Maven高级-分模块设计与开发', 1546],
    [149, 'Maven高级-继承', 2242],
    [150, 'Maven高级-聚合', 805],
    [151, 'Maven高级-私服', 1773],
    [152, 'Web后端开发-总结', 399],
    [153, 'Vue工程化-介绍&环境准备', 1083],
    [154, 'Vue工程化-vue项目介绍&开发流程', 2204],
    [155, 'Vue工程化-API风格&案例', 2449],
    [156, 'ElementPlus-快速入门', 1351],
    [157, 'ElementPlus-常见组件-表格组件&分页组件', 1908],
    [158, 'ElementPlus-常见组件-对话框组件&表单组件', 1719],
    [159, 'ElementPlus-案例', 2322],
    [160, 'Tlias案例-准备工作', 1432],
    [161, 'Tlias案例-整体布局-动态菜单(VueRouter)', 2586],
    [162, 'Tlias案例-整体布局-动态菜单(VueRouter-嵌套路由)', 1311],
    [163, 'Tlias案例-部门管理-列表查询', 2042],
    [164, 'Tlias案例-部门管理-列表查询-程序优化', 2132],
    [165, 'Tlias案例-部门管理-新增部门', 3065],
    [166, 'Tlias案例-部门管理-修改&删除部门', 1752],
    [167, 'Tlias案例-员工管理-列表查询-页面布局(搜索栏)', 1272],
    [168, 'Tlias案例-员工管理-列表查询-页面布局(搜索栏-watch侦听)', 1613],
    [169, 'Tlias案例-员工管理-列表查询-页面布局(表格)', 1473],
    [170, 'Tlias案例-员工管理-列表查询-页面交互', 1158],
    [171, 'Tlias案例-员工管理-新增员工-页面布局(引入)', 1124],
    [172, 'Tlias案例-员工管理-新增员工-页面布局(展示优化)', 1552],
    [173, 'Tlias案例-员工管理-新增员工-页面交互(工作经历)', 1801],
    [174, 'Tlias案例-员工管理-新增员工-页面交互(保存员工)', 1948],
    [175, 'Tlias案例-员工管理-修改员工-修改数据', 1327],
    [176, 'Tlias案例-员工管理-删除员工-批量删除', 1485],
    [177, 'Tlias案例-登录-登录功能实现', 1320],
    [178, 'Tlias案例-登录-携带令牌访问服务端', 1496],
    [179, 'Tlias案例-登录-响应401跳转登录页面', 783],
    [180, 'Tlias案例-退出-功能实现', 912],
    [181, 'Tlias案例-打包部署', 1223],
    [182, 'Linux-概述-介绍&系统安装', 1669],
    [183, 'Linux-概述-远程连接&目录结构', 865],
    [184, 'Linux-常用命令-目录&文件操作命令', 2243],
    [185, 'Linux-常用命令-拷贝移动&打包压缩命令', 1471],
    [186, 'Linux-常用命令-文本编辑&查找命令', 1602],
    [187, 'Linux-软件安装-JDK安装', 966],
    [188, 'Linux-软件安装-MySQL安装&防火墙', 2065],
    [189, 'Linux-软件安装-Nginx安装', 740],
    [190, 'Linux-项目部署', 2089],
    [191, 'Docker-入门-MySQL安装', 1683],
    [192, 'Docker-入门-命令解读', 685],
    [193, 'Docker-核心-常见命令', 1727],
    [194, 'Docker-核心-数据卷挂载', 1501],
    [195, 'Docker-核心-本地目录挂载', 1404],
    [196, 'Docker-核心-自定义镜像', 1909],
    [197, 'Docker-核心-网络', 966],
    [198, 'Docker-部署-服务端&前端部署', 1912],
    [199, 'Docker-部署-DockerCompose', 1801],
    [200, 'Web开发-完结', 139]
  ];

  /* 章节定义：id / 标题 / 集数范围 / 简介与学习要点 */
  var CHAPTERS = [
    {
      id: 'w-c1', title: '课程导览', from: 1, to: 2,
      points: [
        '了解 Web 开发全景：前端、后端、数据库各自负责什么',
        '认识 B/S 架构：浏览器通过 HTTP 协议与服务器交互',
        '了解课程主线：以 tlias 教学管理系统贯穿需求分析到部署全流程',
        '搭好学习环境，规划自己的学习节奏'
      ]
    },
    {
      id: 'w-c2', title: 'HTML & CSS 基础', from: 3, to: 16,
      points: [
        'HTML 常用标签：标题、段落、图片、超链接、音视频、盒子 div/span',
        'CSS 三种引入方式（行内 / 内嵌 / 外联）与常用选择器',
        '盒子模型：内容、内边距 padding、边框 border、外边距 margin',
        '页面布局手段：标准流、浮动、弹性布局 Flex',
        '表单标签 form 与常见表单项 input / select / textarea',
        '实战案例：央视新闻页面、tlias 搜索表单区域与底部版权区域'
      ]
    },
    {
      id: 'w-c3', title: 'JavaScript 基础', from: 17, to: 24,
      points: [
        'JS 引入方式（内嵌 / 外部脚本）与基础语法',
        '变量声明 let / const 与数据类型（number、string、boolean 等）',
        '函数的定义与调用、自定义对象与 JSON 数据格式',
        'DOM：获取元素、修改内容与样式',
        '事件监听 addEventListener 与常见事件（点击、输入、提交等）',
        'JS 模块化：把代码按功能拆分复用'
      ]
    },
    {
      id: 'w-c4', title: 'Vue 入门与 Ajax', from: 25, to: 30,
      points: [
        'Vue 快速入门：创建 Vue 实例、data 数据与页面挂载',
        '列表渲染 v-for（配合 key）、属性绑定 v-bind、条件渲染 v-if / v-show',
        '表单双向绑定 v-model 与事件绑定 v-on',
        'Ajax 的作用：不刷新整个页面即可与服务器交换数据',
        'Ajax 案例：请求后端接口并把数据渲染到页面'
      ]
    },
    {
      id: 'w-c5', title: 'Maven 与单元测试', from: 31, to: 39,
      points: [
        'Maven 的两大核心功能：依赖管理与项目构建',
        'Maven 安装配置、IDEA 集成与常见问题解决',
        '依赖管理：坐标（groupId / artifactId / version）与依赖范围 scope',
        '构建生命周期：同一生命周期内执行后面的阶段会先执行前面的阶段',
        'JUnit 单元测试：@Test 注解、断言方法、@BeforeEach / @BeforeAll',
        '企业开发规范：单元测试先行，可用 AI 辅助生成测试用例'
      ]
    },
    {
      id: 'w-c6', title: 'SpringBoot Web 基础', from: 40, to: 49,
      points: [
        'SpringBoot 入门：起步依赖、内嵌 Tomcat、快速创建 Web 项目',
        'HTTP 协议：请求协议（请求行 / 请求头 / 请求体）与响应协议',
        '常见请求方式 GET / POST 与状态码（200 / 404 / 500）',
        'Controller 接收与响应请求：@RestController、@GetMapping 等',
        '三层架构：Controller → Service → Dao，各层职责划分',
        '分层解耦：IOC 控制反转与 DI 依赖注入'
      ]
    },
    {
      id: 'w-c7', title: 'MySQL 数据库', from: 50, to: 61,
      points: [
        'MySQL 安装与数据模型：库、表、记录的关系',
        'DDL：数据库与表的创建、修改、删除，常用数据类型与约束',
        'DML：INSERT、UPDATE、DELETE 增删改数据',
        'DQL：基本查询、条件查询、模糊查询 LIKE',
        '分组查询 GROUP BY 与聚合函数（COUNT / SUM / AVG 等）',
        '排序 ORDER BY 与分页 LIMIT'
      ]
    },
    {
      id: 'w-c8', title: 'JDBC 与 Mybatis', from: 62, to: 73,
      points: [
        'JDBC 操作数据库的基本步骤与执行 DQL 查询',
        '预编译 SQL（PreparedStatement）：防 SQL 注入、性能更好',
        'Mybatis 入门：持久层框架，自动完成 JDBC 繁琐步骤',
        'Mybatis 完成增删改查：删除、新增、更新、查询',
        'XML 映射文件配置与结果映射（resultType、驼峰映射）',
        '数据库连接池的作用与 SpringBoot 项目配置文件'
      ]
    },
    {
      id: 'w-c9', title: 'Tlias 后端实战', from: 74, to: 115,
      points: [
        '开发规范与 RESTful 风格接口设计（GET / POST / PUT / DELETE）',
        '统一响应结果封装 Result（code / msg / data）',
        '部门管理、员工管理完整 CRUD 接口开发与前后端联调',
        '请求参数接收：@RequestParam、@PathVariable、@RequestBody',
        '多表关系设计与多表查询（内连接、外连接、子查询）',
        '分页查询原理与 PageHelper 分页插件',
        '日志技术 Logback、Spring 事务 @Transactional 与事务四大特性',
        '文件上传：本地存储与阿里云 OSS，@Value 与 @ConfigurationProperties',
        '全局异常处理器 @RestControllerAdvice 统一处理异常'
      ]
    },
    {
      id: 'w-c10', title: '登录认证与 AOP', from: 116, to: 140,
      points: [
        '登录功能实现与会话技术对比：Cookie、Session、令牌（JWT）',
        'JWT 令牌：Header.Payload.Signature 三段式结构与校验流程',
        '登录校验：Filter 过滤器与 Interceptor 拦截器的使用与区别',
        'AOP 面向切面编程：核心概念（连接点、切入点、通知）',
        '五种通知类型 @Around / @Before / @After 等 与通知顺序',
        '切入点表达式 execution 与 JoinPoint 获取方法信息',
        '实战案例：通过 AOP 记录操作日志、获取当前登录员工'
      ]
    },
    {
      id: 'w-c11', title: '原理篇与 Maven 高级', from: 141, to: 152,
      points: [
        'SpringBoot 配置优先级：命令行参数最高',
        'Bean 管理：作用域（单例 / 原型）、注册方式 @Component 与 @Bean',
        '起步依赖原理：依赖传递',
        '自动配置方案：@ComponentScan 组件扫描与 @Import 导入',
        '@Conditional 条件装配与自定义 starter',
        'Maven 高级：分模块设计、继承、聚合与私服'
      ]
    },
    {
      id: 'w-c12', title: 'Vue 工程化与 Tlias 前端', from: 153, to: 181,
      points: [
        'Vue 工程化：环境准备、create-vue 创建项目、开发流程',
        '组合式 API 与组件化开发',
        'ElementPlus 常用组件：表格、分页、对话框、表单校验',
        'VueRouter 路由与嵌套路由实现动态菜单',
        'tlias 前端案例：部门管理、员工管理、登录、退出完整页面',
        '前端项目打包（npm run build → dist）与部署'
      ]
    },
    {
      id: 'w-c13', title: 'Linux 与 Docker 部署', from: 182, to: 200,
      points: [
        'Linux 系统安装、远程连接与目录结构',
        '常用命令：目录文件操作、拷贝移动、打包压缩、文本编辑与查找',
        '软件安装：JDK、MySQL（含防火墙配置）、Nginx',
        'Linux 环境手动部署项目',
        'Docker 核心概念与常用命令：镜像、容器、数据卷挂载',
        '自定义镜像 Dockerfile 与容器网络（容器名互访）',
        'DockerCompose 一键编排：前后端 + 数据库完整部署'
      ]
    }
  ];

  function chapterOf(p) {
    for (var i = 0; i < CHAPTERS.length; i++) {
      var c = CHAPTERS[i];
      if (p >= c.from && p <= c.to) return c;
    }
    return CHAPTERS[CHAPTERS.length - 1];
  }

  function pointsHtml(ch) {
    return ch.points.map(function (t) { return '<li>' + t + '</li>'; }).join('');
  }

  function buildLessons(ch) {
    var list = [];
    EPISODES.forEach(function (ep) {
      var p = ep[0], title = ep[1], dur = Math.max(1, Math.round(ep[2] / 60));
      if (p < ch.from || p > ch.to) return;
      list.push({
        id: 'w' + p,
        p: p,
        title: 'P' + p + ' ' + title,
        type: 'video',
        duration: dur,
        url: BV_URL + '?p=' + p,
        content:
          '<div class="video-ph"><span class="play">▶</span>视频课时 · 第 ' + p + ' 集 / 共 200 集 · 约 ' + dur + ' 分钟</div>' +
          '<h4>本章学习要点</h4>' +
          '<ul>' + pointsHtml(ch) + '</ul>' +
          '<div class="tip-box">💡 建议边看边动手练；看完本集回到这里点击「标记为已学完」记录进度。</div>'
      });
    });
    return list;
  }

  var chapters = CHAPTERS.map(function (ch, i) {
    return {
      id: ch.id,
      index: i + 1,
      title: ch.title,
      desc: 'P' + ch.from + ' ~ P' + ch.to,
      points: ch.points,
      lessons: buildLessons(ch)
    };
  });

  window.JW_COURSE = {
    id: 'javaweb',
    title: 'JavaWeb 全程课（黑马 Tlias 实战）',
    category: 'JavaWeb',
    icon: '🌴',
    color: 'linear-gradient(135deg, #6ec6ff, #1565c0)',
    description: '黑马程序员「AI+JavaWeb 开发入门」全套课程：前端 HTML/CSS/JS/Vue → Maven/单元测试 → SpringBoot/MySQL/Mybatis → Tlias 教学管理系统实战 → 登录认证/AOP/原理篇 → Linux/Docker 部署，共 200 集。每集可直达 B 站对应分 P。',
    chapters: chapters
  };

  window.JW_LEARNED_UNTIL_P = JW_LEARNED_UNTIL_P;
  window.JW_BV_URL = BV_URL;
})();
