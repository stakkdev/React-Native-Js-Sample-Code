import React, { Component } from "react";
import { SafeAreaView, Image, Text, View, Modal, Alert } from "react-native";
import { styles } from "./styles";
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from "../../Components/CustomHeader";
import CommonBtn from "../../Components/CommonBtn";
import BorderedtxtInput from "../../Components/BorderedtxtInput";
import LocationAccess from "../../Components/LocationAccess";
import { connect } from "react-redux";
import { changePwd, statusChangePwd } from "../../Redux/Actions/ForgotPwdActions";
import Images from "../../utils/ImagesGenerator";

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  changePwd: any,
  apiResponse: any,
  updateApiStatus: any,
}

class CreatePassword extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    pwd: '',
    cPwd: '',
    pwdSec: true,
    cPwdSec: true,
  }

  inputRefs: any = {};
  countryPicker: any;

  componentWillReceiveProps(props: any) {
    if (props.apiResponse.changePwdStatus != undefined && props.apiResponse.changePwdStatus) {
      this.handleCallBack();
      this.props.updateApiStatus();
    }
  }

  handleCallBack() {
    Alert.alert(
      'Password has been changed successfully.',
      '',
      [
        {
          text: 'Ok',
          onPress: () => { this.props.navigation.navigate('Signup', { type: 1 }) },
        }
      ],
      { cancelable: false }
    );
  }

  async onSubmit() {
    let params = {
      "password": this.state.pwd,
      "c_password": this.state.cPwd,
    }
    this.props.changePwd({ params: params, token: this.props.navigation.state.params.token, isChange: false })
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <Modal visible={false} transparent={false}>
          <LocationAccess />
        </Modal>
        <NavigationHeader
          title={''}
          haveShadow={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={require('../../Assets/back.png')}
        />
        <Image source={require('../../Assets/changePwdImg.png')} style={styles.lockImg} />
        <Text style={styles.viewTitleTxt}>{'Create new password'}</Text>
        <Text style={styles.enterOtpTxt}>{'Please enter a new password.'}</Text>
        <View style={styles.inputCntnr}>
          <BorderedtxtInput type={'default'} text={this.state.pwd} placeholder={'Enter new password'} changeText={(text: any) => this.setState({ pwd: text })} rightImg={this.state.pwdSec ? require('../../Assets/eye.png') : Images.PWD_DIS} isSecure={this.state.pwdSec} onPress={() => this.setState({ pwdSec: !this.state.pwdSec })} />
          <BorderedtxtInput type={'default'} text={this.state.cPwd} placeholder={'Re-enter new password'} changeText={(text: any) => this.setState({ cPwd: text })} rightImg={this.state.cPwdSec ? require('../../Assets/eye.png') : Images.PWD_DIS} isSecure={this.state.cPwdSec} onPress={() => this.setState({ cPwdSec: !this.state.cPwdSec })} />
        </View>
        <CommonBtn title={'Continue'} onPress={() => this.onSubmit()} />
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.pwdData,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changePwd: (data: any) => dispatch(changePwd(data)),
    updateApiStatus: () => dispatch(statusChangePwd(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);
