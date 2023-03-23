import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from './variables';
import { UserProvider, useUser } from './storage/userContext';
import { AuthStack, TabStack } from './navigation/stacks';
import Loading from './components/loading';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <SafeAreaView style={{flex:1}}>
          <StatusBar backgroundColor={colors.darkGreen} style='light' />
          <Routes/>
        </SafeAreaView>
      </UserProvider>
    </NavigationContainer>
  );
}

const Routes = () => {
  const { loadingAuth, nome } = useUser();

  if(loadingAuth) {
      return <Loading />
  } else {
    console.log(nome)
      return nome ? <TabStack /> : <AuthStack />
  }
}