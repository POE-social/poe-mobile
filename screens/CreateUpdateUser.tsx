import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Button,
  Pressable,
  Platform,
} from 'react-native';
import useSocialProtocolStore from '../stores/useSocialProtocolStore';
import useUserStore from '../stores/useUserStore';
import {updateUser} from '../utils/updateUser';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {createUser} from '../utils/createUser';
import {FileUriData} from '@spling/social-protocol';

const CreateUpdateUser = () => {
  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const [nickname, setNickname] = useState(user?.nickname ? user.nickname : '');
  const [bio, setBio] = useState(user?.bio ? user.bio : '');

  const [avatar, setAvatar] = useState<Asset | null>(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      console.log('Image Picker Response: ', response);
      if (response.assets && response.assets.length > 0) {
        setAvatar(response.assets[0]);
      }
    });
  };

  console.log('created user:', user);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            handleChoosePhoto();
          }}>
          <Image
            style={styles.profilePicture}
            source={
              avatar
                ? avatar
                : user?.avatar
                ? {uri: user.avatar}
                : require('../assets/icon.png')
            }
          />
        </Pressable>
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
          onPress={async () => {
            if (!socialProtocol) {
              return;
            }
            console.log('Avatar:', avatar);
            let fileDataValue: FileUriData | null;
            if (!avatar?.uri || !avatar?.type || !avatar?.fileSize) {
              fileDataValue = null;
            } else {
              const uri = avatar.uri;

              const formattedUri =
                Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

              fileDataValue = {
                uri: formattedUri,
                type: avatar.type,
                size: avatar.fileSize,
              };
            }

            console.log('FileDataUri:', fileDataValue);

            if (user) {
              const updatedUser = await updateUser(
                socialProtocol,
                nickname,
                fileDataValue,
                bio,
                null,
              );
              setUser(updatedUser);
            } else {
              const newUser = await createUser(
                socialProtocol,
                nickname,
                fileDataValue,
                bio,
                null,
              );
              setUser(newUser);
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
    color: 'black',
  },
  bioInput: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CreateUpdateUser;
