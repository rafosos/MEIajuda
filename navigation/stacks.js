import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/home';
import BemVindo from '../pages/BemVindo/bemVindo';
import Login from '../pages/Login/login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack(){
    return(<>
        <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={{headerShown: false}}
        >
            {/* todas as telas vão entrar aqui também */}
            <Stack.Screen name="BemVindo" component={BemVindo} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </>)
}

export function AuthStack(){
    return (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    );
}

export function TabStack(){
    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}
        >
            <Tab.Screen 
                name="app" 
                component={MainStack}
            />
        </Tab.Navigator>
    )
}