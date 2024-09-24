## 移动端

|移动端适配的宗旨是：
|让拥有不同屏幕大小的终端设备拥有一致的 UI 界面，让拥有更大屏幕的终端展示更多的内容。

### CSS 框架
- [tailwindcss](https://tailwind.nodejs.cn/)
- [clsx](https://www.npmjs.com/package/clsx)

classnames 和 clsx 是两个用于处理 CSS 类名的库，常用于条件渲染类名。它们的主要功能相似，但在设计和性能上有一些差异。

#### classnames
功能：允许你根据条件动态组合类名。

用法：
```javascript
import classNames from 'classnames';

const buttonClass = classNames('btn', {
  'btn-primary': isPrimary,
  'btn-disabled': isDisabled,
});
```
优点：
成熟稳定，广泛使用，文档齐全。

#### clsx
功能：类似于 classnames，也用于条件组合类名，但更小巧和高效。

用法：

```javascript
import clsx from 'clsx';

const buttonClass = clsx('btn', {
  'btn-primary': isPrimary,
  'btn-disabled': isDisabled,
});
```
优点：
体积更小，性能更高，特别在大型应用中优势明显。


选择建议:
如果你需要一个成熟的解决方案，classnames 是一个不错的选择。
如果你追求更小的包体积和更好的性能，clsx 是更好的选择。
