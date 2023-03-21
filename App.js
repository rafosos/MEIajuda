import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BemVindo from './pages/BemVindo/bemVindo';
import Home from './pages/Home/home';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from './variables';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
      >
        <Tab.Screen 
          name="app" 
          component={MainStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function MainStack(){
  return(<>
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={colors.darkGreen} style='light' />
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="BemVindo" component={BemVindo} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </SafeAreaView>
  </>)
}