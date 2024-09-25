import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../Navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import MyProductRow from './Components/MyProductRow';

export type mMyProductsParams = undefined

const MyProduct = ({route} : RootStackScreenProps<'MyProducts'>) => {
    const navigation = useNavigation();
    const product = useAppSelector(state => state.product.product)

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{
                    navigation.goBack();
                }}>
                    <Image source={require('../Assets/left-arrow.png')} style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Products</Text>
            </View>

            <View>
                <View style={styles.content}>
                    <FlatList
                    data = {product}
                    renderItem={({item}) => (
                        <MyProductRow item={item}/>
                    )}/>
                </View>
            </View>
        </View>
    )
}

export default MyProduct

const styles = StyleSheet.create({
    background:{
        backgroundColor: 'white',
        height: '100%'
    },

    header:{
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15
    },

    icon:{
        width: 20,
        height: 20
    },

    headerText:{
        fontSize: 25,
        fontWeight: 'bold',
        width: 300,
        color: 'black',
        bottom: 8,
        left: 20
    },

    content:{
        height: '100%',
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
    
      listView:{
        left: 140,
        top: 1
      },
    
      loadingScreen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
})