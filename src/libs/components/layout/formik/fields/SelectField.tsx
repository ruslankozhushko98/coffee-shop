import React, { FC, PropsWithChildren, useMemo } from 'react';
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
  selectProps?: InterfaceSelectProps;
  formControlProps?: FormControlWrapperProps;
  errorMessageProps?: IFormControlErrorMessageProps;
} & PropsWithChildren;

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  labelProps,
  selectProps,
  formControlProps,
  children,
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
        {...selectProps}
        defaultValue={field.value}
        onValueChange={field.onChange(name)}
      >
        {children}
      </Select>
    </FormControlWrapper>
  );
};
