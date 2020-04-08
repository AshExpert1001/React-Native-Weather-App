import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, AsyncStorage} from 'react-native';
import {TextInput, Card, List, Button } from 'react-native-paper';
import Header from './Header';

class Search extends Component{
  state = {
    text: '',
    cities:[]
  };
  async buttonpress(){
    this.props.navigation.navigate('Current City', {newcity:this.state.text})
    await AsyncStorage.setItem("newcity",this.state.text)
  }
  async listpress(name){
    this.setState({text:name})
    await AsyncStorage.setItem("newcity",this.state.text)
    this.props.navigation.navigate('Current City', {newcity:this.state.text})

  }
  fetchCities(text){
    this.setState({ text })
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data=>data.json())
    .then(city =>{
      this.setState({
        cities:city.RESULTS.slice(0,15)
      })
    }).catch(err=>{
      Alert.alert("Please check your internet connection")
    })
  }

  render(){
     viewCity=<Card style={styles.card}><List.Item title="No Cities"/></Card>
    if(this.state.cities.length>0){
      viewCity=this.state.cities.map(city=>{
        return(
          <Card style={styles.card} key={city.name} onPress={()=>this.listpress(city.name)}>
            <List.Item title={city.name}/>
          </Card>
        );
      })
    }

    return (
    <View style={styles.container}>
      <Header title="Select City"/>
      <TextInput
        label='Search City'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button 
            icon="heart" 
            style={{margin:5, padding:7, backgroundColor:'#ff6637', }}
            mode="contained" onPress={()=>{this.buttonpress()}} >
                Select City
            </Button>
      <ScrollView>
        {viewCity}
      </ScrollView>
    </View>
  );
}
}
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dad8d8',
  },
  card: {
    margin:5, 
    padding: 5
  }
});
