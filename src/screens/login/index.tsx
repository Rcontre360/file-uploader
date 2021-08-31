import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Button,
  makeStyles,
  useTheme,
  Card,
  Input,
  Text,
} from 'react-native-elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CloudIcon from 'react-native-vector-icons/FontAwesome5';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {onSetUser} from '../../redux/actions';
import {useDispatch} from '../../redux/store';
import Api from '../../api';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors!.grey0,
  },
  animation: {
    position: 'absolute',
    top: 20,
    color: 'red',
    backgroundColor: 'blue',
    borderColor: 'black',
    borderWidth: 10,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors!.white,
  },
  cardContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 50,
    width: '70%',
  },
  loginText: {
    color: theme.colors!.primary,
    textAlign: 'right',
  },
  title: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleText: {
    top: 5,
    marginLeft: 20,
  },
}));

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'login'>;
}

type FormFields = {email: string; password: string};

const defaultValues = {email: '', password: ''};
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Username is required')
    .email('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'Minimum 3 characters'),
});

const ModalExample: React.FunctionComponent<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitted},
  } = useForm<FormFields>({defaultValues, resolver: yupResolver(schema)});
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const styles = useStyles();
  const hasErrors = Boolean(errors.email || errors.password);

  const onSubmit = (data: FormFields) => {
    Api.send({url: '/login', method: 'post', data})
      .then(({data}: {data: {user: User; token: string}}) => {
        const {user, token} = data;
        reset(defaultValues);
        dispatch(onSetUser(user));
        Api.setHeaders({Authorization: `Bearer ${token}`});
        if (user.isVerified) navigation.navigate('media');
      })
      .catch(err => {
        console.log('there was an error', err);
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <View style={styles.title}>
            <CloudIcon
              name="cloudversify"
              color={theme.colors!.primary}
              size={40}
            />
            <Card.Title style={styles.titleText}>Login</Card.Title>
          </View>

          <Controller
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Username or Email"
                leftIcon={{type: 'font-awesome', name: 'user-circle'}}
                errorMessage={errors.email && errors.email.message}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Password"
                leftIcon={{type: 'feather', name: 'lock'}}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password && errors.password.message}
              />
            )}
          />
          <Button
            title="Send"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitted && !hasErrors}
          />
        </Card>
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity>
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate('register')}>
              New account? Register!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalExample;
