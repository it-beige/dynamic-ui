## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<dy-container>`：外层容器。当子元素中包含 `<dy-header>` 或 `<dy-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<dy-header>`：顶栏容器。

`<dy-aside>`：侧边栏容器。

`<dy-main>`：主要区域容器。

`<dy-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<dy-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<dy-container>`。
:::

### 常见页面布局

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

### 实例

:::demo

```html
<dy-container style="height: 500px; border: 1px solid #eee">
  <dy-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <dy-menu :default-openeds="['1', '3']">
      <dy-submenu index="1">
        <template slot="title">
          <i class="dy-icon-message"></i>
          导航一
        </template>
        <dy-menu-item-group>
          <template slot="title">
            分组一
          </template>
          <dy-menu-item index="1-1">选项1</dy-menu-item>
          <dy-menu-item index="1-2">选项2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="分组2">
          <dy-menu-item index="1-3">选项3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="1-4">
          <template slot="title">
            选项4
          </template>
          <dy-menu-item index="1-4-1">选项4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
      <dy-submenu index="2">
        <template slot="title">
          <i class="dy-icon-menu"></i>
          导航二
        </template>
        <dy-menu-item-group>
          <template slot="title">
            分组一
          </template>
          <dy-menu-item index="2-1">选项1</dy-menu-item>
          <dy-menu-item index="2-2">选项2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="分组2">
          <dy-menu-item index="2-3">选项3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="2-4">
          <template slot="title">
            选项4
          </template>
          <dy-menu-item index="2-4-1">选项4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
      <dy-submenu index="3">
        <template slot="title">
          <i class="dy-icon-setting"></i>
          导航三
        </template>
        <dy-menu-item-group>
          <template slot="title">
            分组一
          </template>
          <dy-menu-item index="3-1">选项1</dy-menu-item>
          <dy-menu-item index="3-2">选项2</dy-menu-item>
        </dy-menu-item-group>
        <dy-menu-item-group title="分组2">
          <dy-menu-item index="3-3">选项3</dy-menu-item>
        </dy-menu-item-group>
        <dy-submenu index="3-4">
          <template slot="title">
            选项4
          </template>
          <dy-menu-item index="3-4-1">选项4-1</dy-menu-item>
        </dy-submenu>
      </dy-submenu>
    </dy-menu>
  </dy-aside>

  <dy-container>
    <dy-header style="text-align: right; font-size: 12px">
      <dy-dropdown>
        <i class="dy-icon-setting" style="margin-right: 15px"></i>
        <dy-dropdown-menu slot="dropdown">
          <dy-dropdown-item>查看</dy-dropdown-item>
          <dy-dropdown-item>新增</dy-dropdown-item>
          <dy-dropdown-item>删除</dy-dropdown-item>
        </dy-dropdown-menu>
      </dy-dropdown>
      <span>王小虎</span>
    </dy-header>

    <dy-main>
      <dy-table :data="tableData">
        <dy-table-column prop="date" label="日期" width="140"></dy-table-column>
        <dy-table-column prop="name" label="姓名" width="120"></dy-table-column>
        <dy-table-column prop="address" label="地址"></dy-table-column>
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
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
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

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                 |
| --------- | ---------------- | ------ | --------------------- | ---------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |
