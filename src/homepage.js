import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-picker';
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
          address:'',
          Description:'',
          Before_Disaster:'',
          After_Disaster:'',

        };
      }
      selectPhotoTapped=()=> {
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
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source,
            });
          }
        });
      }
      SendAllData = () => {

        fetch('', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Usrname: '',
                        address: '',
                        Phone:'',
                        Description:'',
                        After_Disaster:'',
                        Before_Disaster:'',
                    })
                })
        
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log("RESULTS HERE:", responseData)
        
                    this.setState({
                  isLoading: false,
                  dataSource: responseJson,
                }, function(){
        
                });
              })
              .catch((error) =>{
                console.error(error);
              }) 
        };
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
            onPress={this.selectPhotoTapped}
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress= {this.selectPhotoTapped}
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Right Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={this.selectPhotoTapped}
        
            
          >
            <Text style={styles.customBtnText}>
            Click to Get Back Image
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress= {this.selectPhotoTapped}
        
            
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
            onPress={this.SendAllData}
        
            
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