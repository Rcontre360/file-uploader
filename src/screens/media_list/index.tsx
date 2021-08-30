import React from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import {makeStyles, useTheme, Card, Text} from 'react-native-elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon, IconProps} from 'react-native-elements';
import {useNavigationState} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
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
  body: {
    padding: 20,
    width: '100%',
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
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
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

type FileType = 'all' | 'pdf' | 'files' | 'videos' | 'images' | 'music';

interface IconOptionProps extends Omit<IconProps, 'onPress'> {
  title: string;
  signature: string;
  onPress(fileType: FileType): void;
}

const IconOption: React.FunctionComponent<IconOptionProps> = React.memo(
  props => {
    const {title, onPress, signature, ...rest} = props;
    const {theme} = useTheme();
    const styles = useStyles();

    const handleOnPress = () => {
      onPress(signature as unknown as FileType);
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

const fileTypeMap: Record<FileType, string> = {
  all: 'All',
  pdf: 'Pdf',
  videos: 'Video',
  files: 'Other',
  music: 'Music',
  images: 'Image',
};

const MediaList: React.FunctionComponent<Props> = ({navigation}) => {
  const [fileType, setFileType] = React.useState<FileType>('all');
  const {files, user} = useSelector(({files, user}) => ({files, user}));
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const styles = useStyles();
  const currentFiles = React.useMemo(
    () =>
      files
        ? files.filter(file => file.type === fileType || fileType === 'all')
        : [],
    [fileType, files],
  );

  React.useEffect(() => {
    //if (files === undefined)
    //Api.send({url: '/userData', query: user.id}).then(({data}) => {
    //console.log(data);
    //dispatch(onSetFiles(data));
    //});
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
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text
            h3
            style={{
              color: theme.colors?.primary,
            }}>{`${fileTypeMap[fileType]}`}</Text>
          <Text h3>{` files: ${currentFiles.length}`}</Text>
        </View>
        <SearchBar
          placeholder="Search"
          style={{marginTop: 10, marginBottom: 10}}
        />
        {currentFiles.map(file => (
          <Card
            wrapperStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              maxHeight: 100,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ed4256',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="file-pdf-box-outline"
                color={theme.colors?.white}
                type="material-community"
              />
            </View>
            <View style={{flex: 4, marginLeft: 10}}>
              <Text h4>{(file as any).name}</Text>
              <Text>{new Date().toString()}</Text>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default MediaList;
