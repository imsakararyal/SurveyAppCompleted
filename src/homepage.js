import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
import { Container, Header,Icon, Content,Picker,Title,Form, Item, Input, Label, Button, Body, Left,Right } from 'native-base';
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
          Before_Disaster:'',
          After_Disaster:'',
          avatar1data:'',
          avatar1type:'',

        };
      }
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
                //  console.log("Data from avatarno"+data);
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
            this.setState({
              avatarSource: source,
              avatar1data: data,
            avatar1type: type
            });
          }
        });
      }
  SubmitData=()=>{
      console.log('hi')
      RNFetchBlob.fetch(
        "POST",
        "http://192.168.10.10/nirmalmaster/collabrative/backend/masterproject/public/api/details",
        {
       
          //   Authorization : "Bearer access-token",
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
          { name: "disaster_timeline", data: this.state.Before_Disaster },
          { name: "disaster_timeline", data: this.state.After_Disaster },
  
          {
            name: "phot_1",
            filename: "document.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar1data)
          },
          {
            name: "photo_2",
            filename: "document.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar1data)
          },
          {
            name: "photo_3",
            filename: "document.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar1data)
          },
          {
            name: "photo_4",
            filename: "document.jpeg",
            filetype: "image/jpeg",
            data: RNFetchBlob.wrap(this.state.avatar1data)
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
         

        // if (jsonResponse.status == "success") {
        //   AsyncStorage.setItem(
        //     "savedPoint",
        //     jsonResponse.value.point.toString()
        //   );
        //   AsyncStorage.setItem("savedStatus", jsonResponse.value.status);
        //   AsyncStorage.setItem(
        //     "savedHomeowner",
        //     jsonResponse.homeowner.id.toString()
        //   );
        //   Toast.show({
        //     text: "Homeowner Form sucessfully submitted",
        //     buttonText: "Okay",
        //     type: "success",
        //     duration: 3000
        //   });
        //   this.setState({
        //     loadingSubmit: false
        //   });
        //   //  this.props.navigation.navigate("BasicFormPart2");
        // } else {
        //   Toast.show({
        //     text: "Problem in sending Data.Please Try Again",
        //     buttonText: "Okay",
        //     type: "danger",
        //     duration: 3000
        //   });
        //   this.setState({
        //     loadingSubmit: false
        //   });
        // }
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
            <Item floatingLabel>
              <Label>Enter Name</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Enter address</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Enter Phone No</Label>
              <Input />
            </Item>
            <Text style={{marginLeft:15, fontSize: 17,color:'#000000'}}>Disaster Time
            </Text>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{marginLeft:7 }}
              selectedValue={this.state.selected}
            //   onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Before Disaster" value="key0" />
              <Picker.Item label="After Disaster" value="key1" />
             
            </Picker>
            <Item floatingLabel>
              <Label>Enter Description</Label>
              <Input />
            </Item>
          </Form>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
         
          <TouchableOpacity
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
    


})