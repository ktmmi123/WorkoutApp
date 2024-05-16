import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, updateUserProfile, storage } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Account() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        const user = auth.currentUser;
        setEmail(user.email);
        loadData(user.uid);
    }, []);

    const loadData = async (userId) => {
        const userRef = doc(db, "users", userId);
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUsername(data.username || '');
                setPhone(data.phone || '');
                setLocation(data.location || '');
            } else {
                console.log("No user data found!");
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        const userData = { username, email, phone, location };
        try {
            await updateUserProfile(user.uid, userData);
            Alert.alert("Profile Updated", "Your profile information has been updated.");
        } catch (error) {
            Alert.alert("Error Updating Profile", error.message);
        }
    };

    async function changeProfilePicture() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.2,
        });

        console.log("Image Picker Result:", result);

        if (result.canceled) {
            console.log('Image picker was canceled.');
            return;
        }


        const uri = result.uri;
        if (!uri) {
            console.error('No URI available from image picker.');
            return;
        }

        const uriArray = uri.split(".");
        const fileExtension = uriArray[uriArray.length - 1];
        const fileTypeExtended = `${result.type}/${fileExtension}`;


        const data = new FormData();
        data.append('file', {
            uri: uri,
            name: `image.${fileExtension}`,
            type: fileTypeExtended
        });

        setImage(uri);
        uploadImage(uri, fileTypeExtended);
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,

        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 70,
            marginBottom: 20,

        },
        profilePicContainer: {
            alignItems: 'center',
            marginVertical: 50,
            flex: 1,
            marginBottom: 2,

        },
        cont: {

            borderRadius: 50,
            marginTop: 60,
        },
        profilePic: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            marginBottom: 10,
            marginTop: 3,
            borderRadius: 15,
            marginLeft: 15,
            marginRight: 15,
        },
    });

    return (
        <View style={styles.container}>
            <Image className="h-full w-full absolute" source={require('../assets/images/loginregbg.jpeg')} />
            <StatusBar style="light" />
            <Text style={styles.header}>My Profile</Text>
            <TouchableOpacity onPress={changeProfilePicture}>
                <Image source={require('../assets/images/profile.jpeg')}
                    style={{ height: hp(7), width: hp(7) }}
                    className="rounded-full  ml-44 mt-10" />
                <Text className="ml-40 mt-5">Change Picture</Text>
            </TouchableOpacity>
            <View style={styles.cont}>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
                <TextInput style={styles.input} value={email} editable={false} placeholder="Email" />
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
                <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Location" />
                <Button title="Save" onPress={handleSave} />
                <Button title="Back" onPress={() => router.push('/home')} />
            </View>
        </View>
    );
}
