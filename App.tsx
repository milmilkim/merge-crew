import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const { width: SCREEN_WIDTH, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();



const theme = {
  colors: {
    background: '#0A0B26',
    point: '#D2FD50',
    primary: '#8589FE',
  },
};

const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: theme.colors.point,
  tabBarInactiveTintColor: theme.colors.primary,
};



const iconMap: { [route: string]: { focused: string, unfocused: string } } = {
  'Home': {
    focused: 'md-home-sharp',
    unfocused: 'md-home-outline'
  },
  'About': {
    focused: 'ios-list-outline',
    unfocused: 'ios-list'
  }
}


function getIconName(routeName: string, focused: boolean) {
  return focused ? iconMap[routeName]?.focused : iconMap[routeName]?.unfocused;
}


export default function App() {
  const [fontsLoaded] = useFonts({
    galmuri: require('./assets/fonts/Galmuri11.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = getIconName(route.name, focused)

              // You can return any component that you like here!
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            ...tabScreenOptions
          })}>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='About' component={Home} />
        </Tab.Navigator>
      </View>
      <StatusBar style='inverted' />
    </NavigationContainer>
  );
}

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MERGE CREW!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'galmuri',
    textAlign: 'center',
    color: theme.colors.point,
    fontSize: 32,
  },
});
