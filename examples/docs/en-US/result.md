## Result

Used to give feedback on the result of user's operation or access exception.

### Basic usage

:::demo

```html
<dy-row>
  <dy-col :sm="12" :lg="6">
    <dy-result
      icon="success"
      title="Success Tip"
      subTitle="Please follow the instructions"
    >
      <template slot="extra">
        <dy-button type="primary" size="medium">Back</dy-button>
      </template>
    </dy-result>
  </dy-col>
  <dy-col :sm="12" :lg="6">
    <dy-result
      icon="warning"
      title="Warning Tip"
      subTitle="Please follow the instructions"
    >
      <template slot="extra">
        <dy-button type="primary" size="medium">Back</dy-button>
      </template>
    </dy-result>
  </dy-col>
  <dy-col :sm="12" :lg="6">
    <dy-result
      icon="error"
      title="Error Tip"
      subTitle="Please follow the instructions"
    >
      <template slot="extra">
        <dy-button type="primary" size="medium">Back</dy-button>
      </template>
    </dy-result>
  </dy-col>
  <dy-col :sm="12" :lg="6">
    <dy-result
      icon="info"
      title="Info Tip"
      subTitle="Please follow the instructions"
    >
      <template slot="extra">
        <dy-button type="primary" size="medium">Back</dy-button>
      </template>
    </dy-result>
  </dy-col>
</dy-row>
```

:::

### Customized content

:::demo

```html
<dy-result title="404" subTitle="Sorry, request error">
  <template slot="icon">
    <dy-image
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    ></dy-image>
  </template>
  <template slot="extra">
    <dy-button type="primary" size="medium">Back</dy-button>
  </template>
</dy-result>
```

:::

### Result Attributes

| Attribute | Description | Type   | Accepted Values                  | Default |
| --------- | ----------- | ------ | -------------------------------- | ------- |
| title     | title       | string | —                                | —       |
| sub-title | sub title   | string | —                                | —       |
| icon      | icon type   | string | success / warning / info / error | info    |

### Result Slots

| Name     | Description       |
| -------- | ----------------- |
| icon     | custom icon       |
| title    | custom title      |
| subTitle | custom sub title  |
| extra    | custom extra area |
