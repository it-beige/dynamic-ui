import { DynamicUIComponent } from './component'

/** Radio Button Component */
export declare class DyRadioButton extends DynamicUIComponent {
  /** The form input value */
  value: string

  /** The value of radio */
  label: string | number

  /** Whether radio is disabled */
  disabled: boolean

  /** Native 'name' attribute */
  name: string
}
