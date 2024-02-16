import React, { FC, PropsWithChildren } from 'react';
import { FormControl, IFormControlLabelProps } from 'native-base';
import {
  IFormControlErrorMessageProps,
  InterfaceFormControlProps,
} from 'native-base/lib/typescript/components/composites/FormControl/types';

export type FormControlWrapperProps = {
  label?: string;
  labelProps?: IFormControlLabelProps;
  errorVisible?: boolean;
  errorMessage?: string;
  errorMessageProps?: IFormControlErrorMessageProps;
} & InterfaceFormControlProps;

export const FormControlWrapper: FC<
  FormControlWrapperProps & PropsWithChildren
> = ({
  label,
  labelProps,
  errorVisible,
  errorMessage,
  errorMessageProps,
  children,
  ...props
}) => (
  <FormControl {...props} isInvalid={errorVisible}>
    {Boolean(label) && (
      <FormControl.Label {...labelProps}>{label}</FormControl.Label>
    )}

    {children}

    {errorVisible && (
      <FormControl.ErrorMessage {...errorMessageProps}>
        {errorMessage}
      </FormControl.ErrorMessage>
    )}
  </FormControl>
);
