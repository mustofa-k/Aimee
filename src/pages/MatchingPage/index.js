import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';
import { FilterContext } from '../../context/FilterContext'; // Import FilterContext

const StartupPage = ({ navigation }) => {
  const { colors } = useTheme();
  const { filteredData } = useContext(FilterContext); // Akses filteredData dari context
  const swipeRef = useRef(null); // Referensi untuk Swiper
  const [startup, setStartup] = useState([...filteredData]);

  const handleCardPress = (cardIndex) => {
    const card = startup[cardIndex];
    if (!card) {
      console.error('No card data available'); // Debug untuk memastikan data card ada
      return;
    }
    // Debugging untuk melihat apakah navigasi dipanggil
    navigation.navigate('StartupMatchDetails', { startup: card });
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Startup Match" />
        <Appbar.Action
          icon="refresh"
          onPress={() => {
            swipeRef.current.jumpToCardIndex(0); // Mengulang swiper dari kartu pertama
            setStartup([...filteredData]); // Set state dengan array baru
          }}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          {startup.length === 0 ? (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>
                No matching startups found
              </Text>
            </View>
          ) : (
            <Swiper
              ref={swipeRef}
              containerStyle={{ backgroundColor: 'transparent' }}
              cards={startup}
              renderCard={(card) =>
                card ? (
                  <View key={card.id} style={styles.card}>
                    <Image style={styles.image} source={{ uri: card.image }} />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{card.name}</Text>
                    </View>
                    <View style={styles.matchPercentageContainer}>
                      <Text style={styles.matchPercentageText}>
                        {parseFloat(card.matchPercentage).toFixed(2)}%
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.card}>
                    <Text style={styles.message}>No more Startups</Text>
                  </View>
                )
              }
              backgroundColor={'#fff'}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={true} // Aktifkan kembali swipe vertikal jika diperlukan
              horizontalSwipe={true} // Aktifkan kembali swipe horizontal
              disableBottomSwipe={true} // Nonaktifkan swipe ke bawah
              disableTopSwipe={true} // Nonaktifkan swipe ke atas
              onTapCard={(cardIndex) => handleCardPress(cardIndex)} // Gunakan onTapCard untuk menangani klik
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 10,
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: -20,
    marginBottom: -10,
  },
  flex: {
    flex: 1,
  },
  card: {
    position: 'relative',
    borderRadius: 20,
    borderWidth: 2,
    height: '90%',
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  text: {
    fontSize: 30,
    color: 'lightgrey',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  image: {
    position: 'absolute',
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    top: 0,
  },
  errorMessage: {
    fontSize: 24,
    color: 'red',
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchPercentageContainer: {
    position: 'absolute',
    top: 2,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchPercentageText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default StartupPage;
