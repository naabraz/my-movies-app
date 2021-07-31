import analytics from '@react-native-firebase/analytics';

import { firebase } from './';

jest.mock('@react-native-firebase/analytics', () =>
  jest.fn().mockReturnValue({
    logEvent: jest.fn(),
  }),
);

test('should call firebase log event', () => {
  firebase.sendEvent('event_name', { param: 'event param' });

  expect(analytics().logEvent).toHaveBeenCalledWith('event_name', {
    param: 'event param',
  });
});
