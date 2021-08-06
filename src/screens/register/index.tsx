import React from 'react';
import {View} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, makeStyles, useTheme, Card, Input} from 'react-native-elements';
import CloudIcon from 'react-native-vector-icons/FontAwesome5';
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
    width: '70%',
    bottom: 50,
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

type FormFields = {username: string; password: string; email: string};
const defaultValues = {username: '', password: '', email: ''};

const Register: React.FunctionComponent<{}> = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitted},
  } = useForm<FormFields>({defaultValues});
  const {theme} = useTheme();
  const styles = useStyles();

  const onSubmit = () => {
    Api.send({url: 'success'})
      .then(res => {
        reset(defaultValues);
      })
      .catch(() => {});
  };

  return (
    <View style={styles.root}>
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
          rules={{
            required: 'Name or email is required',
            minLength: {
              value: 3,
              message: 'Name or email must be at least 3 characters long',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Email"
              leftIcon={{type: 'font-awesome', name: 'user-circle'}}
              errorMessage={errors.username && errors.username.message}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Your username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Username"
              leftIcon={{type: 'font-awesome', name: 'user-circle'}}
              errorMessage={errors.username && errors.username.message}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters long',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Password"
              leftIcon={{type: 'feather', name: 'lock'}}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Button
          title="Send"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitted}
        />
      </Card>
    </View>
  );
};

export default Register;
