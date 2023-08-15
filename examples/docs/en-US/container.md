## Container

Container components for scaffolding basic structure of the page:

`<dy-container>`: wrapper container. When nested with a `<dy-header>` or `<dy-footer>`, all its child elements will be vertically arranged. Otherwise horizontally.

`<dy-header>`: container for headers.

`<dy-aside>`: container for side sections (usually a side nav).

`<dy-main>`: container for main sections.

`<dy-footer>`: container for footers.

:::tip
These components use flex for layout, so please make sure your browser supports it. Besides, `<dy-container>`'s direct child elements have to be one or more of the latter four components. And father element of the latter four components must be a `<dy-container>`.
:::

### Common layouts

:::demo

```html
<dy-container>
  <dy-header>Header</dy-header>
  <dy-main>Main</dy-main>
</dy-container>

<dy-container>
  <dy-header>Header</dy-header>
  <dy-main>Main</dy-main>
  <dy-footer>Footer</dy-footer>
</dy-container>

<dy-container>
  <dy-aside width="200px">Aside</dy-aside>
  <dy-main>Main</dy-main>
</dy-container>

<dy-container>
  <dy-header>Header</dy-header>
  <dy-container>
    <dy-aside width="200px">Aside</dy-aside>
    <dy-main>Main</dy-main>
  </dy-container>
</dy-container>

<dy-container>
  <dy-header>Header</dy-header>
  <dy-container>
    <dy-aside width="200px">Aside</dy-aside>
    <dy-container>
      <dy-main>Main</dy-main>
      <dy-footer>Footer</dy-footer>
    </dy-container>
  </dy-container>
</dy-container>

<dy-container>
  <dy-aside width="200px">Aside</dy-aside>
  <dy-container>
    <dy-header>Header</dy-header>
    <dy-main>Main</dy-main>
  </dy-container>
</dy-container>

<dy-container>
  <dy-aside width="200px">Aside</dy-aside>
  <dy-container>
    <dy-header>Header</dy-header>
    <dy-main>Main</dy-main>
    <dy-footer>Footer</dy-footer>
  </dy-container>
</dy-container>

<style>
  .dy-header,
  .dy-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .dy-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .dy-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .dy-container {
    margin-bottom: 40px;
  }

  .dy-container:nth-child(5) .dy-aside,
  .dy-container:nth-child(6) .dy-aside {
    line-height: 260px;
  }

  .dy-container:nth-child(7) .dy-aside {
    line-height: 320px;
  }
</style>
```

:::

### Example

:::demo

```html
<dy-container style="height: 500px; border: 1px solid #eee">
  <dy-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <dy-menu :default-openeds="['1', '3']">
      <dy-submenu index="1">
        <template slot="title">
          <i class="dy-icon-message"></i>
          Navigator One
        </template>
        <dy-menu-item-group>
          <template slot="title">
            Group 1
          </template>
          <dy-menu-item index="1-1">Option 1</dy-menu-item>
          <dy-menu-item index="1-2">Option 2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="Group 2">
          <dy-menu-item index="1-3">Option 3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="1-4">
          <template slot="title">
            Option4
          </template>
          <dy-menu-item index="1-4-1">Option 4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
      <dy-submenu index="2">
        <template slot="title">
          <i class="dy-icon-menu"></i>
          Navigator Two
        </template>
        <dy-menu-item-group>
          <template slot="title">
            Group 1
          </template>
          <dy-menu-item index="2-1">Option 1</dy-menu-item>
          <dy-menu-item index="2-2">Option 2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="Group 2">
          <dy-menu-item index="2-3">Option 3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="2-4">
          <template slot="title">
            Option 4
          </template>
          <dy-menu-item index="2-4-1">Option 4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
      <dy-submenu index="3">
        <template slot="title">
          <i class="dy-icon-setting"></i>
          Navigator Three
        </template>
        <dy-menu-item-group>
          <template slot="title">
            Group 1
          </template>
          <dy-menu-item index="3-1">Option 1</dy-menu-item>
          <dy-menu-item index="3-2">Option 2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="Group 2">
          <dy-menu-item index="3-3">Option 3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="3-4">
          <template slot="title">
            Option 4
          </template>
          <dy-menu-item index="3-4-1">Option 4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
    </dy-menu>
  </dy-aside>

  <dy-container>
    <dy-header style="text-align: right; font-size: 12px">
      <dy-dropdown>
        <i class="dy-icon-setting" style="margin-right: 15px"></i>
        <dy-dropdown-menu slot="dropdown">
          <dy-dropdown-item>View</dy-dropdown-item>
          <dy-dropdown-item>Add</dy-dropdown-item>
          <dy-dropdown-item>Delete</dy-dropdown-item>
        </dy-dropdown-menu>
      </dy-dropdown>
      <span>Tom</span>
    </dy-header>

    <dy-main>
      <dy-table :data="tableData">
        <dy-table-column prop="date" label="Date" width="140"></dy-table-column>
        <dy-table-column prop="name" label="Name" width="120"></dy-table-column>
        <dy-table-column prop="address" label="Address"></dy-table-column>
      </dy-table>
    </dy-main>
  </dy-container>
</dy-container>

<style>
  .dy-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .dy-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      };
      return {
        tableData: Array(20).fill(item),
      };
    },
  };
</script>
```

:::

### Container Attributes

| Attribute | Description                         | Type   | Accepted Values       | Default                                                                    |
| --------- | ----------------------------------- | ------ | --------------------- | -------------------------------------------------------------------------- |
| direction | layout direction for child elements | string | horizontal / vertical | vertical when nested with `el-header` or `el-footer`; horizontal otherwise |

### Header Attributes

| Attribute | Description          | Type   | Accepted Values | Default |
| --------- | -------------------- | ------ | --------------- | ------- |
| height    | height of the header | string | —               | 60px    |

### Aside Attributes

| Attribute | Description               | Type   | Accepted Values | Default |
| --------- | ------------------------- | ------ | --------------- | ------- |
| width     | width of the side section | string | —               | 300px   |

### Footer Attributes

| Attribute | Description          | Type   | Accepted Values | Default |
| --------- | -------------------- | ------ | --------------- | ------- |
| height    | height of the footer | string | —               | 60px    |
