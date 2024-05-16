// Register component import statements
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, StatusBar, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { auth, db, createUserWithEmailAndPassword } from '../firebase';
import { doc, setDoc, docRef, newDocRef, collection } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const docRef = doc(db, "collectionName", "docId");
    const newDocRef = doc(collection(db, "collectionName"));


    const handleRegister = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }
        if (password.length < 7) {
            Alert.alert('Error', 'Password must be at least 7 characters long!');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
                const userProfile = {
                    email: user.email,
                    createdAt: new Date(),
                    profilePicture: '',
                    phone: '',
                    location: ''
                };
                return setDoc(doc(db, "users", user.uid), userProfile);
            })
            .then(() => {
                Alert.alert("Success", "User registered and profile created.");
                router.push('/home');
            })
            .catch(error => {
                Alert.alert('Registration Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image className="h-full w-full absolute" source={require('../assets/images/loginregbg.jpeg')} />
            <StatusBar style="light" />
            <TouchableOpacity onPress={() => router.push('/')} style={styles.homeIcon}>
                <Ionicons name="home-outline" size={26} color="black" />
            </TouchableOpacity>

            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#4a5759' value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' />
                <TextInput style={styles.input} textContentType='oneTimeCode' secureTextEntry={true} placeholder='Password' placeholderTextColor='#4a5759' value={password} onChangeText={setPassword} />
                <TextInput style={styles.input} secureTextEntry={true} placeholder='Confirm Password' placeholderTextColor='#4a5759' value={confirmPassword} onChangeText={setConfirmPassword} />

                <TouchableOpacity onPress={handleRegister} style={styles.signUpButton}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.loginRedirect}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('login')}>
                        <Text style={styles.loginText}> Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeIcon: {
        position: 'absolute',
        top: heightPercentageToDP(28),
        left: widthPercentageToDP(47),
        height: heightPercentageToDP(5.5),
        width: widthPercentageToDP(5.5),
    },
    form: {
        width: '100%',
        padding: 20,
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#8a817c',
        padding: 15,
        marginBottom: 10,
    },
    signUpButton: {
        height: heightPercentageToDP(5),
        width: widthPercentageToDP(60),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC0CB',
        borderRadius: heightPercentageToDP(7) / 2,
        borderWidth: 2,
        borderColor: '#4a5759',
        alignSelf: 'center',
        marginBottom: 20,
    },
    loginRedirect: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: '#ef233c',
        marginLeft: 5,
    },
});
