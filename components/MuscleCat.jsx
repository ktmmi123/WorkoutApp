import { View, Text, Image} from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { bodyParts, muscleCategory } from '../constants';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';




export default function BodyParts() {
    const router = useRouter();
    return (
        <View className="mx-4">
            <Text style={{fontSize: heightPercentageToDP(3) }} className="font-bold text-neutral-700 mb-3 mt-3">
                Exercises
            </Text>


            <FlatList
            data={muscleCategory}
            numColumns={2}
            keyExtractor={item=> item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50, paddingtop: 20}}
            columnWrapperStyle={{justifyContent:'space-between'}}
            renderItem={({item, index})=> <BodyPartCard router={router} index={index} item={item} />}
            />

        </View>
    )
}

const BodyPartCard = ({item, router, index})=>{
    return (
        <View>
            <TouchableOpacity
               onPress={() => router.push('/exercises', { params: { category: item.name } })}
                style={{width: widthPercentageToDP(44), height: widthPercentageToDP(52)}}
                className="flex justify-end p-4 mb-4">
                    <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{width: widthPercentageToDP(44) , height: widthPercentageToDP(52)}}
                        className="rounded-[35px] absolute"
                    /> 
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.9)']}
                        style={{width: widthPercentageToDP(44), height:heightPercentageToDP(15)}}
                        start={{x:0.5, y:0}}
                        end={{x:0.5, y:1}}
                        className="absolute bottom-0 rounded-b-[35px]"
                    />
                    <Text
                    style={{fontSize: heightPercentageToDP(2.3)}}
                    className="text-white font-semibold text-center tracking-wide">
                        {item?.name}
                    </Text>

            </TouchableOpacity>
        </View>
    )
}