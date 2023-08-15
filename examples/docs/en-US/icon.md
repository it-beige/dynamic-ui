## Icon

Element provides a set of common icons.

### Basic usage

Just assign the class name to `dy-icon-iconName`.

:::demo

```html
<i class="dy-icon-edit"></i>
<i class="dy-icon-share"></i>
<i class="dy-icon-delete"></i>
<dy-button type="primary" icon="dy-icon-search">Search</dy-button>
```

:::

### Icons

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'dy-icon-' + name"></i>
      <span class="icon-name">{{'dy-icon-' + name}}</span>
    </span>
  </li>
</ul>
