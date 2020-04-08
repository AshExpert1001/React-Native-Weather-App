import React, {Component} from 'react';
import { View, Alert, Image, StyleSheet, AsyncStorage } from 'react-native';
import Header from './Header';
import { Card, Title } from 'react-native-paper';


class Home extends Component {
  state={
    info:{
      name:"loading...",
      temp:"",
      humidity:"",
      desc:"",
      icon:""
    }
  }
  async getWeather(){
     MyCity = await AsyncStorage.getItem("newcity");
    //  console.log(MyCity)
     if(!MyCity){
       MyCity=this.props.route.params.newcity
     }
     else if (MyCity==''){
        MyCity='pune'
     }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=a552bbacdd8190eca3d969550f815626&units=metric`)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      this.setState({
        info:{
          name:data.name,
          temp:data.main.temp,
          humidity:data.main.humidity,
          desc:data.weather[0].description,
          icon:data.weather[0].icon
        }
      })
      // console.log(this.state)
    })
    .catch(err=>{
      Alert.alert("Please check your internet connection")
    })
  }
  componentDidMount(){
    this.getWeather()
  }
  render(){
    if(this.props.route.params){
      this.getWeather()  
    }
    // console.log(this.props.route.params)
    return (
      <View style={{backgroundColor:'#dad8d8', flex:1}}>
        <Header title="Current city"/>
        <Card style={styles.card}>
          <View>
            <Title style={styles.title}>{this.state.info.name}</Title>
            <Image
              style={{width:160,height:160, alignItems:'center'}}
              source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
            />
            <Title style={styles.text}>Temp : {this.state.info.temp}&deg;C</Title>
            <Title style={styles.text}>"{this.state.info.desc}"</Title>
            <Title style={styles.text}>Humidity : {this.state.info.humidity}%</Title>
          </View>
        </Card>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({

  card:{
  marginTop:"28%",
  margin:30,
  elevation: 5, 
  borderRadius:25,
  padding:20,
  alignItems:"center"
},
title:{
  margin:10,
  fontSize:32,
  padding:12,
  textTransform:'uppercase',
  color:"#ff6637"
},
text:{
  padding:10,
  fontSize:22,
  textTransform:'capitalize'
}
})

