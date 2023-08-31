import { createVue, destroyVM } from '../util';

describe('Checkbox', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue({
      template: `
        <dy-checkbox v-model="checked">
        </dy-checkbox>
      `,
      data () {
        return {
          checked: false
        };
      }
    }, true);
    let checkboxElm = vm.$el;
    expect(checkboxElm.classList.contains('el-checkbox')).to.be.true;
    checkboxElm.click();
    vm.$nextTick(_ => {
      expect(checkboxElm.querySelector('.is-checked')).to.be.ok;
      done();
    });
  });
  it('disabled', () => {
    vm = createVue({
      template: `
        <dy-checkbox
          v-model="checked"
          disabled
        >
        </dy-checkbox>
      `,
      data () {
        return {
          checked: false
        };
      }
    }, true);
    let checkboxElm = vm.$el;
    expect(checkboxElm.querySelector('.is-disabled')).to.be.ok;
  });
  it('change event', done => {
    vm = createVue({
      template: `
        <dy-checkbox v-model="checked" @change="onChange">
        </dy-checkbox>
      `,
      methods: {
        onChange (val) {
          this.data = val;
        }
      },
      data () {
        return {
          data: '',
          checked: false
        };
      }
    }, true);
    let checkboxElm = vm.$el;
    checkboxElm.click();
    setTimeout(_ => {
      expect(vm.data).to.true;
      vm.checked = false;
      setTimeout(_ => {
        expect(vm.data).to.true;
        done();
      }, 10);
    }, 10);
  });
  it('checkbox group', done => {
    vm = createVue({
      template: `
        <dy-checkbox-group v-model="checkList">
          <dy-checkbox label="a" ref="a"></dy-checkbox>
          <dy-checkbox label="b" ref="b"></dy-checkbox>
          <dy-checkbox label="c" ref="c"></dy-checkbox>
          <dy-checkbox label="d" ref="d"></dy-checkbox>
        </dy-checkbox-group>
      `,
      data () {
        return {
          checkList: []
        };
      }
    }, true);
    expect(vm.checkList.length === 0).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      done();
    });
  });

  it('checkbox group change event', done => {
    vm = createVue({
      template: `
        <dy-checkbox-group v-model="checkList" @change="onChange">
          <dy-checkbox label="a" ref="a"></dy-checkbox>
          <dy-checkbox label="b" ref="b"></dy-checkbox>
        </dy-checkbox-group>
      `,
      methods: {
        onChange (val) {
          this.data = val;
        }
      },
      data () {
        return {
          data: '',
          checkList: []
        };
      }
    }, true);
    vm.$refs.a.$el.click();
    setTimeout(_ => {
      expect(vm.data).to.deep.equal(['a']);
      vm.checkList = ['b'];
      done();
    }, 10);
  });

  it('checkbox group minimum and maximum', done => {
    vm = createVue({
      template: `
        <dy-checkbox-group 
          v-model="checkList" 
          :min="1" 
          :max="2"
        >
          <dy-checkbox label="a" ref="a"></dy-checkbox>
          <dy-checkbox label="b" ref="b"></dy-checkbox>
          <dy-checkbox label="c" ref="c"></dy-checkbox>
          <dy-checkbox label="d" ref="d"></dy-checkbox>
        </dy-checkbox-group>
      `,
      data () {
        return {
          checkList: ['a'],
          lastEvent: null
        };
      }
    }, true);
    expect(vm.checkList.length === 1).to.be.true;
    expect(vm.$refs.a.isDisabled).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(() => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      vm.$refs.b.$el.click();
      vm.$nextTick(() => {
        expect(vm.checkList.indexOf('a') !== -1).to.be.true;
        expect(vm.checkList.indexOf('b') !== -1).to.be.true;
        vm.$refs.c.$el.click();
        vm.$nextTick(() => {
          expect(vm.checkList.indexOf('c') !== -1).to.be.false;
          expect(vm.checkList.indexOf('d') !== -1).to.be.false;
          expect(vm.$refs.c.isDisabled).to.be.true;
          expect(vm.$refs.d.isDisabled).to.be.true;
          done();
        });
      });
    });
  });

  it('nested group', done => {
    vm = createVue({
      template: `
        <dy-checkbox-group v-model="checkList">
          <dy-row>
            <dy-checkbox label="a" ref="a"></dy-checkbox>
            <dy-checkbox label="b" ref="b"></dy-checkbox>
            <dy-checkbox label="c" ref="c"></dy-checkbox>
            <dy-checkbox label="d" ref="d"></dy-checkbox>
          </dy-row>
        </dy-checkbox-group>
      `,
      data () {
        return {
          checkList: []
        };
      }
    }, true);
    expect(vm.checkList.length === 0).to.be.true;
    vm.$refs.a.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checkList.indexOf('a') !== -1).to.be.true;
      done();
    });
  });

  it('true false label', done => {
    vm = createVue({
      template: `
        <dy-checkbox true-label="a" :false-label="3" v-model="checked"></dy-checkbox>
      `,
      data () {
        return {
          checked: 'a'
        };
      }
    }, true);
    vm.$el.click();
    vm.$nextTick(_ => {
      expect(vm.checked === 3).to.be.true;
      done();
    });
  });
  it('checked', () => {
    vm = createVue({
      template: `
        <div>
          <dy-checkbox v-model="checked" checked></dy-checkbox>
          <dy-checkbox-group v-model="checklist">
            <dy-checkbox checked label="a"></dy-checkbox>
          </dy-checkbox-group>
        </div>
      `,
      data () {
        return {
          checked: false,
          checklist: []
        };
      }
    }, true);
    expect(vm.checked).to.be.true;
    expect(vm.checklist.indexOf('a') !== -1).to.be.true;
  });

  describe('checkbox-button', () => {
    let vm;
    afterEach(() => {
      destroyVM(vm);
    });

    it('create', done => {
      vm = createVue({
        template: `
          <dy-checkbox-button v-model="checked">
          </dy-checkbox-button>
        `,
        data () {
          return {
            checked: false
          };
        }
      }, true);
      let checkboxElm = vm.$el;
      expect(checkboxElm.classList.contains('el-checkbox-button')).to.be.true;
      checkboxElm.click();
      vm.$nextTick(_ => {
        expect(checkboxElm.classList.contains('is-checked')).to.be.ok;
        done();
      });
    });
    it('disabled', () => {
      vm = createVue({
        template: `
          <dy-checkbox-button
            v-model="checked"
            disabled
          >
          </dy-checkbox-button>
        `,
        data () {
          return {
            checked: false
          };
        }
      }, true);
      let checkboxElm = vm.$el;
      expect(checkboxElm.classList.contains('is-disabled')).to.be.ok;
    });

    it('change event', done => {
      vm = createVue({
        template: `
        <dy-checkbox-button v-model="checked" @change="onChange">
        </dy-checkbox-button>
      `,
        methods: {
          onChange (val) {
            this.data = val;
          }
        },
        data () {
          return {
            data: '',
            checked: false
          };
        }
      }, true);
      let checkboxElm = vm.$el;
      checkboxElm.click();
      setTimeout(_ => {
        expect(vm.data).to.true;
        vm.checked = false;
        setTimeout(_ => {
          expect(vm.data).to.true;
          done();
        }, 10);
      }, 10);
    });

    it('checkbox group', done => {
      vm = createVue({
        template: `
          <dy-checkbox-group v-model="checkList">
            <dy-checkbox-button label="a" ref="a"></dy-checkbox-button>
            <dy-checkbox-button label="b" ref="b"></dy-checkbox-button>
            <dy-checkbox-button label="c" ref="c"></dy-checkbox-button>
            <dy-checkbox-button label="d" ref="d"></dy-checkbox-button>
          </dy-checkbox-group>
        `,
        data () {
          return {
            checkList: []
          };
        }
      }, true);
      expect(vm.checkList.length === 0).to.be.true;
      vm.$refs.a.$el.click();
      vm.$nextTick(_ => {
        expect(vm.checkList.indexOf('a') !== -1).to.be.true;
        vm.$refs.b.$el.click();
        vm.$nextTick(_ => {
          expect(vm.checkList.indexOf('a') !== -1).to.be.true;
          expect(vm.checkList.indexOf('b') !== -1).to.be.true;
          done();
        });
      });
    });

    it('checkbox-button group change event', done => {
      vm = createVue({
        template: `
        <dy-checkbox-group v-model="checkList" @change="onChange">
          <dy-checkbox-button label="a" ref="a"></dy-checkbox-button>
          <dy-checkbox-button label="b" ref="b"></dy-checkbox-button>
          <dy-checkbox-button label="c" ref="c"></dy-checkbox-button>
          <dy-checkbox-button label="d" ref="d"></dy-checkbox-button>
        </dy-checkbox-group>
      `,
        methods: {
          onChange (val) {
            this.data = val;
          }
        },
        data () {
          return {
            data: '',
            checkList: []
          };
        }
      }, true);
      vm.$refs.a.$el.click();
      setTimeout(_ => {
        expect(vm.data).to.deep.equal(['a']);
        vm.checkList = ['b'];
        setTimeout(_ => {
          expect(vm.data).to.deep.equal(['a']);
          done();
        }, 10);
      }, 10);
    });

    it('checkbox group props', () => {
      vm = createVue({
        template: `
          <dy-checkbox-group v-model="checkList" size="large" fill="#FF0000" text-color="#000">
            <dy-checkbox-button label="a" ref="a"></dy-checkbox-button>
            <dy-checkbox-button label="b" ref="b"></dy-checkbox-button>
            <dy-checkbox-button label="c" ref="c"></dy-checkbox-button>
            <dy-checkbox-button label="d" ref="d"></dy-checkbox-button>
          </dy-checkbox-group>
        `,
        data () {
          return {
            checkList: ['a', 'd']
          };
        }
      }, true);
      expect(vm.checkList.length === 2).to.be.true;
      expect(vm.$refs.a.$el.classList.contains('is-checked')).to.be.true;
      expect(vm.$refs.a.$el.classList.contains('el-checkbox-button--large')).to.be.true;
      expect(vm.$refs.a.$el.querySelector('.dy-checkbox-button__inner').style.backgroundColor).to.be.eql('rgb(255, 0, 0)');
      expect(vm.$refs.a.$el.querySelector('.dy-checkbox-button__inner').style.boxShadow).to.be.eql('rgb(255, 0, 0) -1px 0px 0px 0px');
      expect(vm.$refs.a.$el.querySelector('.dy-checkbox-button__inner').style.borderColor).to.be.eql('rgb(255, 0, 0)');
      expect(vm.$refs.a.$el.querySelector('.dy-checkbox-button__inner').style.color).to.be.eql('rgb(0, 0, 0)');
      expect(vm.$refs.b.$el.classList.contains('is-checked')).to.be.false;
      expect(vm.$refs.c.$el.classList.contains('is-checked')).to.be.false;
      expect(vm.$refs.d.$el.classList.contains('is-checked')).to.be.true;
    });

    it('checkbox group minimum and maximum', done => {
      vm = createVue({
        template: `
          <dy-checkbox-group 
            v-model="checkList" 
            :min="1" 
            :max="2"
          >
            <dy-checkbox-button label="a" ref="a"></dy-checkbox-button>
            <dy-checkbox-button label="b" ref="b"></dy-checkbox-button>
            <dy-checkbox-button label="c" ref="c"></dy-checkbox-button>
            <dy-checkbox-button label="d" ref="d"></dy-checkbox-button>
          </dy-checkbox-group>
        `,
        data () {
          return {
            checkList: ['a'],
            lastEvent: null
          };
        }
      }, true);
      expect(vm.checkList.length === 1).to.be.true;
      vm.$refs.a.$el.click();
      vm.$nextTick(() => {
        expect(vm.checkList.indexOf('a') !== -1).to.be.true;
        vm.$refs.b.$el.click();
        vm.$nextTick(() => {
          expect(vm.checkList.indexOf('a') !== -1).to.be.true;
          expect(vm.checkList.indexOf('b') !== -1).to.be.true;
          vm.$refs.c.$el.click();
          vm.$nextTick(() => {
            expect(vm.checkList.indexOf('c') !== -1).to.be.false;
            expect(vm.checkList.indexOf('d') !== -1).to.be.false;
            done();
          });
        });
      });
    });

    it('nested group', done => {
      vm = createVue({
        template: `
          <dy-checkbox-group v-model="checkList">
            <dy-row>
              <dy-checkbox-button label="a" ref="a"></dy-checkbox-button>
              <dy-checkbox-button label="b" ref="b"></dy-checkbox-button>
              <dy-checkbox-button label="c" ref="c"></dy-checkbox-button>
              <dy-checkbox-button label="d" ref="d"></dy-checkbox-button>
            </dy-row>
          </dy-checkbox-group>
        `,
        data () {
          return {
            checkList: []
          };
        }
      }, true);
      expect(vm.checkList.length === 0).to.be.true;
      vm.$refs.a.$el.click();
      vm.$nextTick(_ => {
        expect(vm.checkList.indexOf('a') !== -1).to.be.true;
        done();
      });
    });

    it('true false label', done => {
      vm = createVue({
        template: `
          <dy-checkbox-button 
            true-label="a" 
            :false-label="3" 
            v-model="checked"
          ></dy-checkbox-button>
        `,
        data () {
          return {
            checked: 'a'
          };
        }
      }, true);
      vm.$el.click();
      vm.$nextTick(_ => {
        expect(vm.checked === 3).to.be.true;
        done();
      });
    });
    it('checked', () => {
      vm = createVue({
        template: `
          <div>
            <dy-checkbox-button v-model="checked" checked></dy-checkbox-button>
            <dy-checkbox-group v-model="checklist">
              <dy-checkbox-button checked label="a"></dy-checkbox-button>
            </dy-checkbox-group>
          </div>
        `,
        data () {
          return {
            checked: false,
            checklist: []
          };
        }
      }, true);
      expect(vm.checked).to.be.true;
      expect(vm.checklist.indexOf('a') !== -1).to.be.true;
    });

  });
});
