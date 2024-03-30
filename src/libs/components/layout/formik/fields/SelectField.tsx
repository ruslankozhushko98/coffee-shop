import React, { FC, useMemo } from 'react';
import {
  IFormControlErrorMessageProps,
  IFormControlLabelProps,
  Select,
} from 'native-base';
import { InterfaceSelectProps } from 'native-base/lib/typescript/components/primitives/Select/types';
import { useField } from 'formik';

import {
  FormControlWrapper,
  FormControlWrapperProps,
} from 'libs/components/layout/FormControlWrapper';

type SelectFieldProps = {
  name: string;
  errorVisible?: boolean;
  label?: string;
  labelProps?: IFormControlLabelProps;
  formControlProps?: FormControlWrapperProps;
  errorMessageProps?: IFormControlErrorMessageProps;
} & InterfaceSelectProps;

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  labelProps,
  formControlProps,
  children,
  ...props
}) => {
  const [field, meta] = useField(name);

  const isError: boolean = useMemo(() => {
    return meta.touched && Boolean(meta.error);
  }, [meta.error, meta.touched]);

  return (
    <FormControlWrapper
      {...formControlProps}
      label={label}
      labelProps={labelProps}
      errorVisible={isError}
      errorMessage={meta.error}
    >
      <Select
        {...props}
        defaultValue={field.value}
        onValueChange={field.onChange(name)}
      >
        {children}
      </Select>
    </FormControlWrapper>
  );
};
