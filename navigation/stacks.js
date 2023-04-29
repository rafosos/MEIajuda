import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import ConsultarCompras from '../pages/ConsultarCompras/consultarCompras';
import colors from '../variables';
import AdicionarCompra from '../pages/AdicionarCompra/adicionarCompra';
import AlterarNome from '../pages/AlterarNome/alterarNome';
import AdicionarProduto from '../pages/AdicionarProduto/adicionarProduto';
import MeusProdutos from '../pages/MeusProdutos/meusProdutos';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptionsPadrao = {
    headerShown: true,
    headerStyle: {
        backgroundColor: colors.darkGreen,
    },
    headerTintColor: colors.white,
    headerShadowVisible: false
}

function MainStack(){
    return(<>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen 
                name="AlterarNome" 
                component={AlterarNome}
                options={{...headerOptionsPadrao,
                    title: "Configurações"
                }}
            />
            {telasProdutosStack()}
            {telasConsultarStack()}
        </Stack.Navigator>
    </>)
}


function ConsultarStack(){
    return(<>
        <Stack.Navigator 
            initialRouteName='ConsultarCompras'
            screenOptions={{headerShown: false}}
        >
            {telasConsultarStack()}
        </Stack.Navigator>
    </>)
}
const telasConsultarStack = () => <>
    <Stack.Screen name="ConsultarCompras" component={ConsultarCompras} />
    <Stack.Screen name="AdicionarCompra" 
        component={AdicionarCompra} 
        options={{...headerOptionsPadrao,
            title: "Adicionar compra"
        }}
    />
</>


function ProdutosStack(){
    return(<>
        <Stack.Navigator 
            initialRouteName='MeusProdutos'
            screenOptions={{headerShown: false}}
        >
            {telasProdutosStack()}
        </Stack.Navigator>
    </>)
}
const telasProdutosStack = () =><>
    <Stack.Screen name="MeusProdutos" component={MeusProdutos} />
    <Stack.Screen name="AdicionarProduto"
        component={AdicionarProduto} 
        options={{...headerOptionsPadrao,
            title: "Adicionar produto"
        }}
    />
</>


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
            <Tab.Screen name="app"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <AntDesign name="home" size={24} color={colors.white}/>,
                }}
                component={MainStack}
            />
            <Tab.Screen name="consulta"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Entypo name="magnifying-glass" size={24} color={colors.white}/>
                }}
                component={ConsultarStack}
            />
            <Tab.Screen name="produtos"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Entypo name="menu" size={24} color={colors.white}/>
                }}
                component={ProdutosStack}
            />
        </Tab.Navigator>
    )
}