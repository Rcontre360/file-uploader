import React from 'react';
import {ThemeProvider, useTheme} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import Header from './components/Header';
import MediaList from './screens/media_list';
import Login from './screens/login';
import Register from './screens/register';
import appTheme from './config/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ModalExample: React.FunctionComponent<{}> = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <ThemeProvider theme={appTheme(theme)}>
          <Header />
          <Stack.Navigator>
            <Stack.Screen
              name="register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="media"
              component={MediaList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default ModalExample;
