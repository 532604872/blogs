# Repository

## 框架

### 跨端
- [taro](https://taro.zone/)

  | [多端统一开发框架 Taro 优秀学习资源汇总](https://github.com/NervJS/awesome-taro)

- [uni-app](https://uniapp.dcloud.net.cn/)

- [小程序开发：用原生还是选框架（wepy/mpvue/taro/uni-app）-- 第1季](https://ask.dcloud.net.cn/article/35947)

## 小程序
- [微信开放社区](https://developers.weixin.qq.com/community/develop/mixflow)
- [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/index.html)
- [微信小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&token=935589521&volumn=1&lang=zh_CN&book=miniprogram&docid=0008aeea9a8978ab0086a685851c0a)
- [支付宝](https://open.alipay.com/channel/miniIndex.htm)
- [微信小程序 自定义头部导航栏 navigationStyle](https://www.jianshu.com/p/7393c800ba09)
- [《使用 React 开发小程序》](https://github.com/remaxjs/remax)

## Chrome Plugin
- [Chrome for developers](https://developer.chrome.com/docs/extensions?hl=zh-cn)
- [【前端工具】Chrome 扩展程序的开发与发布 -- 手把手教你开发扩展程序](https://www.cnblogs.com/coco1s/p/8004510.html)
- [【干货】Chrome插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
- []


## cabloyjs
- [测试环境](https://test.cabloy.com/)
- [文档](https://cabloy.com/zh-cn/)

### 什么是请求瀑布？
“瀑布”是指依赖于先前请求完成的一系列网络请求。在数据获取的情况下，每个请求只能在前一个请求返回数据后才能开始。
<img src="https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fsequential-parallel-data-fetching.png&w=3840&q=75"/>
比如我们需要等待fetchRevenue()执行完才fetchLatestInvoices()可以开始运行等等。

这种模式并不一定是坏事。在某些情况下，您可能需要瀑布流，因为您希望在发出下一个请求之前满足某个条件。例如，您可能希望先获取用户的 ID 和个人资料信息。获得 ID 后，您可能会继续获取他们的好友列表。在这种情况下，每个请求都取决于上一个请求返回的数据。

但是，这种行为也可能是无意的，并且会影响性​​能。