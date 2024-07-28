export interface CustomOption {
  /**
   * id - used for purpose of uniquely identify option - Better to pass id to handler function that name
   */
  id: string;
  /**
   * value - used for purpose of displaying option
   */
  value: string;
}

interface AutoCompleteMeta {
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

export interface AutoCompleteProps {
  name: string;
  label: string;
  options: Array<CustomOption>;
  /**
   * @default null
   */
  value?: CustomOption | null;
  defaultValue?: CustomOption;
  onChange: func;
  meta?: AutoCompleteMeta;
  extraAttributes?: Array<Object>;
}
