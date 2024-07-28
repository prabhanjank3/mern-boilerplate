interface DateFieldMeta {
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

export interface DateFieldProps {
  name: string;
  /**
   * @default new Date()
   */
  value?: Date;
  label: string;
  /**
   * @default "DD-MM-YYYY"
   */
  inputFormat?: string;
  defaultValue?: Date;
  extraAttributes?: Object;
  onChange: func;
  meta?: DateFieldMeta;
}
