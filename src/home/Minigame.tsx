import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../Navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import {plus, minus} from './redux/CoinSlicer';

export type MinigameParams = undefined

const Minigame = ({route} : RootStackScreenProps<'Minigame'>) => {
    const [press, setPress] = useState(false)
    const [prize, setPrize] = useState<number | null>(null);
    const coin = useAppSelector(state => state.coin.coin);
    const dispatch = useAppDispatch();

    const generateRandomPrize = () => {
        const random = Math.random();
        let newPrice;

        if (random < 0.33) {
            newPrice = 100;
            dispatch(plus(100));
        } else if (random < 0.66) {
            newPrice = 50;
            dispatch(plus(50));
        } else {
            newPrice = 20;
            dispatch(plus(20));
        }

        setPrize(newPrice);
    };

    const handleRandomPress = () => {
        generateRandomPrize();
    };

    const handleEggPress = () => {
        setPress(true);
        handleRandomPress();
    }

    const handleFalseEggPress = () => {
        setPress(false);
    }

    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{
                    handleFalseEggPress;
                    navigation.goBack();
                }}>
                    <Image source={require('../Assets/left-arrow.png')} style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Minigame</Text>
            </View>

            <View style={styles.coinBar}>
                <View style={styles.gold}>
                    <Image source={require('../Assets/gold-coin.png')} style={styles.coin}/>
                    <Text style={styles.value}>100</Text>
                </View>

                <View style={styles.silver}>
                    <Image source={require('../Assets/silver-coin.png')} style={styles.coin}/>
                    <Text style={styles.value}>50</Text>
                </View>

                <View style={styles.bronze}>
                    <Image source={require('../Assets/bronze-coin.png')} style={styles.coin}/>
                    <Text style={styles.value}>20</Text>
                </View>
            </View>

            <View>
                {
                    press ? (
                    <View style={styles.clickedEgg}>
                        <View>
                            <Text style={styles.congratulation}>Congratulations!</Text>
                            <View>{prize === 100 ?
                                (
                                <View>
                                    <Text style={styles.infoGold}>You got a gold coin!</Text>
                                    <Image style={styles.infoCoin} source={require('../Assets/gold-coin.png')}/>
                                </View>
                                )
                                : ''}
                            </View>
                            <View>{prize === 50 ? 
                                (
                                <View>
                                    <Text style={styles.infoSilver}>You got a silver coin!</Text>
                                    <Image style={styles.infoCoin} source={require('../Assets/silver-coin.png')}/>
                                </View>
                                )
                                
                                : ''}
                            </View>
                            <View>{prize === 20 ?
                                (
                                <View>
                                    <Text style={styles.infoBronze}>You got a bronze coin!</Text>
                                    <Image style={styles.infoCoin} source={require('../Assets/bronze-coin.png')}/>
                                </View>
                                )
                                
                                : ''}
                            </View>
                        </View>
                        
                        <View>
                            <Image style={styles.brokenEgg} source={require('../Assets/egg-broken.png')}/>
                        </View>

                        <View>
                            <Text style={styles.bottomTextGold}>{prize === 100 ? "100 coins have been added to your balance" : ''}</Text>
                            <Text style={styles.bottomTextSilver}>{prize === 50 ? "50 coins have been added to your balance" : ''}</Text>
                            <Text style={styles.bottomTextBronze}>{prize === 20 ? "20 coins have been added to your balance" : ''}</Text>
                        </View>
                    </View>
                    ):(
                    <TouchableOpacity style={styles.contentText} onPress={handleEggPress}>
                        <Text style={styles.command}>Click on the egg to get your</Text>
                        <Text style={styles.prize}>prize!</Text>
                        <Image source={require('../Assets/egg-full.png')} style={styles.egg}/>
                    </TouchableOpacity>)
                }
            </View>
        </View>
    );
}

export default Minigame

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

    coinBar:{
        flexDirection: 'row',
        paddingLeft: 78
    },

    gold:{
        flexDirection: 'row'
    },

    coin:{
        width: 40,
        height: 40,
    },

    value:{
        fontSize: 17,
        color: 'black',
        marginTop: 7
    },

    silver:{
        flexDirection: 'row',
        paddingLeft: 30
    },

    bronze:{
        flexDirection: 'row',
        paddingLeft: 30
    },

    contentText:{
        marginLeft: 50,
        marginTop: 120
    },

    command:{
        fontSize: 25,
        color: 'black'
    },

    prize:{
        fontSize: 25,
        marginLeft: 123,
        color: 'black'
    },

    egg:{
        marginLeft: 75,
        marginTop: 30
    },

    clickedEgg:{
        marginTop: 60,
        marginLeft: 110
    },

    congratulation:{
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
    },

    info:{
        fontSize: 21,
        color: 'black',
    },

    infoGold:{
        fontSize: 21,
        color: 'black',
        bottom: 5
    },

    infoSilver:{
        fontSize: 21,
        color: 'black',
        bottom: 5,
        right: 5
    },

    infoBronze:{
        fontSize: 21,
        color: 'black',
        bottom: 5,
        right: 10
    },

    infoCoin:{
        width: 70,
        height: 70,
        marginLeft: 55,
        marginTop: 25
    },

    brokenEgg:{
        marginLeft: 22,
        bottom: 5
    },

    bottomTextGold:{
        textAlign: 'center',
        fontSize: 20,
        right: 47,
        marginTop: 30,
        fontWeight: 'bold',
        color: 'black'
    },

    bottomTextSilver:{
        textAlign: 'center',
        fontSize: 20,
        right: 45,
        bottom: 30,
        fontWeight: 'bold',
        color: 'black'
    },

    bottomTextBronze:{
        textAlign: 'center',
        fontSize: 20,
        right: 45,
        bottom: 60,
        fontWeight: 'bold',
        color: 'black'
    }
})