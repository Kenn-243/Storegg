import React from 'react';
import Minigame from './src/home/Minigame';
import Home from './src/home/Home';
import Desc from './src/home/Desc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/Navigation/types';
import MyProduct from './src/home/MyProduct';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Desc" component={Desc}/>
          <Stack.Screen name="Minigame" component={Minigame}/>
          <Stack.Screen name="MyProducts" component={MyProduct}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;