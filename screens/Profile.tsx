import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import useUserStore from '../stores/useUserStore';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import SkillPathStats from '../components/SkillPathStats';

import Pet from '../components/Pet';
import DisconnectButton from '../components/buttons/DisconnectButton';
import {Order_By, Post} from '@spling/social-protocol';
import useSocialProtocolStore from '../stores/useSocialProtocolStore';

export default function Profile() {
  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);

  const nav =
    useNavigation<BottomTabNavigationProp<ParamListBase, 'Profile'>>();
  const user = useUserStore(state => state.user);
  const [skillPath, setSkillPath] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);
  const [loading, setLoading] = useState(false);

  // Trigger load posts.
  useEffect(() => {
    const loadPosts = async () => {
      if (socialProtocol && user) {
        try {
          setLoading(true);

          const newPosts: Post[] = await socialProtocol.getAllPostsByUserId(
            user.userId,
            20,
            (page - 1) * 20,
            Order_By.Desc,
          );
          if (newPosts.length === 0) {
            setEndOfList(true);
          }
          setPosts([...posts, ...newPosts]);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadPosts();
  }, [socialProtocol, page]);

  const handleLoadMorePosts = () => {
    if (!loading && !endOfList) {
      setPage(page + 1);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          {user ? (
            <View>
              <View style={styles.container}>
                <View style={styles.profileHeader}>
                  <Pressable
                    onPress={() => {
                      nav.navigate('User', {screen: 'CreateUpdateUser'});
                    }}>
                    <View style={styles.profile}>
                      <Image
                        style={styles.profilePicture}
                        source={
                          user.avatar
                            ? {uri: user.avatar}
                            : require('../assets/icon.png')
                        }
                      />
                      <View style={styles.userInfo}>
                        <Text style={styles.username}>{user.nickname}</Text>
                        <Text style={styles.userDescription}>
                          Level 2 Warrior
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <Pressable
                    style={styles.settingsContainer}
                    onPress={() => {
                      nav.navigate('Settings', {screen: 'Settings'});
                    }}>
                    <Image
                      source={require('../assets/settings.png')}
                      style={styles.settingsImage}
                    />
                  </Pressable>
                </View>

                <View style={styles.followPanel}>
                  <Pressable
                    onPress={() => {
                      nav.navigate('Follow', {screen: 'Following'});
                    }}>
                    <View style={styles.followInfo}>
                      <Text style={styles.followNum}>42</Text>
                      <Text style={styles.following}>Following</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      nav.navigate('Follow', {screen: 'Followers'});
                    }}>
                    <View style={styles.followInfo}>
                      <Text style={styles.followNum}>22</Text>
                      <Text style={styles.followers}>Followers</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <Pet />
                  </View>
                </View>
                <View style={styles.skillTabs}>
                  <Pressable
                    style={[
                      styles.skillTab,
                      skillPath === 0 && styles.skillTabActive,
                    ]}
                    onPress={() => {
                      setSkillPath(0);
                    }}>
                    <Text
                      style={
                        skillPath === 0
                          ? styles.skillActive
                          : styles.skillInactive
                      }>
                      Warrior
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.skillTab,
                      skillPath === 1 && styles.skillTabActive,
                    ]}
                    onPress={() => {
                      setSkillPath(1);
                    }}>
                    <Text
                      style={
                        skillPath === 1
                          ? styles.skillActive
                          : styles.skillInactive
                      }>
                      Sage
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.skillTab,
                      skillPath === 2 && styles.skillTabActive,
                    ]}
                    onPress={() => {
                      setSkillPath(2);
                    }}>
                    <Text
                      style={
                        skillPath === 2
                          ? styles.skillActive
                          : styles.skillInactive
                      }>
                      Nuturer
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.skillTab,
                      skillPath === 3 && styles.skillTabActive,
                    ]}
                    onPress={() => {
                      setSkillPath(3);
                    }}>
                    <Text
                      style={
                        skillPath === 3
                          ? styles.skillActive
                          : styles.skillInactive
                      }>
                      Chef
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.skillTab,
                      skillPath === 4 && styles.skillTabActive,
                    ]}
                    onPress={() => {
                      setSkillPath(4);
                    }}>
                    <Text
                      style={
                        skillPath === 4
                          ? styles.skillActive
                          : styles.skillInactive
                      }>
                      Traveler
                    </Text>
                  </Pressable>
                </View>
                {skillPath === 0 && (
                  <SkillPathStats
                    skill="Warrior"
                    level={3}
                    points={700}
                    maxPoints={1500}
                  />
                )}
                {skillPath === 1 && (
                  <SkillPathStats
                    skill="Sage"
                    level={0}
                    points={20}
                    maxPoints={100}
                  />
                )}
                {skillPath === 2 && (
                  <SkillPathStats
                    skill="Nuturer"
                    level={1}
                    points={120}
                    maxPoints={400}
                  />
                )}
                {skillPath === 3 && (
                  <SkillPathStats
                    skill="Chef"
                    level={4}
                    points={950}
                    maxPoints={2000}
                  />
                )}
                {skillPath === 4 && (
                  <SkillPathStats
                    skill="Traveler"
                    level={1}
                    points={350}
                    maxPoints={400}
                  />
                )}
              </View>
              <Text style={styles.postTitle}>Posts</Text>
            </View>
          ) : (
            <View>
              <Button
                title="Create user"
                onPress={() => {
                  nav.navigate('User', {screen: 'CreateUpdateUser'});
                }}
              />
              <DisconnectButton />
            </View>
          )}
        </View>
      }
      style={styles.postGrid}
      data={user ? posts : null}
      renderItem={({item: post}) => (
        <View
          key={post.publicKey.toBase58()}
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 8,
          }}>
          {post.media[0]?.type === 'jpeg' ? (
            <Image
              source={{uri: post.media[0].file}}
              style={styles.imageThumbnail}
            />
          ) : (
            <Image
              style={styles.imageThumbnail}
              source={require('../assets/icon.png')}
            />
          )}
        </View>
      )}
      //Setting the number of column
      numColumns={3}
      onEndReached={handleLoadMorePosts}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23DD91',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 8,
    paddingBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 18,
  },
  profile: {
    flexDirection: 'row',
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: 'black',
  },
  userDescription: {
    fontSize: 12,
    opacity: 0.5,
    color: 'black',
  },
  settingsContainer: {
    justifyContent: 'center',
  },
  settingsImage: {
    width: 30,
    height: 30,
  },
  followPanel: {
    width: 'auto',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  followInfo: {
    flexDirection: 'row',
    marginRight: 32,
    color: 'black',
  },
  followNum: {
    fontWeight: 'bold',
    marginRight: 4,
    color: 'black',
  },
  following: {
    color: 'black',
  },
  followers: {
    color: 'black',
  },
  avatarWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 16,
    height: 160,
    width: 140,
    alignItems: 'center',
  },
  skillTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 4,
    marginTop: 16,
  },
  skillTab: {
    padding: 4,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
  },
  skillTabActive: {
    borderRadius: 4,
    borderColor: '#22AD74',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  skillActive: {fontWeight: 'bold', color: '#22AD74'},
  skillInactive: {
    color: 'black',
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    padding: 8,
    color: 'black',
    backgroundColor: '#fff',
  },
  postGrid: {backgroundColor: '#fff', opacity: 10, padding: 8},
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 8,
  },
});
