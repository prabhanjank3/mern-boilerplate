/**
 *
 * FormFactory
 *
 */

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Grid, FormHelperText, Button } from '@mui/material';
import { FormConfig, FieldConfig } from 'types/InputProps/dynamicForm';
import DateFieldInput from '../Inputs/Date';
import TimeFieldInput from '../Inputs/Time';
import TextFieldInput from '../Inputs/Text';
import SelectField from '../Inputs/Dropdown';
import { Option } from 'types/InputProps/select';
import FileField from '../Inputs/File';

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: SubmitHandler<Record<string, unknown>>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Record<string, unknown>>();

  // const submitRef = useRef<HTMLButtonElement>(null);
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: controllerField }) => (
              <TextFieldInput
                {...controllerField}
                label={field.label}
                meta={{
                  isValid: errors[field.name] ? false : true,
                  messages: [errors[field.name] as string],
                }}
                extraAttributes={{ fullWidth: true }}
                onChange={(name, value) => controllerField.onChange(value)}
              />
            )}
          />
        );
      case 'email':
      case 'number':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: controllerField }) => (
              <TextFieldInput
                {...controllerField}
                label={field.label}
                meta={{
                  isValid: errors[field.name] ? false : true,
                  messages: [errors[field.name] as string],
                }}
                extraAttributes={{ type: field.type, fullWidth: true }}
                onChange={(name, value) => controllerField.onChange(value)}
              />
            )}
          />
        );
      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: controllerField }) => (
              <SelectField
                {...controllerField}
                label={field.label}
                options={field.options as Option[]}
                extraAttributes={{ fullWidth: true }}
                onChange={(name, value) => controllerField.onChange(value)}
              />
            )}
          />
        );
      case 'date':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={null}
            rules={{ required: field.required }}
            render={({ field: controllerField }) => (
              <DateFieldInput
                {...controllerField}
                label={field.label}
                onChange={(name, value) => controllerField.onChange(value)}
              />
            )}
          />
        );
      case 'time':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={null}
            rules={{ required: field.required }}
            render={({ field: { onChange, name } }) => {
              return (
                <TimeFieldInput
                  name={name}
                  label={field.label}
                  onChange={(name, value) => onChange(value)}
                />
              );
            }}
          />
        );
      case 'file':
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: controllerField }) => (
              <div>
                <FileField
                  label={field.label}
                  {...controllerField}
                  onChange={(name, value) => controllerField.onChange(value)}
                />
                {errors[field.name] && (
                  <FormHelperText
                    error
                  >{`${field.label} is required`}</FormHelperText>
                )}
              </div>
            )}
          />
        );
      default:
        return null;
    }
  };

  function handleCancel(): void {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {config.fields.map((field, index) => (
          <Grid
            key={index}
            item
            xs={12}
            lg={field.grid?.lg}
            md={field.grid?.md}
          >
            {renderField(field)}
          </Grid>
        ))}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;
