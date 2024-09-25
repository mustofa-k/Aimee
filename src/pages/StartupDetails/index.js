import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function StartupDetails({ route, navigation }) {
  const { startup } = route.params;

  // Log data startup untuk memastikan data diterima dengan benar
  console.log('Startup Data in Details:', startup);

  // Cek apakah data startup ada dan memiliki semua properti yang diperlukan
  if (!startup || !startup.image || !startup.name || !startup.description) {
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>
          Incomplete data or image not available
        </Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Startup Details" />
      </Appbar.Header>
      <ScrollView style={styles.Container}>
        <View style={styles.uppercontainer}>
          <View>
            <Image
              source={{ uri: startup.image }}
              style={[styles.image, { marginTop: 10 }]}
            />
          </View>
        </View>
        <View style={styles.uppertext}>
          <Text style={styles.name}>{startup.name}</Text>
          <Text>{startup.location}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.bottomcontainer}>
          <Text style={styles.title}>Description</Text>
          <Text>{startup.description}</Text>
          <Text style={styles.title}>Team Size</Text>
          <Text>{startup.ukuranTim} Orang</Text>
          <Text style={styles.title}>Industries Sector</Text>
          <Text>{startup.sektorIndustri}</Text>
          <Text style={styles.title}>Business Model</Text>
          <Text>{startup.modelBisnis}</Text>
          <Text style={styles.title}>Required Talent</Text>
          <Text>{startup.keahlian}</Text>
          <Text style={styles.title}>Required Funding</Text>
          <Text>{startup.pendanaan}</Text>
          <Text style={styles.title}>Contact</Text>
          <Text>{startup.contact}</Text>
        </View>

        <View style={styles.icons}>
          <Pressable
            onPress={() =>
              navigation.navigate('UpdateDetail', {
                item: startup,
              })
            }
          >
            <MaterialIcons name="edit" size={40} color="#0000FF" />
          </Pressable>
          <Pressable onPress={() => console.log('Delete Pressed')}>
            <MaterialIcons name="delete" size={40} color="#FF6768" />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 15,
  },
  uppercontainer: {
    alignItems: 'center',
  },
  bottomcontainer: {
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  uppertext: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 20,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 2,
    paddingTop: 10,
  },
  description: {
    fontWeight: '300',
  },
  icons: {
    flexDirection: 'row',
    paddingTop: 20,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'darkgrey',
    marginVertical: 10,
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
  },
});
