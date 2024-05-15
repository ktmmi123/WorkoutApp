import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    return (
        <View className="flex-1 flex justify-end">
            <StatusBar style="light"/>
            <Image className="h-full w-full absolute" source={require('../assets/images/favicon.png')}></Image>
            <LinearGradient
            colors={['transparent', '#18181b']}
            style={{width:wp(100), height:hp(70)}}
            start={{x:0.5, y:0}}
            end={{x:0.5, y:0.8}}
            className="flex justify-end pb-12 space-y-8"
            >
                <Animated.View entering={FadeInDown.delay(200).springify()}>
                    <TouchableOpacity 
                    onPress={()=> router.push('login')} style={{
                        height: hp(5),
                        width: wp(60),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFC0CB',
                        borderRadius: hp(7) / 2,
                        borderWidth: 2,
                        borderColor: '#CCCCCC',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}>
                        <Text style={{
                            fontSize: hp(3),
                            color: 'black',
                            fontWeight: 'bold',
                            letterSpacing: 2,
                        }}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200).springify()}>
                    <TouchableOpacity 
                    onPress={()=> router.push('home')} style={{
                        height: hp(5),
                        width: wp(60),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFC0CB',
                        borderRadius: hp(7) / 2,
                        borderWidth: 2,
                        borderColor: '#CCCCCC',
                        alignSelf: 'center',
                    }}>
                        <Text style={{
                            fontSize: hp(3),
                            color: 'black',
                            fontWeight: 'bold',
                            letterSpacing: 2,
                            marginBottom: 5,
                        }}>
                            Register
                        </Text>
                    </TouchableOpacity>

                </Animated.View>
            </LinearGradient>
        </View>
    )
}