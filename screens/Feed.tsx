import {Order_By, Post} from '@spling/social-protocol';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import PostComponent from '../components/PostComponent';
import useSocialProtocolStore from '../stores/useSocialProtocolStore';

export default function Feed() {
  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [flatListHeight, setFlatListHeight] = useState<number>(0);

  // Trigger load posts.
  useEffect(() => {
    const loadPosts = async () => {
      if (socialProtocol) {
        try {
          setLoading(true);

          const newPosts: Post[] = await socialProtocol.getAllPosts(
            37,
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
          setRefreshing(false);
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

  const onRefresh = async () => {
    setRefreshing(true);
    setPosts([]);
    setEndOfList(false);
    setPage(1);
  };

  const renderItem = ({item}: {item: Post}) => {
    return (
      <PostComponent post={item} user={item.user} height={flatListHeight} />
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.topMenu}>
        <Text style={styles.topMenuText}>Profile</Text>
        <Text style={styles.topMenuText}>Following</Text>
        <Text style={styles.topMenuText}>Feed</Text>
        <Text style={styles.topMenuText}>Filters</Text>
      </View> */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.postId.toString()}
        onEndReached={handleLoadMorePosts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.flatList}
        contentContainerStyle={{flexGrow: 1}}
        onLayout={event => {
          setFlatListHeight(event.nativeEvent.layout.height);
        }}
      />
      {/* <Button title="Logout" onPress={() => toggleLogin()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  topMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black',
  },
  logo: {
    width: 50,
    height: 40,
  },
  topMenuText: {
    color: 'white',
  },
  flatList: {
    height: '100%',
    width: '100%',
  },
  post: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'fff',
  },
});
