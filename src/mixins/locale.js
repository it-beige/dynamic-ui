import { t } from 'dynamic-ui/src/locale';

export default {
  methods: {
    t (...args) {
      return t.apply(this, args);
    }
  }
};
