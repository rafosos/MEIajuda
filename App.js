import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from './variables';
import { UserProvider, useUser } from './storage/userContext';
import { AuthStack, TabStack } from './navigation/stacks';
import Loading from './components/loading';
import { useEffect } from 'react';
import DatabaseInit from './database/databaseInit';

export default function App() {
  const db = DatabaseInit();

  useEffect(() => {
    db.openAndInitDb();
  }, []);

  return (
    <NavigationContainer>
      <UserProvider>
        <SafeAreaView style={{flex:1, backgroundColor: colors.darkGreen}}>
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
      return nome ? <TabStack /> : <AuthStack />
  }
}