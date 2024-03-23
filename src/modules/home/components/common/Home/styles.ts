import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  coffeeIcon: {
    alignSelf: 'center',
  },
});
