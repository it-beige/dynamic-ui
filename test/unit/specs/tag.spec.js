import { createTest, createVue, destroyVM } from '../util';
import Tag from 'packages/tag';

describe('Tag', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
      <dy-tag></dy-tag>
      `
    }, true);
    expect(vm.$el.classList.contains('el-tag')).to.be.true;
    expect(vm.$el.classList.contains('el-tag__close')).to.be.false;
    expect(vm.$el.classList.contains('is-hit')).to.be.false;
    expect(vm.$el.classList.contains('md-fade-center')).to.be.false;
  });

  it('text', () => {
    vm = createVue({
      template: `
      <dy-tag>标签</dy-tag>
      `
    }, true);
    expect(vm.$el.textContent.length).to.be.at.least(2);
  });

  it('type', () => {
    vm = createVue({
      template: `
      <dy-tag type="primary"></dy-tag>
      `
    }, true);
    expect(vm.$el.classList.contains('el-tag--primary')).to.be.true;
  });

  it('hit', () => {
    vm = createVue({
      template: `
      <dy-tag hit></dy-tag>
      `
    }, true);
    expect(vm.$el.classList.contains('is-hit')).to.be.true;
  });

  it('closable', done => {
    vm = createVue({
      template: `
      <dy-tag closable @close="handleClose">关闭标签</dy-tag>
      `,
      data () {
        return {
          isClose: false
        };
      },
      methods: {
        handleClose () {
          this.isClose = true;
        }
      }
    }, true);
    var closeBtn = vm.$el.querySelector('.dy-tag .dy-tag__close');
    expect(closeBtn).to.exist;
    closeBtn.click();
    vm.$nextTick(_ => {
      expect(vm.isClose).to.true;
      done();
    });
  });

  it('closeTransition', () => {
    vm = createVue({
      template: `
      <dy-tag closable closeTransition></dy-tag>
      `
    }, true);
    expect(vm.$el.classList.contains('md-fade-center')).to.be.false;
  });

  it('color', () => {
    vm = createVue({
      template: `
      <dy-tag ref="tag" color="rgb(0, 0, 0)"></dy-tag>
      `
    }, true);
    expect(vm.$el.style.backgroundColor).to.equal('rgb(0, 0, 0)');
  });

  it('click', done => {
    vm = createVue({
      template: `
      <dy-tag ref="tag" @click="handleClick">点击标签</dy-tag>
      `,
      data () {
        return {
          clicksCount: 0
        };
      },
      methods: {
        handleClick () {
          this.clicksCount = this.clicksCount + 1;
        }
      }
    }, true);

    let tag = vm.$refs.tag;
    tag.$el.click();

    setTimeout(_ => {
      expect(vm.clicksCount).to.be.equal(1);
      done();
    }, 20);
  });

  it('theme', () => {
    vm = createTest(Tag, { effect: 'dark' }, true);
    const el = vm.$el;
    expect(el.className).to.includes('el-tag--dark');
    expect(el.className).to.not.includes('el-tag--light');
    expect(el.className).to.not.includes('el-tag--plain');
  });
});
