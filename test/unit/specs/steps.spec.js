import { createVue, destroyVM, waitImmediate } from '../util';

describe('Steps', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue(`
      <dy-steps>
        <dy-step title="step1"></dy-step>
        <dy-step title="step2"></dy-step>
        <dy-step title="step3"></dy-step>
      </dy-steps>
    `);

    expect(vm.$el.querySelectorAll('.dy-step')).to.length(3);
  });

  it('space', async () => {
    vm = createVue(`
      <dy-steps>
        <dy-step title="step1"></dy-step>
        <dy-step title="step2"></dy-step>
        <dy-step title="step3"></dy-step>
      </dy-steps>
    `, true);

    const vm2 = createVue(`
      <dy-steps :space="100">
        <dy-step title="step1"></dy-step>
        <dy-step title="step2"></dy-step>
        <dy-step title="step3"></dy-step>
        <dy-step title="step4"></dy-step>
      </dy-steps>
    `, true);

    await waitImmediate();
    const stepElm = vm.$el.querySelector('.dy-step');
    const stepElm2 = vm2.$el.querySelector('.dy-step');
    expect(getComputedStyle(stepElm).flexBasis).to.equal('50%');
    expect(getComputedStyle(stepElm2).flexBasis).to.equal('100px');
  });

  it('processStatus', done => {
    vm = createVue(`
      <dy-steps :active="1" process-status="error">
        <dy-step title="step1"></dy-step>
        <dy-step title="step2"></dy-step>
        <dy-step title="step3"></dy-step>
      </dy-steps>
    `);

    vm.$nextTick(_ => {
      expect(vm.$el.querySelectorAll('.dy-step__head.is-error')).to.length(1);
      done();
    });
  });

  it('update processStatus', done => {
    vm = createVue({
      template: `
        <dy-steps :active="1" :process-status="processStatus">
          <dy-step title="abc"></dy-step>
          <dy-step title="abc2"></dy-step>
        </dy-steps>
      `,
      data () {
        return { processStatus: 'error' };
      }
    });

    vm.$nextTick(_ => {
      expect(vm.$el.querySelectorAll('.dy-step__head.is-error')).to.length(1);
      vm.processStatus = 'process';
      vm.$nextTick(_ => {
        expect(vm.$el.querySelectorAll('.dy-step__head.is-process')).to.length(1);
        done();
      });
    });
  });

  it('finishStatus', done => {
    vm = createVue(`
      <dy-steps :active="1" finish-status="error">
        <dy-step title="abc"></dy-step>
        <dy-step title="abc2"></dy-step>
      </dy-steps>
    `);

    vm.$nextTick(_ => {
      expect(vm.$el.querySelectorAll('.dy-step__head.is-error')).to.length(1);
      done();
    });
  });

  it('active', done => {
    vm = createVue({
      template: `
        <dy-steps :active="active" finish-status="error">
          <dy-step title="abc"></dy-step>
          <dy-step title="abc2"></dy-step>
        </dy-steps>
      `,

      data () {
        return { active: 0 };
      }
    });

    vm.$nextTick(_ => {
      expect(vm.$el.querySelectorAll('.dy-step__head.is-error')).to.length(0);
      vm.active = 2;
      vm.$nextTick(_ => {
        expect(vm.$el.querySelectorAll('.dy-step__head.is-error')).to.length(2);
        done();
      });
    });
  });

  it('create vertical', () => {
    vm = createVue(`
      <dy-steps direction="vertical">
        <dy-step title="aaa"></dy-step>
        <dy-step title="bbb"></dy-step>
      </dy-steps>
    `);

    expect(vm.$el.querySelector('.is-vertical')).to.exist;
  });

  it('vertical:height', async () => {
    vm = createVue(`
      <dy-steps direction="vertical" :space="200">
        <dy-step title="aaa"></dy-step>
        <dy-step title="bbb"></dy-step>
      </dy-steps>
    `, true);

    await waitImmediate();
    const stepElm = vm.$el.querySelector('.dy-step');
    expect(getComputedStyle(stepElm).flexBasis).to.equal('200px');
  });

  it('step:status=error', done => {
    vm = createVue(`
      <dy-steps :active="2" process-status="process" finish-status="success" direction="horizontal">
        <dy-step title="step1"></dy-step>
        <dy-step title="step2" status="error"></dy-step>
        <dy-step title="step3"></dy-step>
      </dy-steps>
    `);

    vm.$nextTick(_ => {
      const errorLine = vm.$el.querySelector('.dy-step:nth-child(2) .dy-step__line-inner');
      expect(errorLine.getBoundingClientRect().width).to.equal(0);
      const nextStep = vm.$el.querySelector('.dy-step:nth-child(3) .dy-step__head');
      expect(nextStep.classList.contains('is-wait')).to.equal(true);
      done();
    });
  });
});
