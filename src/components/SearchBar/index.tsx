import React from 'react';
import {Icon, makeStyles} from 'react-native-elements';
import {TextInput, View, TextInputProps} from 'react-native';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors!.white,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 0,
    borderWidth: 2,
    borderColor: theme.colors!.grey1,
  },
  input: {
    borderBottomColor: theme.colors!.grey1,
    borderBottomWidth: 1,
    fontSize: 20,
    padding: 5,
    flex: 1,
  },
}));

interface Props extends TextInputProps {}

const SearchBar: React.FunctionComponent<Props> = props => {
  const styles = useStyles();
  return (
    <View style={{...styles.root, ...props.style}}>
      <Icon type="evilicons" name="search" />
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default React.memo(SearchBar);
