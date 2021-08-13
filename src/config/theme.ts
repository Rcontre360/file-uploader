import {Theme} from 'react-native-elements';

const appTheme = (theme: Theme): Theme => ({
  colors: {
    primary: '#EF233C',
    secondary: '#8D99AE',
    grey0: '#EDF2F4',
    grey1: '#cbd1d4',
    black: '#2B2D42',
  },
  Button: {
    raised: true,
  },
  Card: {
    containerStyle: {
      elevation: 10, //android only
      //ios:
      shadowColor: 'grey',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 1,
      //end ios
    },
  },
  CardTitle: {
    h4: true,
  },
  CardDivider: {
    color: theme.colors!.grey0,
  },
});

export default appTheme;
