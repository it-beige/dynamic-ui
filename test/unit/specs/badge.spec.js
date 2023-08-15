import { createTest, createVue, destroyVM } from '../util';
import Badge from 'packages/badge';

describe('Badge', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('value', () => {
    vm = createTest(Badge, { value: 80 });
    expect(vm.content).to.equal(80);
  });

  it('is fixed', () => {
    vm = createVue(`
      <dy-badge>
        <button>click</button>
      </dy-badge>
    `);

    expect(vm.$el.querySelector('.dy-badge__content.is-fixed')).to.exist;
  });

  it('is dot', () => {
    vm = createVue(`
      <dy-badge is-dot>
        <button>click</button>
      </dy-badge>
    `);

    expect(vm.$el.querySelector('.dy-badge__content.is-dot')).to.exist;
  });

  it('is dot with type', () => {
    vm = createVue(`
      <dy-badge is-dot type="success">
        <button>click</button>
      </dy-badge>
    `);

    expect(vm.$el.querySelector('.dy-badge__content.is-dot')).to.exist;
    expect(vm.$el.querySelector('.dy-badge__content.dy-badge__content--success.is-dot')).to.exist;
  });

  it('max', () => {
    vm = createTest(Badge, { max: 100, value: 200 });
    expect(vm.content).to.equal('100+');
    vm = createTest(Badge, { max: 100, value: 80 });
    expect(vm.content).to.equal(80);
  });
});
