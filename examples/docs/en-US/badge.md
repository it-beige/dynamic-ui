## Badge

A number or status mark on buttons and icons.

### Basic usage

Displays the amount of new messages.

:::demo The amount is defined with `value` which accepts `Number` or `String`.

```html
<dy-badge :value="12" class="item">
  <dy-button size="small">comments</dy-button>
</dy-badge>
<dy-badge :value="3" class="item">
  <dy-button size="small">replies</dy-button>
</dy-badge>
<dy-badge :value="1" class="item" type="primary">
  <dy-button size="small">comments</dy-button>
</dy-badge>
<dy-badge :value="2" class="item" type="warning">
  <dy-button size="small">replies</dy-button>
</dy-badge>

<dy-dropdown trigger="click">
  <span class="dy-dropdown-link">
    Click Me
    <i class="dy-icon-caret-bottom dy-icon--right"></i>
  </span>
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item class="clearfix">
      comments
      <dy-badge class="mark" :value="12" />
    </dy-dropdown-item>
    <dy-dropdown-item class="clearfix">
      replies
      <dy-badge class="mark" :value="3" />
    </dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### Max value

You can customize the max value.

:::demo The max value is defined by property `max` which is a `Number`. Note that it only works when `value` is also a `Number`.

```html
<dy-badge :value="200" :max="99" class="item">
  <dy-button size="small">comments</dy-button>
</dy-badge>
<dy-badge :value="100" :max="10" class="item">
  <dy-button size="small">replies</dy-button>
</dy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### Customizations

Displays text content other than numbers.

:::demo When `value` is a `String`, it can display customized text.

```html
<dy-badge value="new" class="item">
  <dy-button size="small">comments</dy-button>
</dy-badge>
<dy-badge value="hot" class="item">
  <dy-button size="small">replies</dy-button>
</dy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### Little red dot

Use a red dot to mark content that needs to be noticed.

:::demo Use the attribute `is-dot`. It is a `Boolean`.

```html
<dy-badge is-dot class="item">query</dy-badge>
<dy-badge is-dot class="item">
  <dy-button
    class="share-button"
    icon="dy-icon-share"
    type="primary"
  ></dy-button>
</dy-badge>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
```

:::

### Attributes

| Attribute | Description                                                                      | Type           | Accepted Values                             | Default |
| --------- | -------------------------------------------------------------------------------- | -------------- | ------------------------------------------- | ------- |
| value     | display value                                                                    | string, number | —                                           | —       |
| max       | maximum value, shows '{max}+' when exceeded. Only works if `value` is a `Number` | number         | —                                           | —       |
| is-dot    | if a little dot is displayed                                                     | boolean        | —                                           | false   |
| hidden    | hidden badge                                                                     | boolean        | —                                           | false   |
| type      | button type                                                                      | string         | primary / success / warning / danger / info | —       |
