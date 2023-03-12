import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import useSocialProtocolStore from '../stores/useSocialProtocolStore';
import {FileUriData} from '@spling/social-protocol';
import SelectDropdown from 'react-native-select-dropdown';
import {createPost} from '../utils/createPost';
import {useConnection} from '@solana/wallet-adapter-react';

export default function NewPost() {
  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);
  const {connection} = useConnection();

  // const groupNumber = 583646566156683917;

  const [path, setPath] = useState<Path | null>(null);
  const paths: Path[] = ['warrior', 'sage', 'nurturer', 'chef', 'traveler'];

  const [photo, setPhoto] = useState<Asset | null>(null);

  const [caption, setCaption] = useState('');

  const [uploading, setUploading] = useState(false);

  // const toggleLogin = useAuthStore(state => state.toggle);

  // Select the photo
  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      console.log('Image Picker Response: ', response);
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  // Upload the photo
  const uploadPost = async () => {
    if (!path || !photo) {
      return;
    }
    if (!photo.uri || !photo.type || !photo.fileSize) {
      return;
    }
    setUploading(true);
    const uri = photo.uri;

    const formattedUri =
      Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const fileDataValue: FileUriData = {
      uri: formattedUri,
      type: photo.type,
      size: photo.fileSize,
    };

    try {
      // await socialProtocol?.createPost(
      //   groupNumber,
      //   null,
      //   caption,
      //   [fileDataValue],
      //   path,
      // );
      if (!socialProtocol) {
        return;
      }
      await createPost(
        socialProtocol,
        connection,
        null,
        caption,
        [fileDataValue],
        path,
        null,
      );
    } catch (error) {
      console.log('There was an error creating a post with splinglabs');
      console.log('Error details:');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return uploading ? (
    <View style={styles.container}>
      <Text style={styles.header}>New post</Text>
      <Text>Uploading</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New post</Text>
      <View>
        {photo && (
          <Image source={{uri: photo.uri}} style={styles.imagePreview} />
        )}
        <Text style={styles.subheader}>Select photo</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleChoosePhoto()}>
          <Text style={styles.buttonText}>
            {photo ? 'Replace photo' : 'Select photo'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.subheader}>Select path</Text>
        <SelectDropdown
          data={paths}
          onSelect={(selectedItem: Path, _index) => {
            if (paths.find(skillPath => skillPath === selectedItem)) {
              setPath(selectedItem);
            }
          }}
        />
      </View>
      <View>
        <Text style={styles.subheader}>Post caption</Text>
        <TextInput
          onChangeText={setCaption}
          value={caption}
          style={styles.captionInput}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => uploadPost()}
          style={[styles.button, styles.mainButton]}>
          <Text style={styles.buttonText}>Upload post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    margin: 20,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    margin: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  imagePreview: {
    width: 300,
    height: 300,
    margin: 20,
  },
  captionInput: {
    width: 250,
    borderColor: '#000000',
    color: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 45,
    width: 250,
    borderRadius: 10,
  },
  mainButton: {
    margin: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 250,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

type Path = 'warrior' | 'sage' | 'nurturer' | 'chef' | 'traveler';
