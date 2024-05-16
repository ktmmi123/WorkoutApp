import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const favouriteVideos = [
  { id: '1', title: 'Back', image: require('../assets/images/kang.jpeg') },
  { id: '2', title: 'Other', image: require('../assets/images/general.jpeg') },
  { id: '3', title: 'Back', image: require('../assets/images/kang.jpeg') },
  { id: '4', title: 'Other', image: require('../assets/images/general.jpeg') },
  { id: '5', title: 'Other', image: require('../assets/images/general.jpeg') },
];


export default function Favourites() {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../assets/images/loginregbg.jpeg')} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>FAVOURITES</Text>
        </View>
        {favouriteVideos && favouriteVideos.length > 0 ? (
          <FlatList
            data={favouriteVideos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.noItemsText}>No favourite videos available.</Text>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginEnd: 125,

  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginLeft: 0,
    marginRight: 100,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});
