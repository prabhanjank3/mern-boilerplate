/**
 *
 * Apple
 *
 */
import * as React from 'react';
import DynamicForm from '../Universals/FormFactory';
import { formConfig } from '../Universals/FormFactory/config/testConfig';

export function Apple() {
  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log('Form Data:', data);
  };
  return (
    <div>
      <DynamicForm config={formConfig} onSubmit={handleFormSubmit} />
    </div>
  );
}
