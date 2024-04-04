## 注入其他组件库

Dynamic supports you to not use built-in components. You can choose other component libraries as the form items for FormGenerate and TableGenerate components. For example, if the component library used in your project is based on a modified version of Element, it is recommended to load Dynamic on demand in the project, only using FormGenerate and TableGenerate components. Injecting other components into the component mapping is also supported.

### 按需加载 Dynamic

You can dynamically load the built-in components of Dynamic as basic components as needed.

```js
import Vue from 'vue'
import { Select, FormGenerate, injectComponent } from 'dynamic-ui'
// Based on modifications to the Element UI component library
import { Input, Radio } from 'fawkes-ui'

Vue.use(Select).use(FormGenerate)
// Injecting globally into the Dynamic component library (will override built-in components with the same name in Dynamic
injectComponent([
  {
    name: Radio.name,
    component: Radio,
  },
])
// Injecting into the FormGenerate component.
FormGenerate.injectFormComponent([
  {
    name: Input.name,
    component: Input,
  },
])
```
