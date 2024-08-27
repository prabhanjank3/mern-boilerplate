// DynamicForm.types.ts
import { CustomOption } from './autocomplete';
import { Option } from './select';
export type GridConfig = {
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
};

export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'select'
  | 'date'
  | 'time'
  | 'file';

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: CustomOption[] | Option[]; // For select fields
  grid?: GridConfig;
};

export type FormConfig = {
  fields: FieldConfig[];
};
