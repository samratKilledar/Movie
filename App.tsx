import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import StartApp from './src/StartApp';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  LogBox.ignoreAllLogs();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
        {!isConnected && (
          <View style={styles.networkStrip}>
            <Text style={styles.networkText}>Please turn on your data connection.</Text>
          </View>
        )}
        <StartApp />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  networkStrip: {
    width: '100%',
    height: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  networkText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
