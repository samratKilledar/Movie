import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import AppNavigator from './navigation/AppNavigator';
// import SplashScreen from './screens/Main/SplashScreen';

const StartApp: React.FC = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer); // Clean up timeout
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default StartApp;
