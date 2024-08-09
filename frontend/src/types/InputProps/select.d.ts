/* eslint-disable no-unused-vars */
interface Option {
  label: string | Element;
  value: string | React.ReactHTMLElement;
  icon?: React.ReactHTMLElement;
}

export interface SelectProps {
  name: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (name, value) => void;
  extraAttributes?: Object;
}
