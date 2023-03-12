import {Post, PostUser} from '@spling/social-protocol';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const PostComponent = ({
  post,
  user,
  height,
}: {
  post: Post;
  user: PostUser | null;
  height: number;
}) => {
  const hoursElapsed =
    (new Date().valueOf() - new Date(post.timestamp).valueOf() * 1000) /
    (1000 * 60 * 60);
  const timeElapsedString =
    hoursElapsed > 24
      ? `${Math.round(hoursElapsed / 24)} days ago`
      : `${Math.round(hoursElapsed)} hours ago`;

  return (
    <View style={[styles.post, {height: height}]}>
      {post.media[0]?.type === 'jpeg' && (
        <Image source={{uri: post.media[0].file}} style={styles.postMedia} />
      )}

      <View style={styles.postOverlay}>
        <View style={styles.postContent}>
          <View style={styles.postContentHeader}>
            <Image
              source={{
                uri:
                  user?.avatar ||
                  'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png',
              }}
              style={styles.userProfilePicture}
            />
            <View style={styles.postCreationDetails}>
              <Text style={styles.postCreatorName}>{user?.nickname}</Text>
              <Text style={styles.postTimeElapsed}>{timeElapsedString}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postDescriptionSection}>
            <Text style={styles.postDescription}>{post.text}</Text>
            <View style={styles.hashtags}>
              {post.tags.map(hashtag => (
                <Text key={post.tags.indexOf(hashtag)} style={styles.hashtag}>
                  #{hashtag}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.postInteractions}>
          <TouchableOpacity
            style={[styles.postInteraction, styles.likeInteraction]}>
            <Image
              style={styles.likeIcon}
              source={require('../assets/liked.png')}
            />
            <Text style={styles.interactionCaption}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  postMedia: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  postOverlay: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  postContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    // width: "100%"
    flex: 8,
  },
  postContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
  },
  userProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postCreationDetails: {
    flexDirection: 'column',
    // flex: 2,
    maxWidth: 120,
    paddingHorizontal: 10,
  },
  postCreatorName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  postTimeElapsed: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  followButton: {
    backgroundColor: '#23DD91',
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  postDescriptionSection: {
    width: '100%',
  },
  postDescription: {
    color: '#fff',
  },
  hashtags: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtag: {
    color: '#fff',
    paddingRight: 20,
  },
  postInteractions: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  postInteraction: {
    // width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeInteraction: {
    paddingBottom: 40,
  },
  interactionCaption: {
    color: '#fff',
    textAlign: 'center',
  },
  likeIcon: {
    height: 20 * 1.5,
    width: 22.472 * 1.5,
    paddingBottom: 10,
  },
  reportIcon: {
    height: 20,
    width: 24.347,
  },
});

export default PostComponent;
