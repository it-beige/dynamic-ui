## Descriptions

Display multiple fields in list form.

### Basic usage

:::demo

```html
<dy-descriptions title="User Info">
  <dy-descriptions-item label="Username">kooriookami</dy-descriptions-item>
  <dy-descriptions-item label="Telephone">18100000000</dy-descriptions-item>
  <dy-descriptions-item label="Place">Suzhou</dy-descriptions-item>
  <dy-descriptions-item label="Remarks">
    <dy-tag size="small">School</dy-tag>
  </dy-descriptions-item>
  <dy-descriptions-item label="Address">
    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
  </dy-descriptions-item>
</dy-descriptions>
```

:::

### Sizes

:::demo

```html
<template>
  <dy-radio-group v-model="size">
    <dy-radio label="">Default</dy-radio>
    <dy-radio label="medium">Medium</dy-radio>
    <dy-radio label="small">Small</dy-radio>
    <dy-radio label="mini">Mini</dy-radio>
  </dy-radio-group>

  <dy-descriptions
    class="margin-top"
    title="With border"
    :column="3"
    :size="size"
    border
  >
    <template slot="extra">
      <dy-button type="primary" size="small">Operation</dy-button>
    </template>
    <dy-descriptions-item>
      <template slot="label">
        <i class="dy-icon-user"></i>
        Username
      </template>
      kooriookami
    </dy-descriptions-item>
    <dy-descriptions-item>
      <template slot="label">
        <i class="dy-icon-mobile-phone"></i>
        Telephone
      </template>
      18100000000
    </dy-descriptions-item>
    <dy-descriptions-item>
      <template slot="label">
        <i class="dy-icon-location-outline"></i>
        Place
      </template>
      Suzhou
    </dy-descriptions-item>
    <dy-descriptions-item>
      <template slot="label">
        <i class="dy-icon-tickets"></i>
        Remarks
      </template>
      <dy-tag size="small">School</dy-tag>
    </dy-descriptions-item>
    <dy-descriptions-item>
      <template slot="label">
        <i class="dy-icon-office-building"></i>
        Address
      </template>
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </dy-descriptions-item>
  </dy-descriptions>

  <dy-descriptions
    class="margin-top"
    title="Without border"
    :column="3"
    :size="size"
  >
    <template slot="extra">
      <dy-button type="primary" size="small">Operation</dy-button>
    </template>
    <dy-descriptions-item label="Username">kooriookami</dy-descriptions-item>
    <dy-descriptions-item label="Telephone">18100000000</dy-descriptions-item>
    <dy-descriptions-item label="Place">Suzhou</dy-descriptions-item>
    <dy-descriptions-item label="Remarks">
      <dy-tag size="small">School</dy-tag>
    </dy-descriptions-item>
    <dy-descriptions-item label="Address">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </dy-descriptions-item>
  </dy-descriptions>
</template>

<script>
  export default {
    data() {
      return {
        size: '',
      };
    },
  };
</script>
```

:::

### Vertical List

:::demo

```html
<dy-descriptions
  title="Vertical list with border"
  direction="vertical"
  :column="4"
  border
>
  <dy-descriptions-item label="Username">kooriookami</dy-descriptions-item>
  <dy-descriptions-item label="Telephone">18100000000</dy-descriptions-item>
  <dy-descriptions-item label="Place" :span="2">Suzhou</dy-descriptions-item>
  <dy-descriptions-item label="Remarks">
    <dy-tag size="small">School</dy-tag>
  </dy-descriptions-item>
  <dy-descriptions-item label="Address">
    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
  </dy-descriptions-item>
</dy-descriptions>

<dy-descriptions
  class="margin-top"
  title="Vertical list without border"
  :column="4"
  direction="vertical"
>
  <dy-descriptions-item label="Username">kooriookami</dy-descriptions-item>
  <dy-descriptions-item label="Telephone">18100000000</dy-descriptions-item>
  <dy-descriptions-item label="Place" :span="2">Suzhou</dy-descriptions-item>
  <dy-descriptions-item label="Remarks">
    <dy-tag size="small">School</dy-tag>
  </dy-descriptions-item>
  <dy-descriptions-item label="Address">
    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
  </dy-descriptions-item>
</dy-descriptions>
```

:::

### Customized Style

:::demo

```html
<dy-descriptions title="Customized style list" :column="3" border>
  <dy-descriptions-item
    label="Username"
    label-class-name="my-label"
    content-class-name="my-content"
  >
    kooriookami
  </dy-descriptions-item>
  <dy-descriptions-item label="Telephone">18100000000</dy-descriptions-item>
  <dy-descriptions-item label="Place">Suzhou</dy-descriptions-item>
  <dy-descriptions-item label="Remarks">
    <dy-tag size="small">School</dy-tag>
  </dy-descriptions-item>
  <dy-descriptions-item
    label="Address"
    :content-style="{'text-align': 'right'}"
  >
    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
  </dy-descriptions-item>
</dy-descriptions>
<style>
  .my-label {
    background: #e1f3d8;
  }

  .my-content {
    background: #fde2e2;
  }
</style>
```

:::

### Descriptions Attributes

| Attribute        | Description                                           | Type    | Accepted Values       | Default    |
| ---------------- | ----------------------------------------------------- | ------- | --------------------- | ---------- |
| border           | with or without border                                | boolean | —                     | false      |
| column           | numbers of `Descriptions Item` in one line            | number  | —                     | 3          |
| direction        | direction of list                                     | string  | vertical / horizontal | horizontal |
| size             | size of list                                          | string  | medium / small / mini | —          |
| title            | title text, display on the top left                   | string  | —                     | —          |
| extra            | extra text, display on the top right                  | string  | —                     | —          |
| colon            | change default props colon value of Descriptions Item | boolean | —                     | true       |
| labelClassName   | custom label class name                               | string  | —                     | —          |
| contentClassName | custom content class name                             | string  | —                     | —          |
| labelStyle       | custom label style                                    | object  | —                     | —          |
| contentStyle     | custom content style                                  | object  | —                     | —          |

### Descriptions Slots

| Name  | Description                                 |
| ----- | ------------------------------------------- |
| title | custom title, display on the top left       |
| extra | custom extra area, display on the top right |

### Descriptions Item Attributes

| Attribute        | Description               | Type   | Accepted Values | Default |
| ---------------- | ------------------------- | ------ | --------------- | ------- |
| label            | label text                | string | —               | —       |
| span             | colspan of column         | number | —               | 1       |
| labelClassName   | custom label class name   | string | —               | —       |
| contentClassName | custom content class name | string | —               | —       |
| labelStyle       | custom label style        | object | —               | —       |
| contentStyle     | custom content style      | object | —               | —       |

### Descriptions Item Slots

| Name  | Description  |
| ----- | ------------ |
| label | custom label |
