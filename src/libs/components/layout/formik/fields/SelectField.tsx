import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  FormControl,
  IFormControlErrorMessageProps,
  IFormControlLabelProps,
  Select,
} from 'native-base';
import { InterfaceFormControlProps } from 'native-base/lib/typescript/components/composites/FormControl/types';
import { InterfaceSelectProps } from 'native-base/lib/typescript/components/primitives/Select/types';
import { useField } from 'formik';

type SelectFieldProps = {
  name: string;
  errorVisible?: boolean;
  label?: string;
  labelProps?: IFormControlLabelProps;
  selectProps?: InterfaceSelectProps;
  formControlProps?: InterfaceFormControlProps;
  errorMessageProps?: IFormControlErrorMessageProps;
} & PropsWithChildren;

export const SelectField: FC<SelectFieldProps> = ({
  name,
  errorVisible,
  label,
  labelProps,
  selectProps,
  formControlProps,
  errorMessageProps,
  children,
}) => {
  const [field, meta] = useField(name);

  const isError: boolean = useMemo(() => {
    return meta.touched && Boolean(meta.error);
  }, [meta.error, meta.touched]);

  return (
    <FormControl {...formControlProps} isInvalid={isError}>
      {Boolean(label) && (
        <FormControl.Label {...labelProps}>{label}</FormControl.Label>
      )}

      <Select
        {...selectProps}
        defaultValue={field.value}
        onValueChange={field.onChange(name)}
      >
        {children}
      </Select>

      {isError && errorVisible && (
        <FormControl.ErrorMessage {...errorMessageProps}>
          {meta.error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
