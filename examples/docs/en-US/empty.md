## Empty

Placeholder hints for empty states.

### Basic usage

:::demo

```html
<dy-empty description="description"></dy-empty>
```

:::

### Custom image

Use `image` prop to set image URL.

:::demo

```html
<dy-empty
  image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
></dy-empty>
```

:::

### Image size

Use `image-size` prop to control image size.

:::demo

```html
<dy-empty :image-size="200"></dy-empty>
```

:::

### Bottom content

Use the default slot to insert content at the bottom.

:::demo

```html
<dy-empty>
  <dy-button type="primary">Button</dy-button>
</dy-empty>
```

:::

### Empty Attributes

| Attribute   | Description        | Type   | Acceptable Value | Default |
| ----------- | ------------------ | ------ | ---------------- | ------- |
| image       | image URL          | string | —                | —       |
| image-size  | image size (width) | number | —                | —       |
| description | description        | string | —                | —       |

### Empty Slots

| Name        | Description           |
| ----------- | --------------------- |
| default     | Custom bottom content |
| image       | Custom image          |
| description | Custom description    |
