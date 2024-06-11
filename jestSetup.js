// jestSetup.js
import 'react-native-gesture-handler/jestSetup';

// Mock for react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock for react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const ActualGestureHandler = jest.requireActual('react-native-gesture-handler');
  return {
    ...ActualGestureHandler,
    GestureHandlerRootView: ({ children }) => children,
    Swipeable: (props) => <div>{props.children}</div>,
    DrawerLayout: (props) => <div>{props.children}</div>,
  };
});
