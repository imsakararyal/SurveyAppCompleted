import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,PermissionsAndroid,Image} from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
import { Container, Header,Icon, Content,Picker,Title,Form, Item, Input, Label, Button, Body, Left,Right,Textarea } from 'native-base';
import Geolocation from "react-native-geolocation-service";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: undefined,
          Usrname: '',
          photo:null,
          email : '',
          password: '',
          status: '',
          Phone: '',
          long:'',
          lat:'',
          address:'',
          Description:'',
          disaster:'',

          avatar1data:'',
          avatar1type:'',
          avatarSource1: null,
          avatar2data:'',
          avatar2type:'',
          avatarSource2: null,
          avatar3data:'',
          avatar3type:'',
          avatarSource3: null,
          avatar4data:'',
          avatar4type:'',
          avatarSource4: null,
       

        };
      }
componentDidMount(){
  this.getLatLong();
}
      getLatLong = async () => {

        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Example App",
              message: "Example App access to your location "
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("You can use the location");
            // alert("You can use the location");
            // Instead of navigator.geolocation, just use Geolocation.
            //   if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
              position => {
                this.setState({
                  lat: JSON.stringify(position.coords.latitude),
                  long: JSON.stringify(position.coords.longitude),
                  latlongSwitch: 1
                });
              },
    
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
         
            // }
          } else {
            //  console.log("location permission denied");
            alert("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      selectPhotoTapped=(avatarnumber,e)=> {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = { uri: response.uri };
            let data = response.path;
            let type = response.type;
            
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            if (avatarnumber == "1") {
                console.log("Data from avatarno"+data);
                this.setState({
                  avatarSource1: source,
                  avatar1data: data,
                  avatar1type: type
                });
              }
              if (avatarnumber == "2") {
                this.setState({
                  avatarSource2: source,
                  avatar2data: data,
                  avatar2type: type
                });
              }
      
              if (avatarnumber == "3") {
                this.setState({
                  avatarSource3: source,
                  avatar3data: data,
                  avatar3type: type
                });
              }

              if (avatarnumber == "4") {
                this.setState({
                  avatarSource4: source,
                  avatar4data: data,
                  avatar4type: type
                });
              }
      
          }
        });
      }
      clearData=()=>{
this.setState({
  Usrname: '',
  photo:null,
  email : '',
  password: '',
  status: '',
  Phone: '',
  long:'',
  lat:'',
  address:'',
  Description:'',
  disaster:'',

  avatar1data:'',
  avatar1type:'',
  avatarSource1: null,
  avatar2data:'',
  avatar2type:'',
  avatarSource2: null,
  avatar3data:'',
  avatar3type:'',
  avatarSource3: null,
  avatar4data:'',
  avatar4type:'',
  avatarSource4: null
});
      };
  SubmitData=()=>{
      console.log('hi');
      console.log(JSON.stringify(

        [
          { name: "email", data: this.state.email},
                  { name: "name", data: this.state.Usrname },
                  { name: "desc", data: this.state.Description },
                  { name: "phone_no", data: this.state.Phone },
                  { name: "lat", data: this.state.lat },
                  { name: "long", data: this.state.long },
                  { name: "disaster_timeline", data: this.state.disaster },
                  {
                    name: "phot_1",
                    filename: "front.jpeg",
                    filetype: "image/jpeg",
                    data: RNFetchBlob.wrap(this.state.avatar1data)
                  }
        ]
        
                ));
      RNFetchBlob.fetch(
        "POST",
        "http://192.168.10.10/nirmalmaster/collabrative/backend/masterproject/public/api/details",
        {
       
          //   Authorization : "Bearer access-token",s
          // otherHeader : "foo",
          // this is required, otherwise it won't be process as a multipart/form-data request
          "Content-Type": "multipart/form-data"
        
        },
       

  
        [
            
// name:Raam
// email:nirmal@gmail.com
// phone_no:111111
// disaster_timeline:after
// lat:27.687767
// long:85.305834
// desc:Nirma
          { name: "email", data: this.state.email},
          { name: "name", data: this.state.Usrname },
          { name: "desc", data: this.state.Description },
          { name: "phone_no", data: this.state.Phone },
          { name: "lat", data: this.state.lat },
          { name: "long", data: this.state.long },
          { name: "disaster_timeline", data: this.state.disaster },

  
          {
            name: "photo_1",
            filename: "front.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar1data)
          },
          {
            name: "photo_2",
            filename: "right.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar2data)
          },
          {
            name: "photo_3",
            filename: "left.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar3data)
          },
          {
            name: "photo_4",
            filename: "back.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar4data)
          },
        ]
        
      )
      .then(response => {
        console.log('hello')
        console.log(JSON.stringify(response));
        // this.props.navigation.navigate("BasicFormPart2");r
        return response.json();
      })
      .then(jsonResponse => {
         console.log(JSON.stringify(jsonResponse));
         

        if (jsonResponse.status == "success") {
alert("Sucessfully recorded");
this.clearData();
       /*   Toast.show({
            text: "Homeowner Form sucessfully submitted",
            buttonText: "Okay",
            type: "success",
            duration: 3000
          });
          this.setState({
            loadingSubmit: false
          });*/
          //  this.props.navigation.navigate("BasicFormPart2");
        } else {
          alert("Problem in sending data..Please try again");
       /*   Toast.show({
            text: "Problem in sending Data.Please Try Again",
            buttonText: "Okay",
            type: "danger",
            duration: 3000
          });
          this.setState({
            loadingSubmit: false
          });*/
        }
      })
      .catch(err => {
        // ...
      });
    }
    
        
    //   SendAllData = () => {

    //     fetch('', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     Usrname: '',
    //                     address: '',
    //                     Phone:'',
    //                     Description:'',
    //                     After_Disaster:'',
    //                     Before_Disaster:'',
    //                 })
    //             })
        
    //                 .then((response) => response.json())
    //                 .then((responseData) => {
    //                     console.log("RESULTS HERE:", responseData)
        
    //                 this.setState({
    //               isLoading: false,
    //               dataSource: responseJson,
    //             }, function(){
        
    //             });
    //           })
    //           .catch((error) =>{
    //             console.error(error);
    //           }) 
    //     };
  render() {
    return (
        <View>
             <ScrollView>
             <Header style={{backgroundColor:'#9ec54d',alignItems:'center'}}>
             <Left/>
             <Body>
             <Title>SURVEY</Title>
             </Body>
             <Right />
             </Header>


            <View style={{alignItems:'center'}}>
                   <Form style={{width:'90%'}}>
            <Item stackedLabel>
              <Label style={styles.label}>Enter Name</Label>
              <Input
                                //  style={styles.newInput}
                                  value={this.state.Usrname}
                                
                                  onChangeText={text =>
                                   this.setState({
                                    Usrname:text
                                   })
                                  }
                                />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.label}>Enter Email address</Label>
              <Input 
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={text =>
               this.setState({
                email:text
               })
              }
              />
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>Enter Phone No</Label>
              <Input 
              keyboardType="phone-pad"
               value={this.state.Phone}
               onChangeText={text =>
                this.setState({
                  Phone:text
                })
               }
              
              />
            </Item>
            <Text style={[styles.label,{marginLeft:15,marginTop:3}]}>Disaster Time
            </Text>
            <Picker
              mode="dialog"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{marginLeft:7 }}

              selectedValue={this.state.disaster}
              onValueChange={text =>
                this.setState({
                  disaster: text
                })
              }

            //   onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Before Disaster" value="before" />
              <Picker.Item label="After Disaster" value="after" />
             
            </Picker>
            <Item style={{
              borderWidth:0,
              borderBottomWidth: 0
            }}>
              <Label style={styles.label}>Enter Description</Label>




            
            </Item>
            
            <Textarea
                                  value={this.state.Description}
                                  rowSpan={3}
                                  bordered
                                  placeholder="Enter details here"
                                  placeholderTextColor="#888888"
                                  onChangeText={text =>
                                   
                                   this.setState({
                                    Description:text
                                    })
                                  }
                                  />
          </Form>
          </View>

          <View>
          <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  paddingLeft: 20
                                }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "column"
                                  }}
                                >
                                  <Label style={styles.label}>
                                    <Text style={styles.required}>*</Text>

                                    Front Image

                                  </Label>

                                  <TouchableOpacity
                                    onPress={e =>
                                      this.selectPhotoTapped("1", e)
                                    }
                                  >
                                    <View
                                      style={[
                                        styles.avatar,
                                        styles.avatarContainer,
                                        { marginBottom: 20 }
                                      ]}
                                    >
                                      {this.state.avatarSource1 === null ? (
                                        <Image
                                          style={styles.avatar1}
                                          source={require("../assets/camera.png")}
                                        />
                                      ) : (
                                        <Image
                                          style={styles.avatar}
                                          source={this.state.avatarSource1}
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "column"
                                  }}
                                >
                                  <Label style={styles.label}>
                                  Back Image
                                  </Label>

                                  <TouchableOpacity
                                    onPress={e =>
                                      this.selectPhotoTapped("2", e)
                                    }
                                  >
                                    <View
                                      style={[
                                        styles.avatar,
                                        styles.avatarContainer,
                                        { marginBottom: 20 }
                                      ]}
                                    >
                                      {this.state.avatarSource2 === null ? (
                                        <Image
                                          style={styles.avatar2}
                                          source={require("../assets/camera.png")}
                                        />
                                      ) : (
                                        <Image
                                          style={styles.avatar}
                                          source={this.state.avatarSource2}
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>



                            <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  paddingLeft: 20
                                }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "column"
                                  }}
                                >
                                  <Label style={styles.label}>
                                    <Text style={styles.required}>*</Text>

                                    Left Image
                                  </Label>

                                  <TouchableOpacity
                                    onPress={e =>
                                      this.selectPhotoTapped("3", e)
                                    }
                                  >
                                    <View
                                      style={[
                                        styles.avatar,
                                        styles.avatarContainer,
                                        { marginBottom: 20 }
                                      ]}
                                    >
                                      {this.state.avatarSource3 === null ? (
                                        <Image
                                          style={styles.avatar2}
                                          source={require("../assets/camera.png")}
                                        />
                                      ) : (
                                        <Image
                                          style={styles.avatar}
                                          source={this.state.avatarSource3}
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "column"
                                  }}
                                >
                                  <Label style={styles.label}>
                          Right Image
                                  </Label>

                                  <TouchableOpacity
                                    onPress={e =>
                                      this.selectPhotoTapped("4", e)
                                    }
                                  >
                                    <View
                                      style={[
                                        styles.avatar,
                                        styles.avatarContainer,
                                        { marginBottom: 20 }
                                      ]}
                                    >
                                      {this.state.avatarSource4 === null ? (
                                        <Image
                                          style={styles.avatar2}
                                          source={require("../assets/camera.png")}
                                        />
                                      ) : (
                                        <Image
                                          style={styles.avatar}
                                          source={this.state.avatarSource4}
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            

          <View style={{flex:1,alignItems:'center'}}>
         {
           /**
            * <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={e =>
                this.selectPhotoTapped("1", e)
              }
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            // onPress= {this.selectPhotoTapped('2',e)}
            onPress={e =>
                this.selectPhotoTapped("2", e)
              }
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Right Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={e =>
                this.selectPhotoTapped("3", e)
              }
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Back Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={e =>
                this.selectPhotoTapped("4", e)
              }
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Left Image
         
            </Text>
          </TouchableOpacity> 
            * 
            */
         }
          
          {/* <TouchableOpacity
            style={styles.customBtnDNG}
            onPress= {this.handleChoosePhoto}
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Fifth Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={this.selectPhotoTapped}
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Sixth Image
         
            </Text>
          </TouchableOpacity>  */}







          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={this.SubmitData}
        
            
          >
            <Text style={styles.customBtnText}>
            Submit
         
            </Text>
          </TouchableOpacity> 
      
          </View>
          
          </ScrollView>
    
    
     </View>
    );
  }
}
const styles = StyleSheet.create({
  label:{
    color:'#000',
    fontSize:13,
    fontWeight:'bold',
    paddingVertical: 3,
  },
        customBtnDNG: {
            backgroundColor: "#9ec54d",
            // paddingHorizontal: 30,
            // paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
             marginTop:10,
            width:'90%',
            height:50,
            // marginBottom:10,
          },
          customBtnText: {
            fontSize: 20,
            fontWeight: "300",
            alignItems: "center",
            justifyContent: "center",
        
            color: "#fff"
          },
          avatarContainer: {
            backgroundColor: "#F8F9FC",
        
            borderColor: "#bdbdbd",
            borderWidth: 3,
            justifyContent: "center",
            alignItems: "center"
          },
          avatar: {
            borderRadius: 75,
            width: 100,
            height: 100
          },
        
    


})