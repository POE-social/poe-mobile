import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DisconnectButton from '../components/buttons/DisconnectButton';
import useUserStore from '../stores/useUserStore';

export default function Profile() {
  const nav = useNavigation();
  const user = useUserStore(state => state.user);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          {user ? (
            <View>
              <Pressable
                onPress={() => {
                  nav.navigate('User', {screen: 'CreateUpdateUser'});
                }}>
                <View style={styles.profileHeader}>
                  <Image
                    style={styles.profilePicture}
                    source={require('../assets/icon.png')}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.nickname}</Text>
                    <Text style={styles.userDescription}>
                      More info, like description or leaderboard stats
                    </Text>
                  </View>
                </View>
              </Pressable>

              <View style={styles.followPanel}>
                <Pressable
                  onPress={() => {
                    nav.navigate('Follow', {screen: 'Following'});
                  }}>
                  <View style={styles.followInfo}>
                    <Text style={styles.followNum}>42</Text>
                    <Text>Following</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    nav.navigate('Follow', {screen: 'Followers'});
                  }}>
                  <View style={styles.followInfo}>
                    <Text style={styles.followNum}>22</Text>
                    <Text>Followers</Text>
                  </View>
                </Pressable>
              </View>
              <Text style={styles.postTitle}>Posts</Text>
            </View>
          ) : (
            <Button
              title="Create user"
              onPress={() => {
                nav.navigate('User', {screen: 'CreateUpdateUser'});
              }}
            />
          )}
        </View>
      }
      style={styles.postGrid}
      data={user ? [...Array(13).keys()] : null}
      renderItem={({item}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 8,
          }}>
          <Image
            style={styles.imageThumbnail}
            source={require('../assets/icon.png')}
          />
        </View>
      )}
      //Setting the number of column
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<DisconnectButton />}
      ListFooterComponentStyle={{marginBottom: 16, alignItems: 'center'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flexShrink: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 12,
    opacity: 0.5,
  },
  followPanel: {
    width: 'auto',
    flexDirection: 'row',
  },
  followInfo: {
    flexDirection: 'row',
    marginRight: 32,
  },
  followNum: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 32,
  },
  postGrid: {backgroundColor: 'white', padding: 8},
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
  },
});
