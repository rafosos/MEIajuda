import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BemVindo from './pages/BemVindo/bemVindo';
import Home from './pages/Home/home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
  return(
    <Stack.Navigator 
      initialRouteName='BemVindo'
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="BemVindo" component={BemVindo} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}