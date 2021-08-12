import React from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {makeStyles, useTheme, Card} from 'react-native-elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon, IconProps} from 'react-native-elements';
import {useNavigationState} from '@react-navigation/native';
import {onSetFiles} from '../../redux/actions';
import {useSelector, useDispatch} from '../../redux/store';
import Api from '../../api';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors!.grey0,
  },
  cardContainer: {
    padding: 15,
    marginTop: 0,
    width: '100%',
    backgroundColor: theme.colors!.white,
    borderBottomColor: theme.colors!.grey0,
    borderBottomWidth: 10,
    elevation: 5,
  },
  fileButtons: {
    marginLeft: 20,
    marginRight: 20,
  },
}));

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'login'>;
}

const options: Omit<IconOptionProps, 'onPress'>[] = [
  {
    title: 'All',
    name: 'plus-square',
    color: '#f73131',
    type: 'feather',
    signature: 'all',
  },
  {
    title: 'PDF',
    name: 'file-pdf-box-outline',
    color: '#ed4256',
    type: 'material-community',
    signature: 'pdf',
  },
  {
    title: 'Videos',
    name: 'video-camera',
    color: '#6e85eb',
    type: 'font-awesome',
    signature: 'videos',
  },
  {
    title: 'Files/ZIP',
    name: 'file-zip-o',
    color: '#e6ba55',
    type: 'font-awesome',
    signature: 'files',
  },
  {
    title: 'Music',
    name: 'music',
    color: '#d166cf',
    type: 'font-awesome',
    signature: 'music',
  },
  {
    title: 'Images',
    name: 'image',
    color: '#6cebad',
    type: 'entypo',
    signature: 'images',
  },
];

interface IconOptionProps extends Omit<IconProps, 'onPress'> {
  title: string;
  signature: string;
  onPress(fileType: string): void;
}

const IconOption: React.FunctionComponent<IconOptionProps> = React.memo(
  props => {
    const {title, onPress, signature, ...rest} = props;
    const {theme} = useTheme();
    const styles = useStyles();

    const handleOnPress = () => {
      onPress(signature);
    };

    return (
      <Pressable
        onPress={handleOnPress}
        style={({pressed}) => ({
          alignItems: 'center',
          borderRadius: 14,
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: pressed ? theme.colors!.grey0 : theme.colors!.white,
        })}>
        <Icon {...rest} reverse raised containerStyle={styles.fileButtons} />
        <Text>{title}</Text>
      </Pressable>
    );
  },
);

const MediaList: React.FunctionComponent<Props> = ({navigation}) => {
  const [fileType, setFileType] = React.useState('all');
  const {files, user} = useSelector(({files, user}) => ({files, user}));
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const styles = useStyles();

  React.useEffect(() => {
    if (files === undefined)
      Api.send({url: '/userData', query: user.id}).then(({data}) => {
        dispatch(onSetFiles(data));
      });
  }, [files]);

  return (
    <View style={styles.root}>
      <View style={styles.cardContainer}>
        <ScrollView horizontal>
          {options.map((icon, i) => (
            <IconOption {...icon} key={i} onPress={setFileType} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MediaList;
