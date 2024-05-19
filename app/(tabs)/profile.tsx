import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, ImageBackground, Button } from "react-native";
import LoginBtn from "@/components/Login";
import { AuthContext } from "@/constants/Context";
import { router } from 'expo-router';

export default function ProfileScreen() {

  const { setWallet, setPassword } = useContext(AuthContext);

  const logout = () => {
    setWallet("");
    setPassword("");
    router.replace("/login");
  };

	return (
		<ImageBackground
			source={require("@/assets/images/bg2.png")}
			style={styles.backgroundImage}
		>
			<View style={styles.container}>
				<View style={styles.banner}>
					<View style={styles.circle}>
						<Text style={styles.text}>BetterDueIt</Text>
					</View>
					<View style={styles.wings}>
						<View style={[styles.wing, styles.leftWing]} />
						<View style={[styles.wing, styles.rightWing]} />
					</View>
				</View>
        <Button title="Logout" onPress={logout} />
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		padding: 20,
	},
	backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
	banner: {
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	circle: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: "#9370db",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		textShadowColor: "rgba(0, 0, 0, 0.5)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
    fontFamily: 'Satisfy_400Regular'
	},
	wings: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		top: 60,
	},
	wing: {
		width: 60,
		height: 150,
		backgroundColor: "#9370db",
		borderRadius: 30,
		transform: [{ rotate: "45deg" }],
	},
	leftWing: {
		transform: [{ rotate: "-45deg" }],
	},
	rightWing: {
		transform: [{ rotate: "225deg" }],
	},
});
