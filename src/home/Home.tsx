import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput, Image, FlatList, ActivityIndicator, Button, Dimensions } from 'react-native';
import ListViewIcon from '../Assets/ListViewIcon';
import GridViewIcon from '../Assets/GridViewIcon';
import HomeGrid from './Components/HomeGrid'
import SearchIcon from '../Assets/SearchIcon';
import HomeRow from './Components/HomeRow';
import { RootStackScreenProps } from '../Navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hook';

type Product = {
  item: any,
  id: number
};



export type HomeParams = undefined;

const Home = ({navigation} : RootStackScreenProps<'Home'>) => {
  const [dataProduct, setDataProduct] = useState<Product[] | null>(null);
  const [grid, setGrid] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const coin = useAppSelector(state => state.coin.coin.toFixed(0));

  const getData = async () =>{
    const response = await fetch("https://fakestoreapi.com/products");
    const productResponse = await response.json();
    setDataProduct(productResponse);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <SearchIcon style={styles.imageIcon}/>
          <TextInput placeholder="Search Product.." style={styles.input}></TextInput>
        </View>

        <View>
          <TouchableOpacity onPress={() =>{
            navigation.navigate('MyProducts')
          }}>
            <View style={styles.myProductsButton}>
              <Text style={styles.productsButtonText}>My Products</Text>
              <Image
                style={styles.arrowProductsButton}
                source={require('../Assets/rightArrow.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.coins}>
          <Text style={styles.coinValue}>{coin}</Text>
          <Text style={styles.coinsText}>My coins</Text>
        </View>
      </View>

      <View style={styles.contentBackground}>
        <View style={styles.contentOverall}>
          <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentText}>Available Products</Text>
                {
                  grid ? 
                  (
                    <TouchableOpacity onPress={() => setGrid(false)}>
                      <GridViewIcon style={styles.gridView}/>
                    </TouchableOpacity>
                  ) : 
                  (
                    <TouchableOpacity onPress={() => setGrid(true)}>
                      <ListViewIcon style={styles.listView}/>
                    </TouchableOpacity>
                  )
                }
              </View>
              {
                !!dataProduct ? (
                <ScrollView>
                  <View>
                    {
                      grid ? (
                        <View style={styles.sepererate}>
                          <FlatList 
                          data = {dataProduct}
                          renderItem={({item}) => (
                            <TouchableOpacity onPress={() =>{
                              navigation.navigate('Desc', {
                                id: item.id
                              })
                            }}
                            >
                              <HomeGrid item={item}/>
                            </TouchableOpacity>
                          )}
                          numColumns={2}
                          />
                        </View>
                      ) 
                      
                      : 
                      
                      (
                      <FlatList
                      data = {dataProduct}
                      renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                          navigation.navigate('Desc', {
                            id: item.id
                          });
                        }}>
                          <HomeRow item={item}/>
                        </TouchableOpacity>
                      )}
                      />)
                    }
                  </View>
                </ScrollView>
                ):(
                  <View style={styles.loadingScreen}>
                    <ActivityIndicator size={"large"}/>
                  </View>
                )
                }
          </View>
        </View>
        <TouchableOpacity style={styles.eggContainer} onPress={() => {
          navigation.navigate('Minigame')
        }}>
            <Image source={require('../Assets/egg-full.png')} style={styles.egg}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
    height: 145,
    backgroundColor: 'rgb(149, 118, 181)'
  },

  imageIcon:{
    position: 'absolute',
    left: 36,
    top: 30,
    zIndex: 1000,
  },

  input:{
    marginTop: 20,
    marginLeft: 20,
    paddingLeft: 50,
    height: 40,
    width: 350,
    borderRadius: 5,
    backgroundColor: 'white'
  },

  myProductsButton:{
    flexDirection: 'row',
    height: 45,
    width: 130,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  productsButtonText:{
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },

  arrowProductsButton:{
    width: 10,
    height: 20,
    left: 10
  },

  coins:{
    height: 75,
    width: 110,
    backgroundColor: 'white',
    position: 'absolute',
    right: 23,
    top: 80,
    paddingTop: 7,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000
  },

  coinValue:{
    color: 'rgb(121, 0, 227)',
    textAlign: 'right',
    right: 18,
    fontSize: 32,
    fontWeight: '900'
  },

  coinsText:{
    textAlign: 'right',
    fontSize: 16,
    right: 20,
    bottom: 7
  },

  contentBackground:{
    backgroundColor: 'rgb(149, 118, 181)',
    zIndex: -1
  },

  contentOverall:{
    backgroundColor: 'white',
    height: 800
  },

  content:{
    height: 450,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    overflow: 'scroll',
  },

  contentHeader:{
    flexDirection: 'column',
    alignItems: 'center',
    top: 1
  },

  contentText:{
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    right: 65,
    top: 30
  },

  gridView:{
    left: 140,
    top: 1,
  },

  listView:{
    left: 140,
    top: 1,
  },

  loadingScreen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  eggContainer:{
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginLeft: 300,
    marginTop: 475,
    position: 'absolute'
  },

  egg:{
    width:25,
    height: 30,
    left: 17,
    top: 15
  },

  dummy:{
    backgroundColor: 'black',
    width: 100,
    height: 100,
    zIndex: 1000
  },

  sepererate:{
    right: 13,
    height: 350
  }
});

export default Home;