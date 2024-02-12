import React, { FC, useMemo } from 'react';
import { FormControl, IInputProps, Input } from 'native-base';
import { useField } from 'formik';
import {
  IFormControlErrorMessageProps,
  IFormControlLabelProps,
  InterfaceFormControlProps,
} from 'native-base/lib/typescript/components/composites/FormControl/types';

type Props = {
  name: string;
  errorVisible?: boolean;
  label?: string;
  labelProps?: IFormControlLabelProps;
  inputProps?: IInputProps;
  formControlProps?: InterfaceFormControlProps;
  errorMessageProps?: IFormControlErrorMessageProps;
};

export const TextField: FC<Props> = ({
  name,
  errorVisible = true,
  label,
  labelProps,
  inputProps,
  formControlProps,
  errorMessageProps,
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

      <Input
        {...inputProps}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
      />

      {isError && errorVisible && (
        <FormControl.ErrorMessage {...errorMessageProps}>
          {meta.error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
