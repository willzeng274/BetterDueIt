import { StyleSheet, ScrollView, View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useContext, useMemo } from "react";
import { TaskContext } from "@/constants/Context";

export default function TabFourScreen(props: { user_name: string; tasks_completed: number }) {

  const { tasks } = useContext(TaskContext);

  const completed = useMemo(() => tasks.reduce((count, task) => {
    return count + (task.completed ? 1 : 0);
  }, 0), [tasks]);

	const leaderboardData = [
		{ user_name: "Bob", tasks_completed: 3 },
		{ user_name: "Daniel", tasks_completed: 5 },
		{ user_name: "Emily", tasks_completed: 10 },
		{ user_name: "Angela", tasks_completed: 2 },
    { user_name: "You", tasks_completed: completed }
	];

	leaderboardData.sort((a, b) => b.tasks_completed - a.tasks_completed);
  const userIndex = leaderboardData.findIndex((item) => item.user_name === "You") + 1;
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false}>
				<View style={styles.innerContainer}>
					<Text style={styles.title}>Leaderboard</Text>
					<View style={styles.rankContainer}>
						<View style={[
                styles.rankBox,
                userIndex-1 < 3 && styles.medalBox,
                userIndex-1 === 0 && styles.goldBox,
                userIndex-1 === 1 && styles.silverBox,
                userIndex-1 === 2 && styles.bronzeBox,
              ]}>
							<Text style={styles.rankText}>
								{userIndex}
							</Text>
						</View>
						<View style={styles.userInfo}>
							<Text style={styles.username}>{"You"}</Text>
							<Text style={styles.tasksCompleted}>{props.tasks_completed}</Text>
							<Text style={styles.tasksCompletedText}>{completed} Tasks Completed</Text>
						</View>
					</View>
					<View
						style={{
							borderBottomColor: "black",
							borderBottomWidth: StyleSheet.hairlineWidth,
              height: 5,
              backgroundColor: 'black',
              width: '100%'
						}}
					/>
					{leaderboardData.map((item, index) => {
						return (
							<View key={index.toString()} style={styles.rankContainer}>
								<View
									style={[
										styles.rankBox,
										index < 3 && styles.medalBox,
										index === 0 && styles.goldBox,
										index === 1 && styles.silverBox,
										index === 2 && styles.bronzeBox,
									]}
								>
									<Text style={styles.rankText}>{index + 1}</Text>
								</View>
								<View style={[styles.userInfo, { flex: 1, backgroundColor: "#F5F5F5" }]}>
									<Text style={styles.username}>{item.user_name}</Text>
									<Text style={styles.tasksCompleted}>{item.tasks_completed}</Text>
									<Text style={styles.tasksCompletedText}> Tasks Completed</Text>
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	separator: {
		width: "100%",
		backgroundColor: "black",
		height: 3,
	},
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	rankContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
		width: "100%",
		justifyContent: "flex-end",
	},
	rankBox: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},
	medalBox: {
		backgroundColor: "#F5F5F5",
	},
	goldBox: {
		backgroundColor: "gold",
	},
	silverBox: {
		backgroundColor: "silver",
	},
	bronzeBox: {
		backgroundColor: "#CD7F32",
	},
	rankText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	userInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		backgroundColor: "#F5F5F5",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	username: {
		marginLeft: 10,
		fontSize: 16,
	},
	tasksCompletedText: {
		fontSize: 14,
		color: "gray",
	},
	tasksCompleted: {
		marginLeft: "auto",
		fontSize: 14,
		color: "gray",
		fontWeight: "bold",
	},
});
