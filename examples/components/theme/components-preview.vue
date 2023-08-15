<style lang="scss">
.component-preview {
  padding-right: 10px;
  &:last-of-type {
    padding-bottom: 20px;
  }
  h4 {
    font-size: 20px;
    margin: 40px 0 20px;
    color: #909399
  }
  .demo-item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .demo-line {
    margin: 15px 0;
  }

  .dy-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .dy-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .dy-avatar:not(:last-child) {
    margin-right: 20px;
  }

  .avatar-demo {
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div class="component-preview">
    <h4>Button</h4>
    <dy-row class="demo-line">
      <dy-button>Default</dy-button>
      <dy-button type="primary">Primary</dy-button>
      <dy-button type="success">Success</dy-button>
      <dy-button type="info">Info</dy-button>
      <dy-button type="warning">Warning</dy-button>
      <dy-button type="danger">Danger</dy-button>
    </dy-row>
    <dy-row class="demo-line">
      <dy-button plain>Plain</dy-button>
      <dy-button type="primary" plain>Primary</dy-button>
      <dy-button type="success" plain>Success</dy-button>
      <dy-button type="info" plain>Info</dy-button>
      <dy-button type="warning" plain>Warning</dy-button>
      <dy-button type="danger" plain>Danger</dy-button>
    </dy-row>
    <dy-row class="demo-line">
      <dy-button round>Round</dy-button>
      <dy-button type="primary" round>Primary</dy-button>
      <dy-button type="success" round>Success</dy-button>
      <dy-button type="info" round>Info</dy-button>
      <dy-button type="warning" round>Warning</dy-button>
      <dy-button type="danger" round>Danger</dy-button>
    </dy-row>
    <dy-row class="demo-line">
      <dy-button icon="dy-icon-search" circle></dy-button>
      <dy-button type="primary" icon="dy-icon-edit" circle></dy-button>
      <dy-button type="success" icon="dy-icon-check" circle></dy-button>
      <dy-button type="info" icon="dy-icon-message" circle></dy-button>
      <dy-button type="warning" icon="dy-icon-star-off" circle></dy-button>
      <dy-button type="danger" icon="dy-icon-delete" circle></dy-button>
    </dy-row>
    <dy-row class="demo-line">
      <dy-button>Default</dy-button>
      <dy-button size="medium">Medium</dy-button>
      <dy-button size="small">Small</dy-button>
      <dy-button size="mini">Mini</dy-button>
    </dy-row>
    <h4>Radio</h4>
    <dy-row class="demo-line">
      <dy-radio v-model="radio" label="1">Option A</dy-radio>
      <dy-radio v-model="radio" label="2">Option B</dy-radio>
    </dy-row>
    <dy-row class="demo-line">
      <dy-radio-group v-model="radio1">
        <dy-radio-button label="New York"></dy-radio-button>
        <dy-radio-button label="Washington"></dy-radio-button>
        <dy-radio-button label="Los Angeles"></dy-radio-button>
        <dy-radio-button label="Chicago"></dy-radio-button>
      </dy-radio-group>
    </dy-row>
    <dy-row class="demo-line">
      <dy-radio v-model="radio2" label="1" border>Option A</dy-radio>
      <dy-radio v-model="radio2" label="2" border>Option B</dy-radio>
    </dy-row>
    <h4>Checkbox</h4>
    <dy-row class="demo-line">
      <dy-checkbox v-model="checked">Option</dy-checkbox>
    </dy-row>
    <dy-row class="demo-line">
      <dy-checkbox-group v-model="checked1">
        <dy-checkbox-button v-for="city in ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']" :label="city" :key="city">{{city}}</dy-checkbox-button>
      </dy-checkbox-group>
    </dy-row>
    <dy-row class="demo-line">
      <dy-checkbox v-model="checked2" label="Option1" border></dy-checkbox>
    </dy-row>
    <h4>Input</h4>
    <dy-row style="width: 180px">
      <dy-input placeholder="Please input" v-model="input"></dy-input>
    </dy-row>
    <h4>InputNumber</h4>
    <dy-row>
      <dy-input-number v-model="inputNumber" :min="1" :max="10"></dy-input-number>
    </dy-row>
    <h4>Select</h4>
    <dy-row>
      <dy-select v-model="selectValue" placeholder="Select">
        <dy-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></dy-option>
      </dy-select>
    </dy-row>
    <h4>Cascader</h4>
    <dy-row>
      <dy-cascader :options="cascadeOptions" v-model="cascaderValue"></dy-cascader>
    </dy-row>
    <h4>Switch</h4>
    <dy-row>
      <dy-switch v-model="switchValue"></dy-switch>
      <dy-switch
        style="margin-left: 40px"
        v-model="switchValue"
        active-text="Pay by month"
        inactive-text="Pay by year">
      </dy-switch>
    </dy-row>
    <h4>Slider</h4>
    <dy-row style="width: 380px">
      <dy-slider v-model="slider"></dy-slider>
    </dy-row>
    <h4>DatePicker</h4>
    <dy-row>
      <dy-date-picker v-model="datePicker" type="date"></dy-date-picker>
    </dy-row>
    <h4>Rate</h4>
    <dy-row>
      <dy-rate class="demo-line" v-model="rate"></dy-rate>
      <dy-rate
        class="demo-line"
        v-model="rate"
        show-score
        text-color="#ff9900"
        score-template="{value} points">
      </dy-rate>
    </dy-row>
    <h4>Transfer</h4>
    <dy-row>
      <dy-transfer v-model="transfer" filterable :data="transferData">
        <dy-button class="transfer-footer" slot="left-footer" size="small">Operation</dy-button>
        <dy-button class="transfer-footer" slot="right-footer" size="small">Operation</dy-button>
      </dy-transfer>
    </dy-row>
    <h4>Table</h4>
    <dy-row>
      <dy-table :data="tableData" style="width: 70%">
        <dy-table-column prop="date" label="Date" width="180"></dy-table-column>
        <dy-table-column prop="name" label="Name" width="180"></dy-table-column>
        <dy-table-column prop="address" label="Address"></dy-table-column>
      </dy-table>
    </dy-row>
    <h4>Tag</h4>
    <dy-row>
      <dy-tag class="demo-item" closable>Tag One</dy-tag>
      <dy-tag class="demo-item" closable type="success">Tag Two</dy-tag>
      <dy-tag class="demo-item" closable type="info">Tag Three</dy-tag>
      <dy-tag class="demo-item" closable type="warning">Tag Four</dy-tag>
      <dy-tag class="demo-item" closable type="danger">Tag Five</dy-tag>
    </dy-row>
    <h4>Progress</h4>
    <dy-row style="width: 380px">
      <dy-progress :percentage="20"></dy-progress>
      <dy-progress :percentage="60" status="exception"></dy-progress>
      <dy-progress :percentage="100" status="success"></dy-progress>
    </dy-row>
    <h4>Tree</h4>
    <dy-row style="width: 380px">
      <dy-tree :data="treeData" :props="defaultTreeProps" ></dy-tree>
    </dy-row>
    <h4>Pagination</h4>
    <dy-row>
      <dy-pagination layout="prev, pager, next" :total="1000"></dy-pagination>
    </dy-row>
    <h4>Badge</h4>
    <dy-row>
      <dy-badge :value="12" class="demo-item">
        <dy-button size="small">comments</dy-button>
      </dy-badge>
      <dy-badge :value="3" class="demo-item">
        <dy-button size="small">replies</dy-button>
      </dy-badge>
      <dy-badge :value="1" class="demo-item" type="primary">
        <dy-button size="small">comments</dy-button>
      </dy-badge>
      <dy-badge :value="2" class="demo-item" type="warning">
        <dy-button size="small">replies</dy-button>
      </dy-badge>
    </dy-row>
    <h4>Alert</h4>
    <dy-row style="width: 380px;">
      <dy-alert class="demo-item" title="success alert" type="success" show-icon></dy-alert>
      <dy-alert class="demo-item" title="info alert" type="info" close-text="Gotcha" show-icon></dy-alert>
      <dy-alert class="demo-item" title="warning alert" type="warning" show-icon></dy-alert>
      <dy-alert
        class="demo-item"
        title="error alert"
        type="error"
        description="more text description"
        show-icon>
      </dy-alert>
    </dy-row>
    <h4>Loading</h4>
    <dy-row>
      <dy-table :data="tableData" style="width: 90%" v-loading="true">
        <dy-table-column prop="date" label="Date" width="180"></dy-table-column>
        <dy-table-column prop="name" label="Name" width="180"></dy-table-column>
        <dy-table-column prop="address" label="Address"></dy-table-column>
      </dy-table>
    </dy-row>
    <h4>Message</h4>
    <dy-row>
      <div role="alert" class="demo-item el-message el-message--success el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon dy-icon-success"></i><p class="el-message__content">Congrats, this is a success message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--warning el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon dy-icon-warning"></i><p class="el-message__content">Warning, this is a warning message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--info el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon dy-icon-info"></i><p class="el-message__content">This is a message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--error is-closable el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon dy-icon-error"></i><p class="el-message__content">Oops, this is a error message.</p><i class="el-message__closeBtn dy-icon-close"></i></div>
    </dy-row>
    <h4>MessageBox</h4>
    <dy-row>
      <div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title"><!----><span>Warning</span></div><button type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close dy-icon-close"></i></button></div><div class="el-message-box__content"><div class="el-message-box__status dy-icon-warning"></div><div class="el-message-box__message"><p>This will permanently delete the file. Continue?</p></div><div class="el-message-box__input" style="display: none;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"><!----><!----><!----></div><div class="el-message-box__errormsg" style="visibility: hidden;"></div></div></div><div class="el-message-box__btns"><button type="button" class="el-button el-button--default el-button--small"><!----><!----><span>
          Cancel
        </span></button><button type="button" class="el-button el-button--default el-button--small el-button--primary "><!----><!----><span>
          OK
        </span></button></div></div>
    </dy-row>
    <h4>Notification</h4>
    <dy-row>
      <div role="alert" class="el-notification right" style="position: relative; left: 0;"><!----><div class="el-notification__group"><span class="el-notification__title">Notification</span><div class="el-notification__content"><div>This is a message </div></div><div class="el-notification__closeBtn dy-icon-close"></div></div></div>
    </dy-row>
    <h4>Menu</h4>
    <dy-row>
      <dy-menu :default-active="menu" class="el-menu-demo" mode="horizontal">
        <dy-menu-item index="1">Processing Center</dy-menu-item>
        <dy-submenu index="2">
          <template slot="title">Workspace</template>
          <dy-menu-item index="2-1">item one</dy-menu-item>
          <dy-menu-item index="2-2">item two</dy-menu-item>
          <dy-menu-item index="2-3">item three</dy-menu-item>
          <dy-submenu index="2-4">
            <template slot="title">item four</template>
            <dy-menu-item index="2-4-1">item one</dy-menu-item>
            <dy-menu-item index="2-4-2">item two</dy-menu-item>
            <dy-menu-item index="2-4-3">item three</dy-menu-item>
          </dy-submenu>
        </dy-submenu>
        <dy-menu-item index="3" disabled>Info</dy-menu-item>
        <dy-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">Orders</a>
        </dy-menu-item>
      </dy-menu>
      <dy-menu
        default-active="2"
        class="demo-line"
      >
        <dy-submenu index="1">
          <template slot="title">
            <i class="dy-icon-location"></i>
            <span>Navigator One</span>
          </template>
          <dy-menu-item-group title="Group One">
            <dy-menu-item index="1-1">item one</dy-menu-item>
            <dy-menu-item index="1-2">item one</dy-menu-item>
          </dy-menu-item-group>
          <dy-menu-item-group title="Group Two">
            <dy-menu-item index="1-3">item three</dy-menu-item>
          </dy-menu-item-group>
          <dy-submenu index="1-4">
            <template slot="title">item four</template>
            <dy-menu-item index="1-4-1">item one</dy-menu-item>
          </dy-submenu>
        </dy-submenu>
        <dy-menu-item index="2">
          <i class="dy-icon-menu"></i>
          <span>Navigator Two</span>
        </dy-menu-item>
        <dy-menu-item index="3" disabled>
          <i class="dy-icon-document"></i>
          <span>Navigator Three</span>
        </dy-menu-item>
        <dy-menu-item index="4">
          <i class="dy-icon-setting"></i>
          <span>Navigator Four</span>
        </dy-menu-item>
      </dy-menu>
    </dy-row>
    <h4>Tabs</h4>
    <dy-row>
      <dy-tabs v-model="tab" class="demo-item">
        <dy-tab-pane label="User" name="first">User</dy-tab-pane>
        <dy-tab-pane label="Config" name="second">Config</dy-tab-pane>
        <dy-tab-pane label="Role" name="third">Role</dy-tab-pane>
        <dy-tab-pane label="Task" name="fourth">Task</dy-tab-pane>
      </dy-tabs>
      <dy-tabs type="card" class="demo-item">
        <dy-tab-pane label="User">User</dy-tab-pane>
        <dy-tab-pane label="Config">Config</dy-tab-pane>
        <dy-tab-pane label="Role">Role</dy-tab-pane>
        <dy-tab-pane label="Task">Task</dy-tab-pane>
      </dy-tabs>
    </dy-row>
    <h4>Dialog</h4>
    <dy-row>
      <div role="dialog" aria-modal="true" aria-label="Tips" class="el-dialog" style="margin: 0"><div class="el-dialog__header"><span class="el-dialog__title">Tips</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon dy-icon-close"></i></button></div><div class="el-dialog__body"><span>This is a message</span> </div><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="el-button el-button--default"><!----><!----><span>Cancel</span></button> <button type="button" class="el-button el-button--primary"><!----><!----><span>Confirm</span></button></span></div></div>
    </dy-row>
    <h4>Tooltip</h4>
    <dy-row>
      <div role="tooltip" x-placement="top" class="el-tooltip__popper is-dark" style="position: relative; width: 40px;text-align: center;">Dark<div x-arrow="" class="popper__arrow"></div>
      </div>
      <div role="tooltip" x-placement="top" class="el-tooltip__popper is-light" style="margin-top: 10px;position: relative; width: 40px;text-align: center;">Light<div x-arrow="" class="popper__arrow"></div>
      </div>
    </dy-row>
    <h4>Popover</h4>
    <dy-row>
      <div role="tooltip" x-placement="top" id="el-popover-2936" aria-hidden="true" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 200px; position: relative; "><div class="el-popover__title">Title</div>this is content, this is content, this is content<div x-arrow="" class="popper__arrow"></div></div>
    </dy-row>
    <h4>Card</h4>
    <dy-row>
      <dy-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Card name</span>
        </div>
      </dy-card>
    </dy-row>
    <h4>Carousel</h4>
    <dy-row>
      <dy-carousel height="150px">
        <dy-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </dy-carousel-item>
      </dy-carousel>
    </dy-row>
    <h4>Collapse</h4>
    <dy-row>
      <dy-collapse v-model="collapse">
        <dy-collapse-item title="Consistent" name="1">
          <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        </dy-collapse-item>
        <dy-collapse-item title="Feedback" name="2">
          <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        </dy-collapse-item>
      </dy-collapse>
    </dy-row>
    <h4>Avatar</h4>
    <dy-row class="demo-line avatar-demo">
      <dy-avatar icon="dy-icon-user-solid"/>
      <dy-avatar> avatar </dy-avatar>
      <dy-avatar shape="square" fit="contain" :src="avatarData.url"></dy-avatar>
      <dy-avatar size="large"> large </dy-avatar>
      <dy-avatar size="medium"> medium </dy-avatar>
      <dy-avatar size="small"> small </dy-avatar>
    </dy-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      radio1: 'Washington',
      radio2: '1',
      checked: true,
      checked1: ['Shanghai'],
      checked2: true,
      input: 'Element',
      inputNumber: 1,
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      selectValue: '',
      cascadeOptions: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],
      cascaderValue: [],
      switchValue: true,
      slider: 28,
      datePicker: '',
      rate: null,
      transferData: (() => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0
          });
        }
        return data;
      })(),
      transfer: [1, 4],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      menu: '1',
      tab: 'first',
      collapse: ['1'],
      treeData: [{
        label: 'Level one 1',
        children: [{
          label: 'Level two 1-1',
          children: [{
            label: 'Level three 1-1-1'
          }]
        }]
      }, {
        label: 'Level one 2',
        children: [{
          label: 'Level two 2-1',
          children: [{
            label: 'Level three 2-1-1'
          }]
        }, {
          label: 'Level two 2-2',
          children: [{
            label: 'Level three 2-2-1'
          }]
        }]
      }, {
        label: 'Level one 3',
        children: [{
          label: 'Level two 3-1',
          children: [{
            label: 'Level three 3-1-1'
          }]
        }, {
          label: 'Level two 3-2',
          children: [{
            label: 'Level three 3-2-1'
          }]
        }]
      }],
      defaultTreeProps: {
        children: 'children',
        label: 'label'
      },
      avatarData: {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    };
  }
};
</script>
