import React, { Component } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import NavigationHeader from '../../Components/CustomHeader';
//@ts-ignore
import GetLocation from 'react-native-get-location';
import MapViewDirections from 'react-native-maps-directions';
import { MAP_KEYS } from '../../Constants/API';

const { width, height } = Dimensions.get('window');

export interface Props {
  navigation: NavigationScreenProp<any, any>,
}

class Map extends Component<Props, object> {

  state = {
    lat: 0,
    lon: 0,
  }

  mapView: any;

  //Navigation Bar
  static navigationOptions = () => {
    return {
      headerShown: false
    }
  }

  componentDidMount() {
    this.getUserLocation();
  }

  private getUserLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 0,
    })
      .then((location: any) => {
        this.setState({ lat: location.latitude, lon: location.longitude })
      })
      .catch((error: any) => {
        console.log('Error: ', error);
      });
  }

  render() {
    let coordinate: LatLng = {
      latitude: this.state.lat,
      longitude: this.state.lon,
    }

    let dtls = this.props.navigation.state.params.dtls;

    return (
      <SafeAreaView style={styles.mainVw}>
        <NavigationHeader
          title={''}
          haveShadow={false}
          leftBtnActn={() => this.props.navigation.goBack()}
          btnImage={require('../../Assets/back.png')}
        />
        <View style={[styles.line, { height: 1 }]}></View>
        <MapView
          ref={(c: any) => this.mapView = c}
          provider={PROVIDER_GOOGLE}
          style={styles.mapVw}
          region={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}>
          <Marker
            key={1}
            coordinate={{
              latitude: parseFloat(dtls.latitude),
              longitude: parseFloat(dtls.longitude)
            }}>
          </Marker>
          <Marker
            key={2}
            coordinate={coordinate}>
          </Marker>
          <MapViewDirections
            origin={{ latitude: dtls.latitude, longitude: dtls.longitude }}
            destination={coordinate}
            apikey={MAP_KEYS}
            strokeWidth={3}
            strokeColor="#45b3e0"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR', errorMessage);
            }}
          />
        </MapView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);





