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
（官方）[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag]