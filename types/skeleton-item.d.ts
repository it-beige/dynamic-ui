import { DynamicUIComponent } from './component'

/** Skeleton Item Component */
export declare class DySkeletonItem extends DynamicUIComponent {
  /** The current rendering skeleton type; default: text */
  variant:
    | 'p'
    | 'text'
    | 'h1'
    | 'h3'
    | 'text'
    | 'caption'
    | 'button'
    | 'image'
    | 'circle'
    | 'rect'
}
