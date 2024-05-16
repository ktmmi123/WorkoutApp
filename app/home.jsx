import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCar from '../components/ImageCar';
import MuscleCat from '../components/MuscleCat';
import { signOut } from 'firebase/auth';
import { auth, getProfileImage } from '../firebase';



export default function Home() {

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const router = useRouter();

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User logged out');
            router.push('/');
        }).catch((error) => {
            console.error('Logout failed', error);
            Alert.alert('Logout Failed', 'Unable to log out at this time.');
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white fle space-y-5" edges={['top']}>
            <StatusBar style="dark" />

            <View className="flex-row justify-between items-center mx-5">
                <View className="space-y-2">
                    <Text style={{ fontSize: hp(3) }}
                        className="font-bold tracking-wider text-neutral-700">
                        Welcome back,
                    </Text>
                    <Text style={{ fontSize: hp(3) }}
                        className="font-bold tracking-wider text-pink-700">
                        Jane Doe
                    </Text>
                </View>
                <View className="flex justify-center items-center space-y-2">
                    <View className="flex justify-center items-center space-y-2">
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Image source={require('../assets/images/profile.jpeg')}
                                style={{ height: hp(7), width: hp(7) }}
                                className="rounded-full" />
                        </TouchableOpacity>
                        {dropdownVisible && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity onPress={() => router.push('account')} >
                                    <Text style={styles.dropdownText}>Account</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('favourites')} >
                                    <Text style={styles.dropdownText}>Favourites</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout}>
                                    <Text style={styles.dropdownText}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>




                    <View className=" flex justify-center items-center"
                        style={{ height: hp(5.5), width: hp(5.5) }}>
                        <Icon name="notifications-circle-outline" size={40} />
                    </View>
                </View>
            </View>

            <View>
                <ImageCar />
            </View>

            <View className="flex-1">
                <MuscleCat />
            </View>


        </SafeAreaView>
    );



}

const styles = StyleSheet.create({

    dropdown: {
        position: 'absolute',
        width: '180%',
        top: hp(0),
        right: hp(7.5),
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    dropdownText: {
        padding: 7,
        fontSize: 16,
    }
});