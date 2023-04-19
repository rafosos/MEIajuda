import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/home';
import BemVindo from '../pages/BemVindo/bemVindo';
import Login from '../pages/Login/login';
import ConsultarCompras from '../pages/ConsultarCompras/consultarCompras';
import colors from '../variables';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack(){
    return(<>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            {/* todas as telas vão entrar aqui também */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="BemVindo" component={BemVindo} />
        </Stack.Navigator>
    </>)
}

function ConsultarStack(){
    return(<>
        <Stack.Navigator 
            initialRouteName='ConsultarCompras'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="ConsultarCompras" component={ConsultarCompras} />
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
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.darkGreen,
                },
                tabBarItemStyle: {
                    borderTopWidth: 2,
                    borderColor: colors.white
                }
            }}
        >
            <Tab.Screen
                name="app"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <AntDesign name="home" size={24} color={colors.white}/>,
                }}
                component={MainStack}
            />
            <Tab.Screen
                name="consulta"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Entypo name="magnifying-glass" size={24} color={colors.white}/>
                }}
                component={ConsultarStack}
            />
        </Tab.Navigator>
    )
}