import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { TaskContext } from "@/constants/Context";
// import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const tabs: Array<[string, React.ComponentProps<typeof FontAwesome>["name"]]> = [
		["shop", "shopping-cart"],
		["tasks", "tasks"],
		["home", "home"],
		["leaderboard", "star"],
		["profile", "address-book"],
	];
	const [loaded, setLoaded] = useState<boolean>(false);

	const [tasks, setTasks] = useState<
		{
			name: string;
			date: Date;
			money: number;
			completed: boolean;
			id: string;
		}[]
	>([]);

	useEffect(() => {
		fetch(
			`http://localhost:3000/posts/fetch?${new URLSearchParams({
				wallet_id: "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
			}).toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
          "X-Wallet-Id": "0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967",
          "X-Password": "test",
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched", data);
				setTasks(data);
        setLoaded(true);
			});
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks,
				setTasks,
			}}
		>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
						headerShown: false,
						// Disable the static render of the header on web
						// to prevent a hydration error in React Navigation v6.
						// headerShown: useClientOnlyValue(false, true),
					}}
				>
					{tabs.flatMap((t) => (
						<Tabs.Screen
							key={t[0]}
							name={t[0]}
							options={{
								title: "",
								tabBarIcon: ({ color }) => <TabBarIcon name={t[1]} color={color} />,
							}}
						/>
					))}
					<Tabs.Screen name="index" options={{ href: null }} />
				</Tabs>
		</TaskContext.Provider>
	);
}
