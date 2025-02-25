import * as React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../components/tabs/HomeTab';
import SettingsTab from '../components/tabs/SettingsTab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Home2, SearchNormal, Setting} from 'iconsax-react-native';
import SearchTab from '../components/tabs/SearchTab';
import {storage_handler_init} from '../components/shared/storagehandler';
import {useAppDispatch} from '../components/shared/hooks';
import {setColorMode} from '../components/shared/redxSlice';
import {useAppTheme} from '../components/shared/appTheme';
import {color} from 'react-native-elements/dist/helpers';

const Tab = createBottomTabNavigator();

const Home = React.memo(() => {
  const deviceMode = useColorScheme();
  const dispatch = useAppDispatch();
  const theme = useAppTheme();

  const handleSetColorMode = React.useCallback(() => {
    storage_handler_init
      .getItem(storage_handler_init._app_color_mode)
      .then(data => {
        if (data == null) {
          dispatch(setColorMode(deviceMode ?? 'light'));
        } else {
          dispatch(setColorMode(JSON.parse(data).mode));
        }
      });
  }, []);

  React.useLayoutEffect(() => {
    handleSetColorMode();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.appBackground,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: theme.appBackground,
          elevation: 0,
        },
        headerTitleStyle: {
          color: theme.inverseBlack,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: props => <Home2 size="28" color={props.color} />,
          headerTitle: `What do you want to watch?`,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarIcon: props => <SearchNormal size="28" color={props.color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsTab}
        options={{
          tabBarIcon: props => <Setting size="28" color={props.color} />,
        }}
      />
    </Tab.Navigator>
  );
});

export default Home;
