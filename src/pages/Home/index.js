import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';

// import MatchingPage from '../MatchingPage';
import Explore from '../Explore';
import MyCourses from '../MyCourses';
import Profile from '../Profile';
import Home from './Home';

import MatchingPage from '../MatchingPage';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  const { colors } = useTheme();
  const { role } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true} // Change to true to enable shifting behavior
      activeColor={colors.primary}
      inactiveColor="gray"
      labeled={true}
      barStyle={{ backgroundColor: colors.surface }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyCoursesTab"
        component={MyCourses}
        options={{
          tabBarLabel: 'My Courses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      {role !== 'Startupreneur' && (
        <Tab.Screen
          name="startupMatching"
          component={MatchingPage}
          options={{
            tabBarLabel: 'Matchmaking',

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="puzzle-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="ExploreTab"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
