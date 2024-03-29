import { createTest, createVue, destroyVM } from '../util';
import Rate from 'packages/rate';
import Vue from 'vue';

describe('Rate', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Rate, { max: 10 }, true);
    const stars = vm.$el.querySelectorAll('.dy-rate__item');
    expect(stars.length).to.equal(10);
  });

  it('with texts', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate
            v-model="value"
            show-text
            :texts="['1', '2', '3', '4', '5']"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 4
        };
      }
    }, true);
    const text = vm.$el.querySelector('.dy-rate__text');
    expect(text.textContent).to.equal('4');
  });

  it('value change', done => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 0
        };
      }
    }, true);
    const rate = vm.$children[0];
    expect(rate.value).to.equal(0);
    vm.value = 3;
    Vue.nextTick(() => {
      expect(rate.value).to.equal(3);
      done();
    });
  });

  it('click', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 0
        };
      }
    }, true);
    const thirdStar = vm.$el.querySelectorAll('.dy-rate__item')[2];
    thirdStar.click();
    expect(vm.value).to.equal(3);
  });

  it('colors', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 4
        };
      }
    }, true);
    const thirdIcon = vm.$el.querySelectorAll('.dy-rate__item')[2].querySelector('.dy-rate__icon');
    expect(thirdIcon.style.color).to.equal('rgb(255, 153, 0)');
  });

  it('colors are updated after prop is changed', done => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value" :colors="colors"></dy-rate>
        </div>
      `,

      computed: {
        colors () {
          if (this.muted) {
            return ['#999', '#999', '#999'];
          } else {
            return ['#99A9BF', '#F7BA2A', '#FF9900'];
          }
        }
      },
      data () {
        return {
          value: 4,
          muted: false
        };
      }
    }, true);
    setTimeout(() => {
      vm.muted = true;
      vm.$nextTick(() => {
        const thirdIcon = vm.$el.querySelectorAll('.dy-rate__item')[2].querySelector('.dy-rate__icon');
        expect(thirdIcon.style.color).to.equal('rgb(153, 153, 153)');
        done();
      });
    }, 10);
  });

  it('threshold', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value" :low-threshold="3"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 3
        };
      }
    }, true);
    const thirdIcon = vm.$el.querySelectorAll('.dy-rate__item')[2].querySelector('.dy-rate__icon');
    expect(thirdIcon.style.color).to.equal('rgb(247, 186, 42)');
  });

  it('disabled', () => {
    const vm1 = createVue({
      template: `
        <div>
          <dy-rate v-model="value" disabled show-text></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 3.7
        };
      }
    }, true);
    const vm2 = createVue({
      template: `
        <div>
          <dy-rate v-model="value" disabled show-text></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 3.4
        };
      }
    }, true);
    const firstStar = vm1.$el.querySelectorAll('.dy-rate__item')[0];
    firstStar.click();
    vm1.$children[0].resetCurrentValue();
    expect(vm1.value).to.equal(3.7);

    const fourthStar = vm2.$el.querySelectorAll('.dy-rate__item')[3];
    const halfStar = fourthStar.querySelector('.dy-rate__decimal');
    expect(halfStar.style.width).to.equal('40%');
  });

  it('allow half', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate v-model="value" allow-half></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 0
        };
      }
    }, true);
    const rate = vm.$children[0];
    const secondStar = vm.$el.querySelectorAll('.dy-rate__item')[1];
    rate.setCurrentValue(1, { target: secondStar, offsetX: 2 });
    secondStar.click();
    rate.resetCurrentValue();
    expect(vm.value).to.equal(0.5);
  });

  it('custom icon classes by passing object', () => {
    vm = createVue({
      template: `
        <div>
          <dy-rate
            v-model="value"
            :icon-classes="{ 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }"></dy-rate>
        </div>
      `,

      data () {
        return {
          value: 4
        };
      }
    }, true);
    const thirdIcon = vm.$el.querySelectorAll('.dy-rate__item')[3].querySelector('.dy-rate__icon');
    expect(thirdIcon.className).to.include('icon-rate-face-3');
  });

});
