import React, { FC, useMemo } from 'react';
import { IInputProps, Input } from 'native-base';
import { useField } from 'formik';
import { IFormControlLabelProps } from 'native-base/lib/typescript/components/composites/FormControl/types';

import {
  FormControlWrapper,
  FormControlWrapperProps,
} from 'libs/components/layout/FormControlWrapper';

type TextFieldProps = {
  name: string;
  errorVisible?: boolean;
  label?: string;
  labelProps?: IFormControlLabelProps;
  formControlProps?: FormControlWrapperProps;
} & IInputProps;

export const TextField: FC<TextFieldProps> = ({
  name,
  errorVisible = true,
  label,
  labelProps,
  formControlProps,
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
      errorVisible={isError && errorVisible}
      errorMessage={meta.error}
    >
      <Input
        {...props}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
      />
    </FormControlWrapper>
  );
};
