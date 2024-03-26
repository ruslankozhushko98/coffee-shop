import React, { FC } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          label={t('fields:email:label')}
          variant="underlined"
          placeholder={t('fields:email:placeholder')}
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="password"
          label={t('fields:password:label')}
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder={t('fields:password:placeholder')}
          type="password"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="firstName"
          label={t('fields:firstName:label')}
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder={t('fields:firstName:placeholder')}
          type="text"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="lastName"
          label={t('fields:lastName:label')}
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder={t('fields:lastName:placeholder')}
          type="text"
          errorVisible={!isKeyboardOpened}
        />

        <SelectField
          name="gender"
          label={t('fields:gender:label')}
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder={t('fields:gender:placeholder')}
          errorVisible={!isKeyboardOpened}
        >
          <Select.Item label={t('genders:male')} value={GENDER.MALE} />
          <Select.Item label={t('genders:female')} value={GENDER.FEMALE} />
          <Select.Item label={t('genders:other')} value={GENDER.OTHER} />
        </SelectField>

        <FormControlWrapper
          label={t('fields:dob:label')}
          labelProps={{ pt: 3 }}
          errorMessage={errors.dob}
          errorVisible={!isKeyboardOpened}
        >
          {/* <DatePickerContainer>
            <DatePickerLabel>{t(labelKey)}</DatePickerLabel>
            <DatePickerButtonContainer>
              <DatePickerButton
                onPress={() => setShowDatePicker(!showDatePicker)}
              >
                <DatePickerButtonText>
                  {selectedDate
                    ? moment(selectedDate).format('L')
                    : t(datePlaceholderKey)}
                </DatePickerButtonText>
                <DatePickerButtonImage source={Calendar} />
              </DatePickerButton>
            </DatePickerButtonContainer>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={dayjs(values.dob).toDate()}
                onChange={handleChangeDOB}
                maximumDate={new Date()}
                style={styles.dateTimePicker}
              />
            )}
          </DatePickerContainer> */}
          <DateTimePicker
            mode="date"
            display="inline"
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
            {t('links:signUp')}
          </Text>
        </Button>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};
