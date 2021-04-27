import React, { Component } from "react";
import { SafeAreaView, Image, Text, TextInput, View, AsyncStorage, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./styles";
import { NavigationScreenProp } from 'react-navigation';
import NavigationHeader from "../../Components/CustomHeader";
import CommonBtn from "../../Components/CommonBtn";
import OtpTxtField from "../../Components/OtpTxtFld";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import loginKeys from "../../Redux/Constants/LoginKeys";
import { verifyforgotOtp, saveVerifyforgotOtp } from "../../Redux/Actions/ForgotPwdActions";

export interface Props {
  navigation: NavigationScreenProp<any, any>,
  verifyOtp: any,
  verifyForgotOtp: any,
  sendOtp: any,
  apiResponse: any,
  forgotOtpResp: any,
  verifyApiStatus: any,
}

class OTP extends Component<Props, object> {

  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  state = {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
    unFilled: true,
  }

  inputRefs: any = {};
  countryPicker: any;

  async componentWillReceiveProps(props: any) {
    if (this.props.navigation.state.params.type == 0) {
      if (props.apiResponse.loginData != undefined && props.apiResponse.loginData.token != undefined && props.apiResponse.loginData.token != '') {
        await AsyncStorage.setItem('loginData', JSON.stringify(props.apiResponse.loginData));
        this.props.navigation.navigate('Home');
      }
    }
    if (props.forgotOtpResp != undefined && props.forgotOtpResp.verifyStatus == true) {
      this.props.navigation.navigate('CreatePassword', { type: 0, token: this.props.navigation.state.params.token });
      this.props.verifyApiStatus();
    }
  }

  private resendOtp() {
    this.props.sendOtp()
  }

  handleInput = (text: string, id: any, ref: string) => {
    switch (id) {
      case 1:
        this.setState({ otp1: text })
        break;

      case 2:
        this.setState({ otp2: text })
        break;

      case 3:
        this.setState({ otp3: text })
        break;

      case 4:
        this.setState({ otp4: text })
        break;

      case 5:
        this.setState({ otp5: text })
        break;

      case 6:
        this.setState({ otp6: text })
        break;
    }

    if (ref != '') {
      this.inputRefs[ref].focus();
    }

    setTimeout(() => {
      this.checkIfOtpFilled()
    }, 10);
  }

  setInputRef = (id: string, input: TextInput) => {
    this.inputRefs[id] = input;
  }

  checkIfOtpFilled() {
    if (this.state.otp1 != '' && this.state.otp2 != '' && this.state.otp3 != '' && this.state.otp4 != '') {
      this.setState({ unFilled: false })
    }
    else {
      this.setState({ unFilled: true })
    }
  }

  continue() {
    if (this.props.navigation.state.params.type == 0) {
      if (!this.state.unFilled) {
        this.setState({ showLoader: true })
        let otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 + this.state.otp5 + this.state.otp6;
        this.props.verifyOtp({ otp: otp, token: this.props.navigation.state.params.token })
      }
    }
    else if (this.props.navigation.state.params.type == 1) {
      let otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4 + this.state.otp5 + this.state.otp6;
      this.props.verifyForgotOtp({ otp: otp, token: this.props.navigation.state.params.token })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainVw}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}>
          <View>
            <NavigationHeader
              title={''}
              haveShadow={false}
              leftBtnActn={() => this.props.navigation.goBack()}
              btnImage={require('../../Assets/back.png')}
            />
            <Image source={require('../../Assets/otpImg.png')} style={styles.lockImg} />
            <Text style={styles.viewTitleTxt}>{'Enter Verification Code'}</Text>
            <Text style={styles.enterOtpTxt}>{'Please enter the four digit code sent to'}</Text>
            <Text style={styles.mobileTxt}>{this.props.navigation.state.params.mobile}</Text>
            <View style={styles.otpInputCntnrVw}>
              <OtpTxtField
                value={this.state.otp1}
                onTextChange={(text: string) => this.handleInput(text, 1, 'field2')}
                inputRef={(input: TextInput) => { this.setInputRef("field1", input); }}
              />
              <OtpTxtField
                value={this.state.otp2}
                onTextChange={(text: string) => this.handleInput(text, 2, 'field3')}
                inputRef={(input: TextInput) => { this.setInputRef("field2", input); }}
              />
              <OtpTxtField
                value={this.state.otp3}
                onTextChange={(text: string) => this.handleInput(text, 3, 'field4')}
                inputRef={(input: TextInput) => { this.setInputRef("field3", input); }}
              />
              <OtpTxtField
                value={this.state.otp4}
                onTextChange={(text: string) => this.handleInput(text, 4, 'field5')}
                inputRef={(input: TextInput) => { this.setInputRef("field4", input); }}
              />
              <OtpTxtField
                value={this.state.otp5}
                onTextChange={(text: string) => this.handleInput(text, 5, 'field6')}
                inputRef={(input: TextInput) => { this.setInputRef("field5", input); }}
              />
              <OtpTxtField
                value={this.state.otp6}
                onTextChange={(text: string) => this.handleInput(text, 6, '')}
                inputRef={(input: TextInput) => { this.setInputRef("field6", input); }}
              />
            </View>
            <Text style={[styles.enterOtpTxt, { textAlign: 'center', marginBottom: 0 }]}>{"I didn't receive a code yet"}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.resendOtp()} >
              <Text style={styles.resendTxt}>{"Resend Code"}</Text>
            </TouchableOpacity>
            <CommonBtn title={'Continue'} onPress={() => this.continue()} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    apiResponse: state.loginReducer.userInfo,
    forgotOtpResp: state.loginReducer.pwdData,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    verifyOtp: (data: any) => dispatch({ type: loginKeys.VERIFY_OTP, data }),
    verifyForgotOtp: (data: any) => dispatch(verifyforgotOtp(data)),
    sendOtp: () => dispatch({ type: loginKeys.SEND_OTP }),
    verifyApiStatus: () => dispatch(saveVerifyforgotOtp({ status: false, token: '' }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP);