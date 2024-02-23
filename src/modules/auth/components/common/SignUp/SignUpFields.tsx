import React, { FC } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Button, Select, Text } from 'native-base';
import { useFormikContext } from 'formik';
import dayjs from 'dayjs';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { SelectField, TextField } from 'libs/components/layout/formik/fields';
import { FormControlWrapper } from 'libs/components/layout/FormControlWrapper';
import { SignUpDto } from 'modules/auth/utils/types';
import { GENDER } from 'modules/auth/utils/constants';
import { AuthLayout } from 'modules/auth/components/layout/AuthLayout';

import { styles } from './styles';

export const SignUpFields: FC = () => {
  const isKeyboardOpened = useKeyboardOpened();
  const {
    handleSubmit,
    isSubmitting,
    errors,
    values,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext<SignUpDto>();

  const handleChangeDOB = (e: DateTimePickerEvent, date?: Date): void => {
    setFieldTouched('dob', true);
    setFieldValue('dob', date);
  };

  return (
    <KeyboardAwareScrollView>
      <AuthLayout>
        <TextField
          name="email"
          label="Email"
          variant="underlined"
          placeholder="Enter your email"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="password"
          label="Password"
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder="Enter your password"
          type="password"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="firstName"
          label="First name"
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder="Enter your first name"
          type="text"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="lastName"
          label="Last name"
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder="Enter your last name"
          type="text"
          errorVisible={!isKeyboardOpened}
        />

        <SelectField
          name="gender"
          label="Gender"
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder="Choose your gender"
          errorVisible={!isKeyboardOpened}
        >
          <Select.Item label={GENDER.MALE} value={GENDER.MALE} />
          <Select.Item label={GENDER.FEMALE} value={GENDER.FEMALE} />
          <Select.Item label={GENDER.OTHER} value={GENDER.OTHER} />
        </SelectField>

        <FormControlWrapper
          label="Date of birth"
          labelProps={{ pt: 3 }}
          errorMessage={errors.dob}
          errorVisible={!isKeyboardOpened}
        >
          <DateTimePicker
            mode="date"
            value={dayjs(values.dob).toDate()}
            onChange={handleChangeDOB}
            maximumDate={new Date()}
            style={styles.dateTimePicker}
          />
        </FormControlWrapper>

        <Button
          mt={4}
          shadow={2}
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Text fontSize="md" fontWeight="bold" color="blueGray.200">
            Sign up
          </Text>
        </Button>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};
