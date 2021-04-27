//@ts-ignore
import ScaleSheet from 'react-native-scalesheet';
import color from '../../Constants/Colors';
import font from '../../Constants/Font';
import { Platform } from 'react-native';

export const styles = ScaleSheet.create({

  mainVw: {
    flex: 1,
    backgroundColor: 'white'
  },
  mobileVwCntnr: {
    height: 40,
    margin: 15,
    paddingLeft: 5,
    borderRadius: 8,
    borderColor: color.WHITE_GREY,
    flexDirection: 'row',
  },
  otpInputCntnrVw: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  //TextInput Styles
  viewTitleTxt: {
    fontSize: 22,
    marginLeft: 15,
    color: 'black',
    fontFamily: font.FONT_ROBOTO_MEDIUM,
    textAlign: 'left',
  },
  mobileInput: {
    flex: 1,
    height: 40,
    fontFamily: font.FONT_ROBOTO_REGULAR,
    fontSize: 14,
    paddingLeft: 15,
    padingRight: 15,
  },
  emailInput: {
    height: 40,
    margin: 15,
    borderColor: color.GREY,
    borderRadius: 8,
    fontFamily: font.FONT_ROBOTO_REGULAR,
    fontSize: 16,
    paddingLeft: 15,
    padingRight: 15,
  },

  //Text Styles
  enterOtpTxt: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    marginBottom: 10,
    color: color.GREY,
    fontFamily: font.FONT_ROBOTO_REGULAR,
  },
  resendTxt: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    color: color.BLUE,
    textAlign: 'center',
    fontFamily: font.FONT_ROBOTO_REGULAR,
  },
  mobileTxt: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
    fontFamily: font.FONT_ROBOTO_REGULAR,
  },
  ccTxt: {
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
    color: color.GREY,
    fontFamily: font.FONT_ROBOTO_REGULAR,
  },

  //Images Styles
  lockImg: {
    height: 42,
    width: 42,
    marginTop: 10, 
    marginBottom: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})