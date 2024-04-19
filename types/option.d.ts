import { DynamicUIComponent } from './component'

/** Dropdown Select Option Component */
export declare class DyOption extends DynamicUIComponent {
  /** Value of option */
  value: any

  /** Label of option, same as value if omitted */
  label: string

  /** Whether option is disabled */
  disabled: boolean
}
