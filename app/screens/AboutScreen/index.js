import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

class AboutScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('header'),
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  render() {
    console.log(this.props);
    const pageType = this.props.navigation.getParam('header');
    return (
      <View style={{flex: 1, padding: 25}}>
        {pageType == 'Tentang' ? (
          <View>
            <Text style={{fontSize: 17, marginBottom: 20}}>
              Tentang Aplikasi
            </Text>
            <Text>
              E-Warong Sidoarjo adalah Sistem Informasi Geografis Elektronik
              Warung Gotong Royong (E-Warong) Berbasis Android Di Sidoarjo.
              Aplikasi ini digunakan untuk mengetahui titik-titik lokasi
              E-Warong yang ada di Sidoarjo.
            </Text>
            <Text style={{marginTop: 10}}>
              {' '}
              - User Kios E-Warong dapat mempublikasikan profil kios E-Warong,
              alamat, jam buka, serta produk apa saja yang tersedia melalui
              aplikasi ini.{' '}
            </Text>
            <Text style={{marginTop: 10}}>
              - User Umum dapat mengetahui informasi keberadaan Kios E-Warong
              yang ada di Sidoarjo secara cepat, tepat dan akurat, user juga
              dapat memesan produk (booking) pada Kios E-Warong yang terlah
              terdaftar di aplikasi ini dengan sistem pembayaran COD.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{fontSize: 17, marginBottom: 20}}>FAQ</Text>
            <Text style={{fontWeight: 'bold'}}>
              Q : Apakah titik-titik lokasi E-Warong tersebut benar adanya?
            </Text>
            <Text>
              A : Ya, karena setiap user kios E-Warong yang terdaftar di
              aplikasi ini telah dilakukan survey dan verfikasi terlebih dahulu.
            </Text>
            <Text style={{fontWeight: 'bold', marginTop: 10}}>
              Q : Apakah bisa memesan produk di aplikasi ini?
            </Text>
            <Text>
              A : Ya, user bisa memesan produk di aplikasi ini dengan cara
              booking produk kemudian datang ke Kios E-Warong tersebut kemudian
              melakukan transaksi pembayaran di sana (COD)
            </Text>
            <Text style={{fontWeight: 'bold', marginTop: 10}}>
              Q : Apakah produk yang tersedia di E-Warong hanya bahan pokok
              makanan / sembako saja?
            </Text>
            <Text>
              A : Ya, karena Elektronik Warung Gotong Royong (E-Warong) yang
              terdaftar di aplikasi ini hanya diperboleh mempublish komoditas
              pangan saja
            </Text>
            <Text style={{marginTop: 20}}>
              untuk pertanyaan lebih lanjut hubungi Admin email :
              adminaplikasiewarongsidoarjo@gmail.com HP : 081336363607
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default AboutScreen;
