import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, makeStyles, useTheme, Card, Input} from 'react-native-elements';
import CloudIcon from 'react-native-vector-icons/FontAwesome5';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors!.white,
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
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleText: {
    top: 5,
    marginLeft: 20,
  },
}));

const ModalExample: React.FunctionComponent<{}> = () => {
  const {theme} = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <Card containerStyle={styles.card}>
        <View style={styles.title}>
          <CloudIcon
            name="cloudversify"
            color={theme.colors!.primary}
            size={40}
          />
          <Card.Title style={styles.titleText}>Login</Card.Title>
        </View>
        <Card.Divider />

        <Input
          placeholder="Username or Email"
          leftIcon={{type: 'font-awesome', name: 'user-circle'}}
        />
        <Input
          placeholder="Password"
          leftIcon={{type: 'feather', name: 'lock'}}
        />
        <Button title="Click me" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModalExample;
