import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, signInWithEmailAndPassword } from '../firebase';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both an email and a password.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
            console.log('Navigating to home');
            router.push('/home');
            console.log('Navigation command sent');
        })
        .catch((error) => {
            console.error('Login Error', error);
            Alert.alert('Login Error', error.message);
        });
    };


    return (
        <View>
        <Image className="h-full w-full absolute" source={require('../assets/images/loginregbg.jpeg')} />

            <StatusBar style="light" />
            <TouchableOpacity onPress={() => router.push('/')}
            className="flex justify-center items-center"
            style={{
                position: 'absolute',
                top: hp(35),
                left: wp(47),
                height: hp(5.5),
                width: wp(5.5),
            }}>
                 <Icon name="home-outline" size={26} />
            </TouchableOpacity>
            <View className="h-full w-full flex justify-around pt-40 pb-10">
                <View className="flex items-center mx-4 space-y-4">
                    <View className="bg-white/5 p-5 rounded-2xl w-full"
                    style={{borderColor:'#8a817c', borderWidth:2}}>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor='#4a5759'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            required={true}
                        />
                    </View>
                    <View className="bg-white/5 p-5 rounded-2xl w-full"
                    style={{borderColor:'#8a817c', borderWidth:2}}>
                        <TextInput
                            secureTextEntry={true}
                            placeholder='Password'
                            placeholderTextColor='#4a5759'
                            value={password}
                            onChangeText={setPassword}
                            required={true}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={{
                                height: hp(5),
                                width: wp(60),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FFC0CB',
                                borderRadius: hp(7) / 2,
                                borderWidth: 2,
                                borderColor: '#4a5759',
                                alignSelf: 'center',
                                marginBottom: 20,
                            }}>
                            <Text className="text-gray-700 ">Go</Text>
                        </TouchableOpacity>
                        <View className="flex-row justify-center">
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('register')}>
                                <Text className="text-blue-500"> Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}