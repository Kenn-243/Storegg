import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

type HomeRowProps ={
    item: any
}

const HomeRow = ({item} : HomeRowProps) =>{
    return(
            <View style={styles.card}>
                <Image source={{uri: `${item.image}`}} style={styles.icon} resizeMode="contain"/>
                <View style={styles.box}>
                    <Text style={styles.productText}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.price}</Text>
                </View>
            </View>
    );
}

export default HomeRow;

const styles = StyleSheet.create({
    card:{
        borderRadius: 5,
        alignItems: 'center',
        width: 145,
        height: 150,
        left: 37,
        marginTop: 10,
        marginBottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        textAlign: 'left',
        paddingTop: 10,
        marginLeft: 15
    },

    icon:{
        width: 60,
        height: 60,
        marginRight: 60
    },

    box:{
        left: 32,
        bottom: 8
    },

    productText:{
        height: 40,
        marginTop: 10,
        top: 8,
        fontSize: 11,
        fontWeight: 'bold',
        color: 'black',
        width: 130,
        right: 29
    },

    cardText:{
        fontSize: 10,
        width: 40,
        height: 20,
        top: 10,
        right: 30
    }
})