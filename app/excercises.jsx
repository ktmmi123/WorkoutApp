import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';




export default function Exercises() {
    const router = useRouter();
    const item = useLocalSearchParams();

    return (
        <View className="mt-20">
            <Text>
                Exercises
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>

        </View>
    )
}