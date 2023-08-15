## Button

Commonly used button.

### Basic usage

:::demo Use `type`, `plain`, `round` and `circle` to define Button's style.

```html
<dy-row>
  <dy-button>Default</dy-button>
  <dy-button type="primary">Primary</dy-button>
  <dy-button type="success">Success</dy-button>
  <dy-button type="info">Info</dy-button>
  <dy-button type="warning">Warning</dy-button>
  <dy-button type="danger">Danger</dy-button>
</dy-row>

<dy-row>
  <dy-button plain>Plain</dy-button>
  <dy-button type="primary" plain>Primary</dy-button>
  <dy-button type="success" plain>Success</dy-button>
  <dy-button type="info" plain>Info</dy-button>
  <dy-button type="warning" plain>Warning</dy-button>
  <dy-button type="danger" plain>Danger</dy-button>
</dy-row>

<dy-row>
  <dy-button round>Round</dy-button>
  <dy-button type="primary" round>Primary</dy-button>
  <dy-button type="success" round>Success</dy-button>
  <dy-button type="info" round>Info</dy-button>
  <dy-button type="warning" round>Warning</dy-button>
  <dy-button type="danger" round>Danger</dy-button>
</dy-row>

<dy-row>
  <dy-button icon="dy-icon-search" circle></dy-button>
  <dy-button type="primary" icon="dy-icon-edit" circle></dy-button>
  <dy-button type="success" icon="dy-icon-check" circle></dy-button>
  <dy-button type="info" icon="dy-icon-message" circle></dy-button>
  <dy-button type="warning" icon="dy-icon-star-off" circle></dy-button>
  <dy-button type="danger" icon="dy-icon-delete" circle></dy-button>
</dy-row>
```

:::

### Disabled Button

The `disabled` attribute determines if the button is disabled.

:::demo Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

```html
<dy-row>
  <dy-button disabled>Default</dy-button>
  <dy-button type="primary" disabled>Primary</dy-button>
  <dy-button type="success" disabled>Success</dy-button>
  <dy-button type="info" disabled>Info</dy-button>
  <dy-button type="warning" disabled>Warning</dy-button>
  <dy-button type="danger" disabled>Danger</dy-button>
</dy-row>

<dy-row>
  <dy-button plain disabled>Plain</dy-button>
  <dy-button type="primary" plain disabled>Primary</dy-button>
  <dy-button type="success" plain disabled>Success</dy-button>
  <dy-button type="info" plain disabled>Info</dy-button>
  <dy-button type="warning" plain disabled>Warning</dy-button>
  <dy-button type="danger" plain disabled>Danger</dy-button>
</dy-row>
```

:::

### Text Button

Buttons without border and background.

:::demo

```html
<dy-button type="text">Text Button</dy-button>
<dy-button type="text" disabled>Text Button</dy-button>
```

:::

### Icon Button

Use icons to add more meaning to Button. You can use icon alone to save some space, or use it with text.

:::demo Use the `icon` attribute to add icon. You can find the icon list in Element icon component. Adding icons to the right side of the text is achievable with an `<i>` tag. Custom icons can be used as well.

```html
<dy-button type="primary" icon="dy-icon-edit"></dy-button>
<dy-button type="primary" icon="dy-icon-share"></dy-button>
<dy-button type="primary" icon="dy-icon-delete"></dy-button>
<dy-button type="primary" icon="dy-icon-search">Search</dy-button>
<dy-button type="primary">
  Upload
  <i class="dy-icon-upload dy-icon-right"></i>
</dy-button>
```

:::

### Button Group

Displayed as a button group, can be used to group a series of similar operations.

:::demo Use tag `<dy-button-group>` to group your buttons.

```html
<dy-button-group>
  <dy-button type="primary" icon="dy-icon-arrow-left">Previous Page</dy-button>
  <dy-button type="primary">
    Next Page
    <i class="dy-icon-arrow-right dy-icon-right"></i>
  </dy-button>
</dy-button-group>
<dy-button-group>
  <dy-button type="primary" icon="dy-icon-edit"></dy-button>
  <dy-button type="primary" icon="dy-icon-share"></dy-button>
  <dy-button type="primary" icon="dy-icon-delete"></dy-button>
</dy-button-group>
```

:::

### Loading Button

Click the button to load data, then the button displays a loading state.

:::demo Set `loading` attribute to `true` to display loading state.

```html
<dy-button type="primary" :loading="true">Loading</dy-button>
```

:::

### Sizes

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `medium`, `small` or `mini`.

```html
<dy-row>
  <dy-button>Default</dy-button>
  <dy-button size="medium">Medium</dy-button>
  <dy-button size="small">Small</dy-button>
  <dy-button size="mini">Mini</dy-button>
</dy-row>
<dy-row>
  <dy-button round>Default</dy-button>
  <dy-button size="medium" round>Medium</dy-button>
  <dy-button size="small" round>Small</dy-button>
  <dy-button size="mini" round>Mini</dy-button>
</dy-row>
```

:::

### Attributes

| Attribute   | Description                            | Type    | Accepted values                                    | Default |
| ----------- | -------------------------------------- | ------- | -------------------------------------------------- | ------- |
| size        | button size                            | string  | medium / small / mini                              | —       |
| type        | button type                            | string  | primary / success / warning / danger / info / text | —       |
| plain       | determine whether it's a plain button  | boolean | —                                                  | false   |
| round       | determine whether it's a round button  | boolean | —                                                  | false   |
| circle      | determine whether it's a circle button | boolean | —                                                  | false   |
| loading     | determine whether it's loading         | boolean | —                                                  | false   |
| disabled    | disable the button                     | boolean | —                                                  | false   |
| icon        | icon class name                        | string  | —                                                  | —       |
| autofocus   | same as native button's `autofocus`    | boolean | —                                                  | false   |
| native-type | same as native button's `type`         | string  | button / submit / reset                            | button  |
