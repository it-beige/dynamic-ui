import { createVue, destroyVM, waitImmediate } from '../util';

describe('Progress', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
        <div>
          <dy-progress ref="percent0" :percentage="0"></dy-progress>
          <dy-progress ref="percent50" :percentage="50"></dy-progress>
          <dy-progress ref="percent100" :percentage="100"></dy-progress>
        </div>
      `
    }, true);
    expect(vm.$refs.percent0.$el.querySelector('.dy-progress__text').innerText).to.be.equal('0%');
    expect(vm.$refs.percent0.$el.querySelector('.dy-progress-bar__inner').style.width).to.be.equal('0%');

    expect(vm.$refs.percent50.$el.querySelector('.dy-progress__text').innerText).to.be.equal('50%');
    expect(vm.$refs.percent50.$el.querySelector('.dy-progress-bar__inner').style.width).to.be.equal('50%');

    expect(vm.$refs.percent100.$el.querySelector('.dy-progress__text').innerText).to.be.equal('100%');
    expect(vm.$refs.percent100.$el.querySelector('.dy-progress-bar__inner').style.width).to.be.equal('100%');
  });
  it('status', () => {
    vm = createVue({
      template: `
        <div>
          <dy-progress ref="lineSuccess" :percentage="100" status="success"></dy-progress>
          <dy-progress ref="lineException" :percentage="0" status="exception"></dy-progress>
          <dy-progress type="circle" ref="circleSuccess" :percentage="100" status="success"></dy-progress>
          <dy-progress type="circle" ref="circleException" :percentage="0" status="exception"></dy-progress>
        </div>
      `
    }, true);
    expect(vm.$refs.lineSuccess.$el.classList.contains('is-success')).to.be.true;
    expect(vm.$refs.lineSuccess.$el.querySelector('.dy-progress__text .dy-icon-circle-check')).to.be.exist;
    expect(vm.$refs.lineException.$el.classList.contains('is-exception')).to.be.true;
    expect(vm.$refs.lineException.$el.querySelector('.dy-progress__text .dy-icon-circle-close')).to.be.exist;

    expect(vm.$refs.circleSuccess.$el.classList.contains('is-success')).to.be.true;
    expect(vm.$refs.circleSuccess.$el.querySelector('.dy-progress__text .dy-icon-check')).to.be.exist;
    expect(vm.$refs.circleException.$el.classList.contains('is-exception')).to.be.true;
    expect(vm.$refs.circleException.$el.querySelector('.dy-progress__text .dy-icon-close')).to.be.exist;
  });
  it('text inside', () => {
    vm = createVue({
      template: `
        <dy-progress :percentage="50" text-inside></dy-progress>
      `
    }, true);
    expect(vm.$el.classList.contains('el-progress--text-inside')).to.be.true;
  });
  it('stroke width', () => {
    vm = createVue({
      template: `
        <dy-progress :percentage="50" :stroke-width="8"></dy-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.dy-progress-bar__outer').style.height).to.be.equal('8px');
  });
  it('show text', () => {
    vm = createVue({
      template: `
        <dy-progress :percentage="50" :show-text="false"></dy-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.dy-progress__text')).to.not.exist;
  });
  it('circle', () => {
    vm = createVue({
      template: `
        <dy-progress type="circle" :percentage="50"></dy-progress>
      `
    }, true);
    expect(vm.$el.classList.contains('el-progress--circle')).to.be.true;
  });
  it('dashboard', () => {
    vm = createVue({
      template: `
        <dy-progress type="dashboard" :percentage="50"></dy-progress>
      `
    }, true);
    expect(vm.$el.classList.contains('el-progress--dashboard')).to.be.true;
  });
  it('width', () => {
    vm = createVue({
      template: `
        <dy-progress type="circle" :percentage="50" :width="120"></dy-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.dy-progress-circle').style.height).to.be.equal('120px');
    expect(vm.$el.querySelector('.dy-progress-circle').style.width).to.be.equal('120px');
  });
  it('should work with stroke-width', () => {
    vm = createVue({
      template: `
        <dy-progress :text-inside="true" :stroke-width="36" :percentage="0"></dy-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.dy-progress-bar__innerText').offsetTop).to.be.equal(12);
  });
  it('color', () => {
    vm = createVue({
      template: `
      <dy-progress :percentage="50" color="rgb(0, 0, 0)"></dy-progress>
      `
    }, true);
    expect(vm.$el.querySelector('.dy-progress-bar__inner').style.backgroundColor).to.equal('rgb(0, 0, 0)');
  });
  it('color is function', async () => {
    vm = createVue({
      template: `
      <dy-progress :percentage="percentage" :color="customColor"></dy-progress>
      `,
      data () {
        return {
          percentage: 50
        };
      },
      methods: {
        customColor (percentage) {
          if (percentage > 50) {
            return '#13ce66';
          } else {
            return '#20a0ff';
          }
        },
        increase () {
          this.percentage = 60;
        }
      }
    }, true);

    expect(vm.$el.querySelector('.dy-progress-bar__inner').style.backgroundColor).to.equal('rgb(32, 160, 255)');
    vm.increase();

    await waitImmediate();
    expect(vm.$el.querySelector('.dy-progress-bar__inner').style.backgroundColor).to.equal('rgb(19, 206, 102)');
  });

  it('color is array', async () => {
    vm = createVue({
      template: `
      <dy-progress :percentage="percentage" :color="colors"></dy-progress>
      `,
      data () {
        return {
          percentage: 50,
          colors: [
            {color: '#f56c6c', percentage: 20},
            {color: '#e6a23c', percentage: 40},
            {color: '#20a0ff', percentage: 60},
            {color: '#13ce66', percentage: 80},
            {color: '#6f7ad3', percentage: 100}
          ]
        };
      },
      methods: {
        increase () {
          this.percentage = 70;
        }
      }
    }, true);

    // #20a0ff
    expect(vm.$el.querySelector('.dy-progress-bar__inner').style.backgroundColor).to.equal('rgb(32, 160, 255)');

    vm.increase();
    await waitImmediate();
    // #13ce66
    expect(vm.$el.querySelector('.dy-progress-bar__inner').style.backgroundColor).to.equal('rgb(19, 206, 102)');
  });

  it('format content', () => {
    vm = createVue({
      template: `
      <dy-progress :percentage="50" :format="format"></dy-progress>
      `,
      methods: {
        format (percentage) {
          return `占比${percentage}%`;
        }
      }
    }, true);
    expect(vm.$el.querySelector('.dy-progress__text').innerHTML).to.equal('占比50%');
  });
});
