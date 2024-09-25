import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";

type HomeRowProps ={
    item: any
}

const HomeRow = ({item} : HomeRowProps) =>{
    const [dataProduct, setDataProduct] = useState(null);

    const getData = async () =>{
        const response = await fetch(`https://fakestoreapi.com/products/${item}`);
        const productResponse = await response.json();
        console.log(productResponse);
        setDataProduct(productResponse);
    }
    
    useEffect(() => {
        getData();
    }, []);

    return(
        <View>
            {
                dataProduct ? (
                    <View style={styles.card}>
                        <Image source={{uri: `${dataProduct.image}`}} style={styles.icon} resizeMode="contain"/>
                        <View style={styles.box}>
                            <Text style={styles.productText}>{dataProduct.title}</Text>
                            <Text style={styles.cardText}>{dataProduct.price}</Text>
                        </View>
                    </View>
                ) : (
                    ''
                )
            }
        </View>
    );
}

export default HomeRow;

const styles = StyleSheet.create({
    card:{
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: 315,
        height: 80,
        left: 37,
        marginTop: 10,
        marginBottom: 5,
        elevation: 5,
        backgroundColor: 'white'
    },

    icon:{
        width: 60,
        height: 60,
        left: 15,
    },

    box:{
        left: 32,
        bottom: 8
    },

    productText:{
        height: 40,
        top: 8,
        fontSize: 11,
        fontWeight: 'bold',
        color: 'black',
        width: 210
    },

    cardText:{
        fontSize: 10,
        width: 40,
        height: 20,
        top: 10
    },

    loadingScreen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    }
})