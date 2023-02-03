import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Animatable from "react-native-animatable";

import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState, useEffect } from "react";

import TaskList from "./src/components/TaskList";

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  //buscando as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem("@task");

      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  //salva as tarefas caso uma seja alterada
  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem("@task", JSON.stringify(task));
    }

    saveTasks();
  }, [task]);

  function handleAdd() {
    if (input === "") return;
    const data = {
      key: input,
      task: input,
    };

    setTask([...task, data]);
    setOpen(false);
    setInput("");
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.view}>
        <Text style={styles.text}>Tarefas</Text>
      </View>

      <FlatList
      
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item}  handleDelete={handleDelete}/>}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons name="md-arrow-back" size={40} color="#f5f5f5" />
            </TouchableOpacity>
            <Text style={styles.textModal}>Adicionar tarefas</Text>
          </View>
          <Animatable.View
            style={styles.modalBody}
            animation="fadeInUp"
            useNativeDriver
          >
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="Adicionar tarefa"
              style={styles.inputModal}
              value={input}
              onChangeText={(text) => setInput(text)}
            />

            <TouchableOpacity style={styles.btnCadastro} onPress={handleAdd}>
              <Text style={styles.textCadastro}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.btn} onPress={() => setOpen(true)}>
        <Ionicons name="add" size={40} color="#1b2430" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
  },
  view: {
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    color: "#fff",
  },
  btn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: "#1b2430",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textModal: {
    fontSize: 25,
    color: "#fff",
    marginLeft: 20,
  },
  modalBody: {
    marginTop: 15,
  },
  inputModal: {
    fontSize: 15,
    color: "#121212",
    backgroundColor: "#f5f5f5",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    padding: 9,
    height: 90,
    textAlignVertical: "top",
    borderRadius: 10,
  },
  btnCadastro: {
    alignItems: "center",
    marginTop: 20,
  },
  textCadastro: {
    fontSize: 18,
    color: "#121212",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 15,
    shadowColor: "#000",
    elevation: 1,
    shadowOpacity: 0.2,
  },
});
