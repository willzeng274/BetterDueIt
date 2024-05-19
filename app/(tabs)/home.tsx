// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import BalanceDisplay from '@/components/Home/BalanceDisplay';
import StatusDisplay from '@/components/Home/StatusDisplay';
import { NameDisplay } from '@/components/Home/NameDisplay';
// import { Task } from '@/components/Task';
// import { useContext } from 'react';
// import { TaskContext } from '@/constants/Context';


export default function HomeScreen() {
  
  // Fetch this data from database (Placeholder Values)
  const { tasks } = useContext(TaskContext);

  const completed = useMemo(() => tasks.reduce((count, task) => {
    return count + (task.completed ? 1 : 0);
  }, 0), [tasks]);
  // const {streak, setStreaks} = useState(0)

  // const tasks = [
  //   {
  //     name:'adajk',
  //     date: new Date('12-10-2024'),
  //     money: 50,
  //     completed: false
  //   },
  //   {
  //     name:'adajk',
  //     date: new Date('12-10-2024'),
  //     money: 50,
  //     completed: false
  //   }
  // ]
  
  // Fetch Data from MongoDB e.g. Streak, Progress Profile and pass it through to each
  return (
    <View style={styles.container}>
      <View style={styles.displaysContainer}>
        <NameDisplay />
        <BalanceDisplay coin={50} token={27.32} />
      </View>
      <StatusDisplay streak={5} progress={completed / tasks.length} />
      <App />
      {/* {tasks.map((task, index) => (
        <Task key={index} name={task.name} money={task.money} />
      ))} */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   displaysContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     justifyContent: 'space-between',
//     padding: 5,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

import React, { useContext, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, Button, Alert, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { Task } from '@/components/Task';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '@/constants/Context';

const App = () => {
  // const [tasks, setTasks] = useState([{name: "Sample Task", date: new Date(), money: 0}]);
  const { tasks, setTasks } = useContext(TaskContext);
  // const [streak, setStreak] = useState(0);

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    fetch(`http://localhost:3000/posts/update/${tasks[index].id}`, {
        method: 'PATCH',
        headers: {
          "X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
          "X-Password": "test",
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          completed: updatedTasks[index].completed
        })
      })
      .then((res) => res.json())
      .then((data) => {
        setTasks(updatedTasks);
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {tasks.map((task, index) => (
          <Task
            key={index}
            name={task.name}
            date={task.date}
            money={task.money}
            completed={task.completed}
            onToggleComplete={() => toggleTaskCompletion(index)}
          />
        ))}
        {tasks.length ? <></> : <Text style={{ textAlign: 'center' }}>No tasks</Text>}
      </ScrollView>
      {/* <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    marginTop: '-50%',
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modalView: {
    width: '100%',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  datePickerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  displaysContainer: {
    position: 'absolute',
    top: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 5,
    zIndex: 99,
    // marginTop: -100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});