import React from 'react';
import { StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';


const Header = (props) =>{
    return (
      <Appbar.Header style={{backgroundColor:"#fff"}} >
        <Appbar.Content
          style={styles.head}
          title="Weather App"
          subtitle={props.title}
        />
      </Appbar.Header>
    );
}
export default Header;


const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
  },
});