/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { Text, View, Alert, BackHandler } from 'react-native';
// import { RNCamera } from 'react-native-camera';
import _ from 'lodash';
import Dimension from '../../constants/dimensions';

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
    // backgroundColor: '#424242',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: Dimension.DEVICE_HEIGT - 500,
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
  },
  bottomOverlay: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  scanScreenMessage: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class ProductScanRNCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      camera: {
        // type: RNCamera.Constants.Type.back,
        // flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true,
      },
      page: 'Login',
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
    const page = _.get(this.props.navigation.state.params, 'page') || 'Login';
    this.setState({
      page,
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
    return true;
  };

  onBarCodeReaded = scanResult => {
    const { page } = this.state;
    console.log('scanResult', scanResult);
    if (scanResult.data != null) {
      this.props.navigation.navigate(page, {
        barcodeId: scanResult.data,
      });
    }
    return null;
  };

  pendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
          barcodeFinderWidth={280}
          barcodeFinderHeight={220}
          barcodeFinderBorderColor="white"
          barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeReaded.bind(this)}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          androidCameraPermissionOptions={{
            title: 'Izin menggunakan kamera',
            message: 'Izinkan aplikasi ini untuk menggunakan kamera anda?',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Izin perekam suara',
            message: 'Izinkan aplikasi ini untuk menggunakan perekam suara?',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => { }}
          style={styles.preview}
          type={this.state.camera.type}
        /> */}
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>
            Scan barcode untuk mendapatkan nomor ID member Anda
          </Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]} />
      </View>
    );
  }
}

export default ProductScanRNCamera;
