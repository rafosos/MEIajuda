import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import ConsultarCompras from '../pages/ConsultarCompras/consultarCompras';
import colors from '../variables';
import AdicionarCompra from '../pages/AdicionarCompra/adicionarCompra';
import Configuracoes from '../pages/Configuracoes/configuracoes';
import AdicionarProduto from '../pages/AdicionarProduto/adicionarProduto';
import MeusProdutos from '../pages/MeusProdutos/meusProdutos';
import AdicionarVenda from '../pages/AdicionarVenda/adicionarVenda';
import ConsultarVendas from '../pages/ConsultarVenda/consultarVenda';

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
                name="Configuracoes" 
                component={Configuracoes}
                options={{...headerOptionsPadrao,
                    title: "Configurações"
                }}
            />
            {telasProdutosStack()}
            {telasConsultarStack()}
            {telasVendasStack()}
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

function VendasStack(){
    return(
        <Stack.Navigator
            initialRouteName='ConsultarVendas'
            screenOptions={{headerShown: false}}
        >
            {telasVendasStack()}
        </Stack.Navigator>
    )
}
const telasVendasStack = () => <>
    <Stack.Screen name="ConsultarVendas" component={ConsultarVendas}/>
    <Stack.Screen name="AdicionarVenda"
        component={AdicionarVenda}
        options={{...headerOptionsPadrao,
            title: "Adicionar venda"
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
                tabBarActiveBackgroundColor: colors.notSoDarkGreen,
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
                    tabBarIcon: () => <FontAwesome5 name="home" size={24} color={colors.white}/>,
                }}
                component={MainStack}
            />
            <Tab.Screen name="compra"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <FontAwesome5 name="shopping-cart" size={24} color={colors.white} />,
                    unmountOnBlur: true
                }}
                component={ConsultarStack}
            />
            <Tab.Screen name="produtos"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <AntDesign name="tags" size={28} color={colors.white}/>,
                    unmountOnBlur: true
                }}
                component={ProdutosStack}
            />

            <Tab.Screen name="vendas"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <FontAwesome5 name="hand-holding-usd" size={24} color={colors.white} />,
                    unmountOnBlur: true
                }}
                component={VendasStack}
            />

        </Tab.Navigator>
    )
}