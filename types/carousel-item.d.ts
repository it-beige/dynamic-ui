import { DynamicUIComponent } from './component'

/** Carousel Item Component */
export declare class DyCarouselItem extends DynamicUIComponent {
  /** Name of the item, can be used in setActiveItem */
  name: string

  /** Text content for the corresponding indicator */
  label: string
}
