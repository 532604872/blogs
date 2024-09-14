# 关于移动端 flexible 适配「ipad」和 「ipad Pro」

```
const userAgent = navigator.userAgent.toLowerCase();
const isAppleDevice = /(pad|pod|ipad|ipod|ios)/.test(userAgent);

if (isAppleDevice) {
  const head = document.getElementsByTagName('head')[0];
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'target-densitydpi=device-dpi, width=480px, user-scalable=no';
  head.appendChild(viewport);
}
```
## viewport
[官方](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag)

> 许多网站列出常用设备的视区大小。例如：[请参阅](https://viewportsizer.com/devices/)。有关最准确和最新的信息，请参考设备制造商的网站。