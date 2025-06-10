import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './store';
import AppNavigator from './navigation/AppNavigator';
import LoadingScreen from './components/LoadingScreen';
import { initializeFirebase } from './services/firebase';
import { requestPermissions } from './utils/permissions';

const App: React.FC = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase
        await initializeFirebase();
        
        // Request necessary permissions
        await requestPermissions();
        
        // Hide splash screen
        if (Platform.OS === 'android') {
          SplashScreen.hide();
        }
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <NavigationContainer>
              <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                backgroundColor="#1e40af"
                translucent={Platform.OS === 'android'}
              />
              <AppNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
