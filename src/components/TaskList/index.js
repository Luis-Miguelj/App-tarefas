import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";

// import Icon from '../../styled-components/style'

export default function TaskList({ data, handleDelete }) {

  const [confirm, setConfirm] = useState(false);

  function theme(){
    
  }

  return (
    <Animatable.View
      style={styles.container}
      animation="bounceInUp"
      useNativeDriver
    >
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="md-checkmark-circle" style={styles.confirmBtn}/>
      </TouchableOpacity>


      <View>
        <Text style={styles.text}> {data.task} </Text>
      </View>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => handleDelete(data)}
      >
        <Ionicons name="close-circle-outline" size={30} color="#999" />
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 5,
    flexDirection: "row",
    padding: 7,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  btn: {
    margin: 10,
  },
  text: {
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 20,
    color: "#121212",
  },
  closeBtn: {
    position: "absolute",
    right: 20,
  },
  confirmBtn:{
    color: '#999',
    fontSize: 30,
  },
});
