import React, { useContext, useEffect, useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	Button,
	Alert,
	TouchableOpacity,
	Modal,
	Animated,
	Easing,
} from "react-native";
import { Task } from "@/components/Task";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, TaskContext } from "@/constants/Context";

function isEthereum() {
	if (window.ethereum) return true;

	return false;
}

async function sendEther(fromAccount, toAccount, amount) {
  let transactionHash = "";

  if (isEthereum()) {
    try {
      // Convert the amount to Wei (1 Ether = 1e18 Wei)
      const amountInWei = (amount * 1e18).toString();

      // Create the transaction parameters
      const transactionParameters = {
        from: fromAccount,
        to: toAccount,
        value: "0x" + parseInt(amountInWei).toString(16),
        // gas and gasPrice can be specified here if needed
        // gas: '0x5208', // 21000 Gwei
        // gasPrice: '0x09184e72a000', // 10000000000000 wei
      };

      // Send the transaction
      transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      return { transactionHash, err: false };
    } catch (err) {
      console.error("Error sending transaction:", err);
      return { transactionHash, err: true };
    }
  }

  return { transactionHash, err: true };
}

const Tasks = () => {
	const { tasks, setTasks } = useContext(TaskContext);
  const { wallet } = useContext(AuthContext);
	const [newTaskName, setNewTaskName] = useState("");
	const [newTaskDate, setNewTaskDate] = useState(new Date());
	const [newMoneyValue, setNewMoneyValue] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
	const [slideAnim] = useState(new Animated.Value(0));

	const addTask = async () => {
		if (!newTaskName || isNaN(newMoneyValue)) {
			Alert.alert("Error", "Please enter a task name and a valid money value");
			return;
		}

		if (currentTaskIndex === null) {
			if (isEthereum()) {
				const result = await sendEther(wallet, "0xCb4Df5Ec6F477e3d4B5E36c5dC799151d9D2C4A3", +newMoneyValue);
        if (result.err) {
          return;
        }
			}
			fetch("http://localhost:3000/posts/create", {
				method: "POST",
				headers: {
					"X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
					"X-Password": "test",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: newTaskName,
					date: newTaskDate,
					money: +newMoneyValue,
					wallet_id: "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					const newTask = data.data.data;
					const updatedTasks =
						currentTaskIndex !== null
							? tasks.map((task, index) => (index === currentTaskIndex ? newTask : task))
							: [...tasks, newTask];
					setTasks(updatedTasks);
					setNewTaskName("");
					setNewTaskDate(new Date());
					setNewMoneyValue(0);
					closeModal();
				})
				.catch((error) => console.error(error));
		} else {
			// alert("Updating");
			console.log(newTaskName, newTaskDate, +newMoneyValue);
			fetch(`http://localhost:3000/posts/update/${tasks[currentTaskIndex].id}`, {
				method: "PATCH",
				headers: {
					"X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
					"X-Password": "test",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: newTaskName,
					date: newTaskDate,
					money: +newMoneyValue,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					const newTask = data;
					const updatedTasks =
						currentTaskIndex !== null
							? tasks.map((task, index) => (index === currentTaskIndex ? newTask : task))
							: [...tasks, newTask];
					setTasks(updatedTasks);
					setNewTaskName("");
					setNewTaskDate(new Date());
					setNewMoneyValue(0);
					closeModal();
				})
				.catch((error) => console.error(error));
		}
	};

	const editTask = async (index: number) => {
		try {
			setCurrentTaskIndex(index);
			setNewTaskName(tasks[index].name);
			setNewTaskDate(tasks[index].date);
			setNewMoneyValue(tasks[index].money);
			openModal();
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const deleteTask = async (index: number) => {
		try {
			// alert("Fetching delete");
			const response = await fetch(`http://localhost:3000/posts/delete/${tasks[index].id}`, {
				method: "DELETE",
				headers: {
					"X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
					"X-Password": "test",
				},
			});
			const data = await response.json();
			console.log(data);

			const updatedTasks = tasks.filter((_, i) => i !== index);
			setTasks(updatedTasks);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const toggleTaskCompletion = (index: number) => {
		const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
		fetch(`http://localhost:3000/posts/update/${tasks[index].id}`, {
			method: "PATCH",
			headers: {
				"X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
				"X-Password": "test",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				completed: updatedTasks[index].completed,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setTasks(updatedTasks);
			})
			.catch((error) => console.error(error));
	};

	const onDateChange = (event, selectedDate) => {
		if (selectedDate) {
			setNewTaskDate(selectedDate);
		}
		setShowDatePicker(false);
	};

	const openModal = () => {
		setModalVisible(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			easing: Easing.out(Easing.poly(4)),
			useNativeDriver: true,
		}).start();
	};

	const closeModal = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			easing: Easing.out(Easing.poly(4)),
			useNativeDriver: true,
		}).start(() => {
			setModalVisible(false);
			setCurrentTaskIndex(null);
		});
	};

	const modalSlide = {
		transform: [
			{
				translateY: slideAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [600, 0],
				}),
			},
		],
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
						onEdit={() => editTask(index)}
						onDelete={() => deleteTask(index)}
					/>
				))}
				{tasks.length ? <></> : <Text style={{ textAlign: "center" }}>No tasks</Text>}
			</ScrollView>
			<TouchableOpacity style={styles.fab} onPress={openModal}>
				<Ionicons name="add" size={24} color="white" />
			</TouchableOpacity>
			{modalVisible && (
				<Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
					<View style={styles.modalOverlay}>
						<Animated.View style={[styles.modalContainer, modalSlide]}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>{currentTaskIndex !== null ? "Edit Task" : "Add New Task"}</Text>
								<TextInput style={styles.input} placeholder="Task Name" value={newTaskName} onChangeText={setNewTaskName} />
								<TextInput
									style={styles.input}
									placeholder="Money Per Task"
									value={newMoneyValue}
									onChangeText={setNewMoneyValue}
									keyboardType="numeric"
								/>
								<TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
									<Text style={styles.datePickerButtonText}>Select Date</Text>
								</TouchableOpacity>
								{showDatePicker && (
									<DateTimePicker
										testID="dateTimePicker"
										value={newTaskDate}
										mode="datetime"
										// is24Hour={true}
										display="default"
										onChange={onDateChange}
									/>
								)}
								<View style={styles.modalButtons}>
									<Button title="Back" onPress={closeModal} />
									<Button title={currentTaskIndex !== null ? "Save Task" : "Add Task"} onPress={addTask} />
								</View>
							</View>
						</Animated.View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
	},
	modalView: {
		width: "100%",
	},
	modalText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	input: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 8,
		marginBottom: 8,
		borderRadius: 4,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	datePickerButton: {
		backgroundColor: "#007AFF",
		padding: 8,
		borderRadius: 4,
		marginBottom: 8,
	},
	datePickerButtonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
	fab: {
		position: "absolute",
		right: 16,
		bottom: 16,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#007AFF",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
	},
});

export default Tasks;
