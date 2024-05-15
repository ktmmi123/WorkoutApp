import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCar from '../components/ImageCar';
import MuscleCat from '../components/MuscleCat';



export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']}>
            <StatusBar style='dark'/>

            <View className="flex-row justify-between item-center mx-5">
                <View className="space-y-2">
                    <Text
                    style={{fontSize:hp(4.5)}}
                    className="font-bold tracking-wider text-neutral-700">READY TO</Text>
                    <Text
                    style={{fontSize:hp(4.5)}}
                    className="font-bold tracking-wider text-rose-500">WORKOUT</Text>
                </View>
                <View className="flex justify-center items-center space-y-2">
                    <Image source={require('../assets/images/splash.png')}
                        style={{height: hp(6), width: hp(6)}}
                        className="rounded-full"/>
                        <View className="bg-white rounded-full flex justify-center items-center">
                        <Icon name="notifications-circle-outline" size={40} />

                        </View>

                        

                </View>
               
            </View>
            <View>
                    <ImageCar/>
                </View>

            <View className="flex-1">
                <MuscleCat/>
            </View>
        </SafeAreaView>

       
    )
}