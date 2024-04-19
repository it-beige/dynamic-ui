import Vue from 'vue'

/** DynamicUI component common definition */
export declare class DynamicUIComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type DynamicUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type DynamicUIHorizontalAlignment = 'left' | 'center' | 'right'
