import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCar from '../components/ImageCar';
import MuscleCat from '../components/MuscleCat';
import { signOut } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [notificationsDropdownVisible, setNotificationsDropdownVisible] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                fetchUsername(user.uid);
            } else {
                console.log("No user logged in");
                setUsername('');
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUsername = async (userId) => {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            setUsername(docSnap.data().username || '');
        } else {
            console.log("No user data found!");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
            Alert.alert('Logout Failed', 'Unable to log out at this time.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white flex space-y-3" edges={['top']}>
            <StatusBar style="dark" />

            <View className="flex-row justify-between items-center mx-5">
                <View className="space-y-2">
                    <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-neutral-700">
                        Welcome back!
                    </Text>
                    {username ? (
                        <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#C2185B' }}>
                            {username}
                        </Text>
                    ) : (
                        <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#C2185B' }}>

                        </Text>
                    )}

                </View>
                <View className="flex justify-center items-center space-y-2">
                    <TouchableOpacity onPress={() => setProfileDropdownVisible(!profileDropdownVisible)}>
                        <Image source={require('../assets/images/profile.jpeg')}
                            style={{ height: hp(7), width: hp(7) }}
                            className="rounded-full" />
                    </TouchableOpacity>
                    {profileDropdownVisible && (
                        <View style={styles.dropdown1}>
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

                    <TouchableOpacity onPress={() => setNotificationsDropdownVisible(!notificationsDropdownVisible)}>
                        <View style={styles.iconContainer}>
                            <Icon name="notifications-circle-outline" size={40} />
                        </View>
                    </TouchableOpacity>
                    {notificationsDropdownVisible && (
                        <View style={styles.dropdown2}>
                            <Text>Notification 1</Text>
                            <Text>Notification 2</Text>
                        </View>
                    )}
                </View>
            </View>


            <View style={styles.headline}>
                <Text style={styles.texthead} className="text-neutral-700">New videos!</Text>
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
    dropdown1: {
        position: 'absolute',
        width: '180%',
        top: hp(0),
        right: hp(7.2),
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    dropdown2: {
        position: 'absolute',
        width: '280%',
        top: hp(8),
        right: hp(6),
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 100,
        borderRadius: 10,
        zIndex: 1000,
        padding: 4,
    },
    dropdownText: {
        padding: 7,
        fontSize: 16,
    },
    headline: {
        marginLeft: 40,
        marginBottom: -10,
    },
    texthead: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    iconContainer: {
        padding: 2,
        fontSize: 16,

    }
});
