## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `dy-icon-iconName` 来使用即可。例如：

:::demo

```html
<i class="dy-icon-edit"></i>
<i class="dy-icon-share"></i>
<i class="dy-icon-delete"></i>
<dy-button type="primary" icon="dy-icon-search">搜索</dy-button>
```

:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'dy-icon-' + name"></i>
      <span class="icon-name">{{'dy-icon-' + name}}</span>
    </span>
  </li>
</ul>
