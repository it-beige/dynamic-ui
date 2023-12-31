import { createVue, destroyVM } from '../util';

describe('Col', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
        <dy-col :span="12">
        </dy-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('el-col')).to.be.true;
  });
  it('span', () => {
    vm = createVue({
      template: `
        <dy-col :span="12">
        </dy-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('el-col-12')).to.be.true;
  });
  it('pull', () => {
    vm = createVue({
      template: `
        <dy-col :span="12" :pull="3">
        </dy-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('el-col-pull-3')).to.be.true;
  });
  it('push', () => {
    vm = createVue({
      template: `
        <dy-col :span="12" :push="3">
        </dy-col>
      `
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('el-col-push-3')).to.be.true;
  });
  it('gutter', () => {
    vm = createVue({
      template: `
        <dy-row :gutter="20">
          <dy-col :span="12" ref="col">
          </dy-col>
        </dy-row>
      `
    }, true);
    let colElm = vm.$refs.col.$el;
    expect(colElm.style.paddingLeft === '10px').to.be.true;
    expect(colElm.style.paddingRight === '10px').to.be.true;
  });
  it('responsive', () => {
    vm = createVue({
      template: `
        <dy-row :gutter="20">
          <dy-col ref="col" :sm="{ span: 4, offset: 2 }" :md="8" :lg="{ span: 6, offset: 3 }">
          </dy-col>
        </dy-row>
      `
    }, true);
    let colElm = vm.$refs.col.$el;
    expect(colElm.classList.contains('el-col-sm-4')).to.be.true;
    expect(colElm.classList.contains('el-col-sm-offset-2')).to.be.true;
    expect(colElm.classList.contains('el-col-lg-6')).to.be.true;
    expect(colElm.classList.contains('el-col-lg-offset-3')).to.be.true;
    expect(colElm.classList.contains('el-col-md-8')).to.be.true;
  });
});
