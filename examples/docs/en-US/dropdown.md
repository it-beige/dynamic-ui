## Dropdown

Toggleable menu for displaying lists of links and actions.

### Basic usage

Hover on the dropdown menu to unfold it for more actions.

:::demo The triggering element is rendered by the default `slot`, and the dropdown part is rendered by the `slot` named `dropdown`. By default, dropdown list shows when you hover on the triggering element without having to click it.

```html
<dy-dropdown>
  <span class="dy-dropdown-link">
    Dropdown List
    <i class="dy-icon-arrow-down dy-icon--right"></i>
  </span>
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item disabled>Action 4</dy-dropdown-item>
    <dy-dropdown-item divided>Action 5</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<style>
  .dy-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .dy-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

### Triggering element

Use the button to trigger the dropdown list.

:::demo Use `split-button` to split the triggering element into a button group with the left button being a normal button and right one the actual triggering target. If you wanna insert a separator line between item three and item four, just add a class `divider` to item four.

```html
<dy-dropdown>
  <dy-button type="primary">
    Dropdown List
    <i class="dy-icon-arrow-down dy-icon--right"></i>
  </dy-button>
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
    <dy-dropdown-item>Action 5</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>
<dy-dropdown split-button type="primary" @click="handleClick">
  Dropdown List
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
    <dy-dropdown-item>Action 5</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<style>
  .dy-dropdown {
    vertical-align: top;
  }
  .dy-dropdown + .dy-dropdown {
    margin-left: 15px;
  }
  .dy-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click');
      },
    },
  };
</script>
```

:::

### How to trigger

Click the triggering element or hover on it.

:::demo Use the attribute `trigger`. By default, it is `hover`.

```html
<dy-row class="block-col-2">
  <dy-col :span="12">
    <span class="demonstration">hover to trigger</span>
    <dy-dropdown>
      <span class="dy-dropdown-link">
        Dropdown List
        <i class="dy-icon-arrow-down dy-icon--right"></i>
      </span>
      <dy-dropdown-menu slot="dropdown">
        <dy-dropdown-item icon="dy-icon-plus">Action 1</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-plus">Action 2</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-plus-outline">
          Action 3
        </dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-check">Action 4</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-check">
          Action 5
        </dy-dropdown-item>
      </dy-dropdown-menu>
    </dy-dropdown>
  </dy-col>
  <dy-col :span="12">
    <span class="demonstration">click to trigger</span>
    <dy-dropdown trigger="click">
      <span class="dy-dropdown-link">
        Dropdown List
        <i class="dy-icon-arrow-down dy-icon--right"></i>
      </span>
      <dy-dropdown-menu slot="dropdown">
        <dy-dropdown-item icon="dy-icon-plus">Action 1</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-plus">Action 2</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-plus-outline">
          Action 3
        </dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-check">Action 4</dy-dropdown-item>
        <dy-dropdown-item icon="dy-icon-circle-check">
          Action 5
        </dy-dropdown-item>
      </dy-dropdown-menu>
    </dy-dropdown>
  </dy-col>
</dy-row>

<style>
  .dy-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .dy-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
```

:::

### Menu hiding behavior

Use `hide-on-click` to define if menu closes on clicking.

:::demo By default menu will close when you click on menu items, and it can be turned off by setting hide-on-click to false.

```html
<dy-dropdown :hide-on-click="false">
  <span class="dy-dropdown-link">
    Dropdown List
    <i class="dy-icon-arrow-down dy-icon--right"></i>
  </span>
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item disabled>Action 4</dy-dropdown-item>
    <dy-dropdown-item divided>Action 5</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<style>
  .dy-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .dy-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

### Command event

Clicking each dropdown item fires an event whose parameter is assigned by each item.

:::demo

```html
<dy-dropdown @command="handleCommand">
  <span class="dy-dropdown-link">
    Dropdown List
    <i class="dy-icon-arrow-down dy-icon--right"></i>
  </span>
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item command="a">Action 1</dy-dropdown-item>
    <dy-dropdown-item command="b">Action 2</dy-dropdown-item>
    <dy-dropdown-item command="c">Action 3</dy-dropdown-item>
    <dy-dropdown-item command="d" disabled>Action 4</dy-dropdown-item>
    <dy-dropdown-item command="e" divided>Action 5</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<style>
  .dy-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .dy-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
    },
  };
</script>
```

:::

### Sizes

Besides default size, Dropdown component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `medium`, `small` or `mini`.

```html
<dy-dropdown split-button type="primary">
  Default
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<dy-dropdown size="medium" split-button type="primary">
  Medium
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<dy-dropdown size="small" split-button type="primary">
  Small
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>

<dy-dropdown size="mini" split-button type="primary">
  Mini
  <dy-dropdown-menu slot="dropdown">
    <dy-dropdown-item>Action 1</dy-dropdown-item>
    <dy-dropdown-item>Action 2</dy-dropdown-item>
    <dy-dropdown-item>Action 3</dy-dropdown-item>
    <dy-dropdown-item>Action 4</dy-dropdown-item>
  </dy-dropdown-menu>
</dy-dropdown>
```

:::

### Dropdown Attributes

| Attribute     | Description                                                                                          | Type    | Accepted Values                                      | Default    |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------- | ---------- |
| type          | menu button type, refer to `Button` Component, only works when `split-button` is true                | string  | —                                                    | —          |
| size          | menu size, also works on the split button                                                            | string  | medium / small / mini                                | —          |
| split-button  | whether a button group is displayed                                                                  | boolean | —                                                    | false      |
| placement     | placement of pop menu                                                                                | string  | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom-end |
| trigger       | how to trigger                                                                                       | string  | hover/click                                          | hover      |
| hide-on-click | whether to hide menu after clicking menu-item                                                        | boolean | —                                                    | true       |
| show-timeout  | Delay time before show a dropdown (only works when trigger is `hover`)                               | number  | —                                                    | 250        |
| hide-timeout  | Delay time before hide a dropdown (only works when trigger is `hover`)                               | number  | —                                                    | 150        |
| tabindex      | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Dropdown | number  | —                                                    | 0          |
| disabled      | whether the Dropdown is disabled                                                                     | boolean | —                                                    | false      |

### Dropdown Slots

| Name     | Description                                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| —        | content of Dropdown. Notice: Must be a valid html dom element (ex. `<span>, <button> etc.`) or `el-component`, to attach the trigger listener |
| dropdown | content of the Dropdown Menu, usually a `<dy-dropdown-menu>` element                                                                          |

### Dropdown Events

| Event Name     | Description                                                       | Parameters                                    |
| -------------- | ----------------------------------------------------------------- | --------------------------------------------- |
| click          | if `split-button` is `true`, triggers when left button is clicked | —                                             |
| command        | triggers when a dropdown item is clicked                          | the command dispatched from the dropdown item |
| visible-change | triggers when the dropdown appears/disappears                     | true when it appears, and false otherwise     |

### Dropdown Menu Item Attributes

| Attribute | Description                                                 | Type                 | Accepted Values | Default |
| --------- | ----------------------------------------------------------- | -------------------- | --------------- | ------- |
| command   | a command to be dispatched to Dropdown's `command` callback | string/number/object | —               | —       |
| disabled  | whether the item is disabled                                | boolean              | —               | false   |
| divided   | whether a divider is displayed                              | boolean              | —               | false   |
| icon      | icon class name                                             | string               | —               | —       |
