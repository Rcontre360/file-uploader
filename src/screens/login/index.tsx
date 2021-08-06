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
import {StackNavigationProp} from '@react-navigation/stack';
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
    width: '100%',
    backgroundColor: theme.colors!.white,
  },
  cardContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
  navigation: StackNavigationProp<RootStackParamList, 'login'>;
}

type FormFields = {username: string; password: string};
const defaultValues = {username: '', password: ''};

const ModalExample: React.FunctionComponent<Props> = ({navigation}) => {
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
            name="username"
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
                placeholder="Username or Email"
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
              required: 'Name or email is required',
              minLength: {
                value: 3,
                message: 'Name or email must be at least 3 characters long',
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
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity>
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate('register')}>
              Already has account? Login!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalExample;
