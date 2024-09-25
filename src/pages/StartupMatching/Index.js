// import { useState, useContext } from 'react';
// import {
//   ScrollView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import { Appbar, useTheme } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// import Container from '../../layout/Container';
// import InputText from '../../components/TextInput';
// import { COLORS } from '../../constants/theme';
// import { FilterContext } from '../../context/FilterContext'; // Import FilterContext
// import { applyFilter } from './MatchLogic'; // Pastikan jalur file sesuai
// import { db } from '../../../firebase';

// const provinsiList = [
//   'Kalimantan Selatan',
//   'Aceh',
//   'Bali',
//   'Banten',
//   'Bengkulu',
//   'DI Yogyakarta',
//   'DKI Jakarta',
//   'Gorontalo',
//   'Jambi',
//   'Jawa Barat',
//   'Jawa Tengah',
//   'Jawa Timur',
//   'Kalimantan Barat',
//   'Kalimantan Selatan',
//   'Kalimantan Tengah',
//   'Kalimantan Timur',
//   'Kalimantan Utara',
//   'Kepulauan Bangka Belitung',
//   'Kepulauan Riau',
//   'Lampung',
//   'Maluku',
//   'Maluku Utara',
//   'Nusa Tenggara Barat',
//   'Nusa Tenggara Timur',
//   'Riau',
//   'Sulawesi Barat',
//   'Sulawesi Selatan',
//   'Sulawesi Tengah',
//   'Sulawesi Tenggara',
//   'Sulawesi Utara',
//   'Sumatera Selatan',
//   'Sumatera Utara',
// ];

// const sektorIndustriList = [
//   'Textile',
//   'Food and Beverage',
//   'Digital Business Development',
//   'Agriculture',
//   'Farms',
//   'Graphic Design and Creative',
//   'Food Processing',
//   'Production',
//   'Fashion',
//   'Teknologi',
//   'Kesehatan',
//   'Pendidikan',
//   'Keuangan',
//   'E-commerce',
//   'Pariwisata',
//   'Agrikultur',
// ];

// const bisnisModelList = ['B2B', 'B2C', 'Hybrid B2B and B2C'];

// const StartupMatchingPage = ({ navigation }) => {
//   const { colors } = useTheme();
//   const { setFilteredData } = useContext(FilterContext); // Gunakan context untuk setFilteredData

//   const [formValues, setFormValues] = useState({
//     startupName: '',
//     provinsi: '',
//     bisnisModel: '',
//     sektorIndustri: '',
//     pendanaan: '',
//     jumlahTim: '',
//     contact: '',
//   });

//   const handleApplyFilter = async () => {
//     try {
//       // Terapkan filter dan simpan hasilnya di context
//       await applyFilter(formValues, setFilteredData);

//       // Buat data baru sesuai dengan struktur yang diinginkan
//       const newData = {
//         name: formValues.startupName,
//         provinsi: formValues.provinsi,
//         modelBisnis: formValues.bisnisModel,
//         sektorIndustri: formValues.sektorIndustri,
//         pendanaan: formValues.pendanaan,
//         contact: formValues.contact,
//         createdAt: serverTimestamp(), // Tambahkan timestamp dari server
//         updatedAt: serverTimestamp(), // Tambahkan updatedAt dengan timestamp saat ini
//       };

//       // Menyimpan data ke koleksi "yourCollectionName" di Firestore
//       const docRef = await addDoc(collection(db, 'InvestorList'), newData);

//       // Navigasi ke halaman Home setelah data berhasil disimpan
//       navigation.navigate('Home');
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   };

//   const handleInputChange = (namaState, value) => {
//     setFormValues({
//       ...formValues,
//       [namaState]: value,
//     });
//   };

//   return (
//     <>
//       <Appbar.Header style={{ backgroundColor: colors.surface }}>
//         <Appbar.BackAction onPress={() => navigation.goBack()} />
//         <Appbar.Content title="Startup Matching" />
//       </Appbar.Header>

//       <ScrollView style={{ backgroundColor: colors.surface }}>
//         <Container mt={16}>
//           <InputText
//             placeholder="Enter your name.."
//             label="Name"
//             value={formValues.startupName}
//             onChangeText={(value) => handleInputChange('startupName', value)}
//           />
//           <View style={styles.picker}>
//             <Picker
//               selectedValue={formValues.bisnisModel}
//               onValueChange={(itemValue) =>
//                 handleInputChange('bisnisModel', itemValue)
//               }
//             >
//               <Picker.Item label="Business Model" value="" />
//               {bisnisModelList.map((bisnis) => (
//                 <Picker.Item key={bisnis} label={bisnis} value={bisnis} />
//               ))}
//             </Picker>
//           </View>

//           <View style={styles.picker}>
//             <Picker
//               selectedValue={formValues.provinsi}
//               onValueChange={(itemValue) =>
//                 handleInputChange('provinsi', itemValue)
//               }
//             >
//               <Picker.Item label="Select Province" value="" />
//               {provinsiList.map((provinsi) => (
//                 <Picker.Item key={provinsi} label={provinsi} value={provinsi} />
//               ))}
//             </Picker>
//           </View>

//           <View style={styles.picker}>
//             <Picker
//               selectedValue={formValues.sektorIndustri}
//               onValueChange={(itemValue) =>
//                 handleInputChange('sektorIndustri', itemValue)
//               }
//             >
//               <Picker.Item label="Select Industrial Sector" value="" />
//               {sektorIndustriList.map((sektorIndustri) => (
//                 <Picker.Item
//                   key={sektorIndustri}
//                   label={sektorIndustri}
//                   value={sektorIndustri}
//                 />
//               ))}
//             </Picker>
//           </View>

//           <InputText
//             placeholder="Funding... "
//             label="Funding"
//             value={formValues.pendanaan}
//             onChangeText={(value) => handleInputChange('pendanaan', value)}
//             keyboardType="numeric"
//           />
//           <InputText
//             placeholder="Number of teams... "
//             label="Teams"
//             value={formValues.jumlahTim}
//             onChangeText={(value) => handleInputChange('jumlahTim', value)}
//             keyboardType="numeric"
//           />
//           <InputText
//             placeholder="Enter your Contact... "
//             label="Contact"
//             value={formValues.contact}
//             onChangeText={(value) => handleInputChange('contact', value)}
//             keyboardType="phone-pad"
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleApplyFilter} // Gunakan handleApplyFilter
//           >
//             <Text style={styles.buttonText}>Start</Text>
//           </TouchableOpacity>
//         </Container>
//       </ScrollView>
//     </>
//   );
// };

// export default StartupMatchingPage;

// const styles = StyleSheet.create({
//   picker: {
//     marginTop: 16,
//     marginBottom: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#262626',
//   },
//   button: {
//     backgroundColor: COLORS.secondary,
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

import React, { useState, useContext } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import Container from '../../layout/Container';
import InputText from '../../components/TextInput';
import { COLORS } from '../../constants/theme';
import { FilterContext } from '../../context/FilterContext'; // Import FilterContext
import { applyFilter } from './MatchLogic'; // Pastikan jalur file sesuai
import { db } from '../../../firebase';

const StartupMatchingPage = ({ navigation }) => {
  const { colors } = useTheme();
  const { setFilteredData } = useContext(FilterContext); // Gunakan context untuk setFilteredData

  const [formValues, setFormValues] = useState({
    startupName: '',
    provinsi: '',
    bisnisModel: '',
    sektorIndustri: '',
    pendanaan: '',
    jumlahTim: '',
    contact: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const provinsiList = [
    'Kalimantan Selatan',
    'Aceh',
    'Bali',
    'Banten',
    'Bengkulu',
    'DI Yogyakarta',
    'DKI Jakarta',
    'Gorontalo',
    'Jambi',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Kalimantan Barat',
    'Kalimantan Selatan',
    'Kalimantan Tengah',
    'Kalimantan Timur',
    'Kalimantan Utara',
    'Kepulauan Bangka Belitung',
    'Kepulauan Riau',
    'Lampung',
    'Maluku',
    'Maluku Utara',
    'Nusa Tenggara Barat',
    'Nusa Tenggara Timur',
    'Riau',
    'Sulawesi Barat',
    'Sulawesi Selatan',
    'Sulawesi Tengah',
    'Sulawesi Tenggara',
    'Sulawesi Utara',
    'Sumatera Selatan',
    'Sumatera Utara',
  ];

  const sektorIndustriList = [
    'Textile',
    'Food and Beverage',
    'Digital Business Development',
    'Agriculture',
    'Farms',
    'Graphic Design and Creative',
    'Food Processing',
    'Production',
    'Fashion',
    'Teknologi',
    'Kesehatan',
    'Pendidikan',
    'Keuangan',
    'E-commerce',
    'Pariwisata',
    'Agrikultur',
  ];

  const bisnisModelList = ['B2B', 'B2C', 'Hybrid B2B and B2C'];

  const handleApplyFilter = async () => {
    setIsLoading(true); // Mulai loading
    try {
      // Terapkan filter dan simpan hasilnya di context
      await applyFilter(formValues, setFilteredData);

      // Buat data baru sesuai dengan struktur yang diinginkan
      const newData = {
        name: formValues.startupName,
        provinsi: formValues.provinsi,
        modelBisnis: formValues.bisnisModel,
        sektorIndustri: formValues.sektorIndustri,
        pendanaan: formValues.pendanaan,
        contact: formValues.contact,
        createdAt: serverTimestamp(), // Tambahkan timestamp dari server
        updatedAt: serverTimestamp(), // Tambahkan updatedAt dengan timestamp saat ini
      };

      // Menyimpan data ke koleksi "InvestorList" di Firestore
      await addDoc(collection(db, 'InvestorList'), newData);

      // Navigasi ke halaman Home setelah data berhasil disimpan
      navigation.navigate('Home');
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setIsLoading(false); // Akhiri loading
    }
  };

  const handleInputChange = (namaState, value) => {
    setFormValues({
      ...formValues,
      [namaState]: value,
    });
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Startup Matching" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: colors.surface }}>
        <Container mt={16}>
          <InputText
            placeholder="Enter your name.."
            label="Name"
            value={formValues.startupName}
            onChangeText={(value) => handleInputChange('startupName', value)}
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={formValues.bisnisModel}
              onValueChange={(itemValue) =>
                handleInputChange('bisnisModel', itemValue)
              }
            >
              <Picker.Item label="Business Model" value="" />
              {bisnisModelList.map((bisnis) => (
                <Picker.Item key={bisnis} label={bisnis} value={bisnis} />
              ))}
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker
              selectedValue={formValues.provinsi}
              onValueChange={(itemValue) =>
                handleInputChange('provinsi', itemValue)
              }
            >
              <Picker.Item label="Select Province" value="" />
              {provinsiList.map((provinsi) => (
                <Picker.Item key={provinsi} label={provinsi} value={provinsi} />
              ))}
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker
              selectedValue={formValues.sektorIndustri}
              onValueChange={(itemValue) =>
                handleInputChange('sektorIndustri', itemValue)
              }
            >
              <Picker.Item label="Select Industrial Sector" value="" />
              {sektorIndustriList.map((sektorIndustri) => (
                <Picker.Item
                  key={sektorIndustri}
                  label={sektorIndustri}
                  value={sektorIndustri}
                />
              ))}
            </Picker>
          </View>

          <InputText
            placeholder="Funding... "
            label="Funding"
            value={formValues.pendanaan}
            onChangeText={(value) => handleInputChange('pendanaan', value)}
            keyboardType="numeric"
          />
          <InputText
            placeholder="Number of teams... "
            label="Teams"
            value={formValues.jumlahTim}
            onChangeText={(value) => handleInputChange('jumlahTim', value)}
            keyboardType="numeric"
          />
          <InputText
            placeholder="Enter your Contact... "
            label="Contact"
            value={formValues.contact}
            onChangeText={(value) => handleInputChange('contact', value)}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleApplyFilter}
            disabled={isLoading} // Disable tombol saat loading
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Start</Text>
            )}
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </>
  );
};

export default StartupMatchingPage;

const styles = StyleSheet.create({
  picker: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#262626',
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
