## 注入其他组件库

Dynamic 支持你可以不使用内置的组件, 你可以选择其他组件库做为 FormGenerate、TableGenerate 组件的表单项, 比如你项目中使用的组件库是基于 Element 二改的, 推荐在项目中将 Dynamic 按需加载, 只使用 FormGenerate、TableGenerate 组件, 将其他组件注入到组件映射里面也是支持的

### 按需加载 Dynamic

可按需去加载 Dynamic 内置的组件做为基础组件

```js
import Vue from 'vue'
import { Select, FormGenerate, injectComponent } from 'dynamic-ui'
// 基于Element二改的UI组件库
import { Input, Radio } from 'fawkes-ui'

Vue.use(Select).use(FormGenerate)
// 向Dynamic组件库全局注入(会覆盖Dynamic同名的内置组件)
injectComponent([
  {
    name: Radio.name,
    component: Radio,
  },
])
// 向FormGenerate组件注入
FormGenerate.injectFormComponent([
  {
    name: Input.name,
    component: Input,
  },
])
```
