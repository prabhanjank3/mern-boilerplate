interface TimeFieldMeta {
  /**
   * setting isValid to false will show error on the field
   * @default false
   */
  isValid: boolean;
  /**
   * message will be displayed as helpertext on the field
   * @default ''
   */
  messages: Array<string>;
}

export interface TimeFieldProps {
  name: string;
  value?: string | null | undefined | unknown;
  label: string;
  defaultValue?: Date;
  extraAttributes?: Object;
  onChange: func;
  meta?: TimeFieldMeta;
}
