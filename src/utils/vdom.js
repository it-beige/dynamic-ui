import { hasOwn } from 'dynamic-ui/src/utils/util';

export function isVNode (node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

export function isReactive(obj) {
  return obj && obj.__ob__;
}
