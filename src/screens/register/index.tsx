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
import CloudIcon from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from '../../redux/store';
import {onSetUser} from '../../redux/actions';
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
    color: 'grey',
    top: 5,
    marginLeft: 20,
  },
}));

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'login'>;
}

type FormFields = {
  userName: string;
  userPassword: string;
  email: string;
  repeatPassword: string;
};

const defaultValues = {userName: '', userPassword: '', email: ''};
const schema = yup.object().shape({
  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Minimum 3 characters'),
  userPassword: yup
    .string()
    .required('Password is required')
    .min(5, 'Minimum 3 characters'),
  repeatPassword: yup
    .string()
    .required('Confirmation is required')
    .oneOf([yup.ref('userPassword'), null], 'Passwords must match'),
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),
});

const Register: React.FunctionComponent<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitted},
  } = useForm<FormFields>({defaultValues, resolver: yupResolver(schema)});
  const {theme} = useTheme();
  const styles = useStyles();
  const dispatch = useDispatch();
  const hasErrors = Boolean(errors.userName || errors.userPassword);

  const onSubmit = (data: FormFields) => {
    Api.send({url: '/signup', method: 'post', data})
      .then(({data}: {data: {user: User; token: string}}) => {
        const {user, token} = data;
        reset(defaultValues);
        Api.setHeaders({Authorization: `Bearer ${token}`});
        PushNotification.localNotification({
          title: 'We sent a you an email',
          message: 'Check your mail account',
          channelId: 'channel',
        });
        dispatch(onSetUser(user));
        if (user.isVerified) navigation.navigate('media' as any);
      })
      .catch(err => {
        console.log('error', err.message);
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
            <Card.Title style={styles.titleText}>Register</Card.Title>
          </View>
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Email"
                leftIcon={{type: 'font-awesome', name: 'user-circle'}}
                errorMessage={errors.email && errors.email.message}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="userName"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Username"
                leftIcon={{type: 'font-awesome', name: 'user-circle'}}
                errorMessage={errors.userName && errors.userName.message}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="userPassword"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Password"
                leftIcon={{type: 'feather', name: 'lock'}}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                errorMessage={
                  errors.userPassword && errors.userPassword.message
                }
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Repeat Password"
                leftIcon={{type: 'feather', name: 'lock'}}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                errorMessage={
                  errors.repeatPassword && errors.repeatPassword.message
                }
              />
            )}
          />
          <Button
            title="Send"
            onPress={handleSubmit(onSubmit)}
            //loading={isSubmitted && !hasErrors}
          />
        </Card>
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity>
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate('login')}>
              Already has account? Login!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
