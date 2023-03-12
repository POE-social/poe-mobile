import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Feed from './screens/Feed';
import Leaderboard from './screens/Leaderboard';
import NewPost from './screens/NewPost';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import Followers from './screens/Followers';
import Following from './screens/Following';
import FollowRequests from './screens/FollowRequests';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import useAuthorization from './utils/useAuthorization';
import CreateUpdateUser from './screens/CreateUpdateUser';
import useSocialProtocolStore from './stores/useSocialProtocolStore';
import useUserStore from './stores/useUserStore';
import Settings from './screens/Settings';
import {
  FeedIcon,
  LeaderboardIcon,
  NewPostIcon,
  ProfileIcon,
  NotificationsIcon,
} from './utils/NavigatorIcons';

const FollowTab = createMaterialTopTabNavigator();
const FollowNavigator = () => (
  <FollowTab.Navigator>
    <FollowTab.Screen name="Following" component={Following} />
    <FollowTab.Screen name="Followers" component={Followers} />
  </FollowTab.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="MyProfile"
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen
      name="Follow"
      component={FollowNavigator}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen name="User" component={CreateUpdateUser} />
    <ProfileStack.Screen name="Settings" component={Settings} />
  </ProfileStack.Navigator>
);

const NotificationsStack = createStackNavigator();
const NotificationsNavigator = () => (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen
      name="NotificationsScreen"
      component={Notifications}
      options={{
        headerShown: false,
      }}
    />
    <NotificationsStack.Screen
      name="FollowRequests"
      component={FollowRequests}
      options={{
        headerShown: false,
      }}
    />
  </NotificationsStack.Navigator>
);

export default function Navigation() {
  // Authentication state for conditional rendering later on
  const {selectedAccount} = useAuthorization();
  console.log('Selected account:', selectedAccount);

  const socialProtocol = useSocialProtocolStore(state => state.socialProtocol);
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      if (!selectedAccount || !socialProtocol) {
        return;
      }
      const u = await socialProtocol.getUserByPublicKey(
        selectedAccount.publicKey,
      );
      setUser(u);
    };
    getUser();
  }, [selectedAccount, socialProtocol, setUser]);

  // Create the main navigation component
  const Tab = createBottomTabNavigator();
  const MainNavigator = (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {paddingBottom: 4, paddingTop: 4},
      }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('./assets/feed-icon-selected.png')
                  : require('./assets/feed-icon.png')
              }
              style={{width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#23DD91',
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('./assets/leaderboard-icon-selected.png')
                  : require('./assets/leaderboard-icon.png')
              }
              style={{width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#23DD91',
        }}
      />
      <Tab.Screen
        name="NewPost"
        options={{
          tabBarLabel: 'New Post',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('./assets/new-post-icon-selected.png')
                  : require('./assets/new-post-icon.png')
              }
              style={{width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#23DD91',
        }}
        component={NewPost}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('./assets/profile-icon-selected.png')
                  : require('./assets/profile-icon.png')
              }
              style={{width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#23DD91',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={
                focused
                  ? require('./assets/notifications-icon-selected.png')
                  : require('./assets/notifications-icon.png')
              }
              style={{width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#23DD91',
        }}
      />
    </Tab.Navigator>
  );

  // Create the initial login flow
  const AuthTab = createBottomTabNavigator();
  const AuthNavigator = (
    <AuthTab.Navigator>
      <AuthTab.Screen name="Login" component={Login} />
      <AuthTab.Screen name="Signup" component={Signup} />
    </AuthTab.Navigator>
  );
  if (selectedAccount) {
    return MainNavigator;
  } else {
    return <Login />;
  }
}
