import { createVue, destroyVM } from '../util';

describe('Breadcrumb', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue(`
      <dy-breadcrumb separator=">">
        <dy-breadcrumb-item to="/">首页</dy-breadcrumb-item>
        <dy-breadcrumb-item>活动管理</dy-breadcrumb-item>
        <dy-breadcrumb-item>活动列表</dy-breadcrumb-item>
        <dy-breadcrumb-item>活动详情</dy-breadcrumb-item>
      </dy-breadcrumb>
    `);
    vm.$nextTick(_ => {
      expect(vm.$el.querySelector('.dy-breadcrumb__separator').innerText).to.equal('>');
      done();
    });
  });
});
