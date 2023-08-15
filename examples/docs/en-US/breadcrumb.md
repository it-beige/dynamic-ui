## Breadcrumb

Displays the location of the current page, making it easier to browser back.

### Basic usage

:::demo In `el-breadcrumb`, each `el-breadcrumb-item` is a tag that stands for every level starting from homepage. This component has a `String` attribute `separator`, and it determines the separator. Its default value is '/'.

```html
<dy-breadcrumb separator="/">
  <dy-breadcrumb-item :to="{ path: '/' }">homepage</dy-breadcrumb-item>
  <dy-breadcrumb-item><a href="/">promotion management</a></dy-breadcrumb-item>
  <dy-breadcrumb-item>promotion list</dy-breadcrumb-item>
  <dy-breadcrumb-item>promotion detail</dy-breadcrumb-item>
</dy-breadcrumb>
```

:::

### Icon separator

:::demo Set `separator-class` to use `iconfont` as the separator，it will cover `separator`

```html
<dy-breadcrumb separator-class="dy-icon-arrow-right">
  <dy-breadcrumb-item :to="{ path: '/' }">homepage</dy-breadcrumb-item>
  <dy-breadcrumb-item>promotion management</dy-breadcrumb-item>
  <dy-breadcrumb-item>promotion list</dy-breadcrumb-item>
  <dy-breadcrumb-item>promotion detail</dy-breadcrumb-item>
</dy-breadcrumb>
```

:::

### Breadcrumb Attributes

| Attribute       | Description                  | Type   | Accepted Values | Default |
| --------------- | ---------------------------- | ------ | --------------- | ------- |
| separator       | separator character          | string | —               | /       |
| separator-class | class name of icon separator | string | —               | -       |

### Breadcrumb Item Attributes

| Attribute | Description                                               | Type          | Accepted Values | Default |
| --------- | --------------------------------------------------------- | ------------- | --------------- | ------- |
| to        | target route of the link, same as `to` of `vue-router`    | string/object | —               | —       |
| replace   | if `true`, the navigation will not leave a history record | boolean       | —               | false   |
