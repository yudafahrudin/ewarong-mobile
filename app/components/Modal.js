import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/colors';
import Dimensions from '../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  containerContent: {
    width: Dimensions.DEVICE_WIDTH - 50,
    height: Dimensions.DEVICE_HEIGT / 1.8,
    marginBottom: 'auto',
    marginTop: 'auto',
    borderRadius: 100 / 15,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
  },
});

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { modalVisible } = nextProps;
    this.setState({ modalVisible });
  };

  setModalVisible = modalVisible => {
    this.setState({ modalVisible });
  };

  render() {
    const { modalVisible } = this.state;
    const { children } = this.props;
    return (
      <Modal animationType="fade" transparent visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.containerContent}>{children}</View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  children: PropTypes.node,
  modalVisible: PropTypes.bool,
};

ModalComponent.defaultProps = {
  children: '',
  modalVisible: false,
};

export default ModalComponent;
