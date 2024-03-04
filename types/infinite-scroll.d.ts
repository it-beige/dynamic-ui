import { VNodeDirective } from 'vue'

export interface DyInfiniteScroll extends VNodeDirective {
  name: 'infinite-scroll',
  value: Function
}