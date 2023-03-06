import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Button,
} from 'react-native';
import useSocialProtocolStore from '../stores/useSocialProtocolStore';
import useUserStore from '../stores/useUserStore';
import {updateUser} from '../utils/updateUser';

const CreateUpdateUser = () => {
  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);
  const user = useUserStore(state => state.user);

  const [nickname, setNickname] = useState(user?.nickname ? user.nickname : '');
  const [bio, setBio] = useState(user?.bio ? user.bio : '');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.profilePicture}
          source={require('../assets/icon.png')}
        />
        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNickname}
          value={nickname}
        />
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.bioInput}
          onChangeText={setBio}
          value={bio}
          editable
          multiline
          numberOfLines={5}
          maxLength={220}
        />
        <Button
          title="Save"
          onPress={() => {
            if (user) {
              if (!socialProtocol) {
                return;
              }
              updateUser(socialProtocol, nickname, null, bio, null);
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 8,
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  bioInput: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CreateUpdateUser;
