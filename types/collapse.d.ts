import { DynamicUIComponent } from './component'

/** Use Collapse to store contents. */
export declare class DyCollapse extends DynamicUIComponent {
  /** Whether to activate accordion mode */
  accordion: boolean

  /** Currently active panel */
  value: string | number | string[] | number[]
}
