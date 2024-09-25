import { View, Text, FlatList, ScrollView, ActivityIndicator, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../Navigation/types';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import {add, remove} from './redux/MyProductSlice';
import {plus, minus} from './redux/CoinSlicer';

export type DescParams = {
  id: number
}

const Desc = ({route} : RootStackScreenProps<'Desc'>) => {
  const [dataProduct, setDataProduct] = useState(null);
  const dispatch = useAppDispatch();
  const coin = useAppSelector(state => state.coin.coin)
  const id = route.params.id;


  const getData = async () =>{
    const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
    const productResponse = await response.json();
    console.log(productResponse);
    setDataProduct(productResponse);
  }

  useEffect(() => {
    getData();
  }, [route.params.id]);

  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      'Success!',
      `${dataProduct.title} was bought successfully! Your current balance is ${(coin - dataProduct.price).toFixed(0)}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        },
      ],
      { cancelable: false }
    );
  };

  const showErrorAlert = () => {
    Alert.alert(
      'Failed!',
      'Balance is insufficient!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    console.log('Coin value updated:', coin);
  }, [coin]);

  return (
      <ScrollView>
        {
          !!dataProduct ? (
            <View style={styles.content}>
              <View style={styles.navigator}>
                <TouchableOpacity onPress={() =>{
                  navigation.goBack();
                }}>
                  <Image source={require('../Assets/left-arrow.png')} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.title}>{dataProduct.title}</Text>
              </View>
              <Image source={{uri: `${dataProduct.image}`}} style={styles.icon} resizeMode="contain"/>
              <View style={styles.horizontalLine} />
              <Text style={styles.descTitle}>{dataProduct.title}</Text>
              <Text style={styles.descPrice}>Price</Text>
              <Text style={styles.price}>{dataProduct.price + " coins"}</Text>
              <Text style={styles.descDesc}>Description</Text>
              <Text style={styles.description}>{dataProduct.description}</Text>
              {
                coin > dataProduct.price ? (
                  <TouchableOpacity style={styles.button} onPress={() =>{
                    dispatch(minus(dataProduct.price))
                    dispatch(add(id));
                    showAlert();
                  }}>
                    <Text style={styles.buy}>Buy</Text>
                  </TouchableOpacity>
                ):(
                  <TouchableOpacity style={styles.button} onPress={() =>{
                    showErrorAlert();
                  }}>
                    <Text style={styles.buy}>Buy</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          ):(
            <View style={styles.loadingScreen}>
            <ActivityIndicator size={"large"}/>
            </View>
          )
        }
      </ScrollView>
  )
}

export default Desc

const styles = StyleSheet.create({
  content:{
    height: 930,
    backgroundColor: 'white'
  },

  navigator:{
    marginLeft: 15,
    top: 15,
    flexDirection: 'row'
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold',
    width: 300,
    color: 'black',
    bottom: 5,
    left: 20
  },

  arrow:{
    width: 20,
    height: 20,
  },

  icon:{
    width: 200,
    height: 200,
    left: 90,
    top: 30
  },

  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    top: 60,
    marginLeft: 20,
    marginRight: 20
  },

  descTitle:{
    top: 75,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
    width: 360,
    color: 'black'
  },

  descPrice:{
    left: 20,
    top: 90,
    fontSize: 18,
    fontWeight: '500',
    color: 'black'
  },

  price:{
    left: 20,
    top: 95,
    fontSize: 16,
    color: 'black'
  },

  descDesc:{
    left: 20,
    top: 110,
    fontSize: 20,
    color: 'black'
  },

  description:{
    left: 20,
    top: 115,
    width:350,
    fontSize: 16
  },

  button:{
    width: 350,
    left: 20,
    top: 150,
    backgroundColor: 'rgb(149, 118, 181)',
    height: 50,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5
  },

  buy:{
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    left: 150,
    top: 10
  },

  loadingScreen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350
  }
})