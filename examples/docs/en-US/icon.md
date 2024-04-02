## Icon

Provides several sets of common icon collections.

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

### Icon1 Digital product icon collection

<ul class="icon-list">
  <li v-for="name in $icon1" :key="name">
    <span>
      <i :class="'dy-icon1-' + name"></i>
      <span class="icon-name">{{'dy-icon1-' + name}}</span>
    </span>
  </li>
</ul>

### Icon2 Extended component library icon collection

<ul class="icon-list">
  <li v-for="name in $icon2" :key="name">
    <span>
      <i :class="'dy-icon2-' + name"></i>
      <span class="icon-name">{{'dy-icon2-' + name}}</span>
    </span>
  </li>
</ul>

### Icon3 Internal commonly used icon collection

<ul class="icon-list">
  <li v-for="name in $icon3" :key="name">
    <span>
      <i :class="'dy-icon3-' + name"></i>
      <span class="icon-name">{{'dy-icon3-' + name}}</span>
    </span>
  </li>
</ul>
