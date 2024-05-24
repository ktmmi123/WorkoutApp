import { View, Text, Image, TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect,useState }  from 'react';
import { useLocalSearchParams, useRouter,searchParams } from 'expo-router';
import firebase from 'firebase/app';
import { getStorage} from'firebase/storage';



export default function Exercises() {
    const router = useRouter();
    const [images, setImages] = useState([]);
    const item = useLocalSearchParams();

    useEffect(() => {
        const fetchImages = async () => {
            const imagesList = [];
            const category = searchParams.get('category');
            const storageRef = firebase.storage().ref(`videos/${item.category}`);
            const snapshot = await storageRef.listAll();
            for (let imageRef of snapshot.items) {
                const imageUrl = await imageRef.getDownloadURL();
                imagesList.push(imageUrl);
            }
            setImages(imagesList);
        };

        fetchImages();
    }, [item.category]);

    return (
        <View className="mt-20">
            <Text>Exercises for {item.category}</Text>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
                )}
            />
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}
