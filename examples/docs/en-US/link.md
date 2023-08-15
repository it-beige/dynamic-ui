## Link

Text hyperlink

### Basic

Basic text link
:::demo

```html
<div>
  <dy-link href="https://element.eleme.io" target="_blank">default</dy-link>
  <dy-link type="primary">primary</dy-link>
  <dy-link type="success">success</dy-link>
  <dy-link type="warning">warning</dy-link>
  <dy-link type="danger">danger</dy-link>
  <dy-link type="info">info</dy-link>
</div>
```

:::

### Disabled

Disabled state of link
:::demo

```html
<div>
  <dy-link disabled>default</dy-link>
  <dy-link type="primary" disabled>primary</dy-link>
  <dy-link type="success" disabled>success</dy-link>
  <dy-link type="warning" disabled>warning</dy-link>
  <dy-link type="danger" disabled>danger</dy-link>
  <dy-link type="info" disabled>info</dy-link>
</div>
```

:::

### Underline

Underline of link
:::demo

```html
<div>
  <dy-link :underline="false">Without Underline</dy-link>
  <dy-link>With Underline</dy-link>
</div>
```

:::

### Icon

Link with icon
:::demo

```html
<div>
  <dy-link icon="dy-icon-edit">Edit</dy-link>
  <dy-link>
    Check
    <i class="dy-icon-view dy-icon--right"></i>
  </dy-link>
</div>
```

:::

### Attributes

| Attribute | Description                         | Type    | Options                                     | Default |
| --------- | ----------------------------------- | ------- | ------------------------------------------- | ------- |
| type      | type                                | string  | primary / success / warning / danger / info | default |
| underline | whether the component has underline | boolean | —                                           | true    |
| disabled  | whether the component is disabled   | boolean | —                                           | false   |
| href      | same as native hyperlink's `href`   | string  | —                                           | -       |
| icon      | class name of icon                  | string  | —                                           | -       |
