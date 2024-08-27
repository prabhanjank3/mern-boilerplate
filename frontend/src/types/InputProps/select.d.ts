/* eslint-disable no-unused-vars */
interface Option {
  label: string | Element;
  value: string | React.ReactHTMLElement;
  icon?: React.ReactHTMLElement;
}

export interface SelectProps {
  label?: string;
  name: string;
  options: Option[];
  value?: string | unknown;
  placeholder?: string;
  onChange: (name, value) => void;
  extraAttributes?: Object;
}
