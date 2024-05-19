import LoginBtn from "@/components/Login";
import storage from "@/constants/Storage";
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput } from "react-native";
// import { useSDK } from "@metamask/sdk-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/constants/Context";
import { Link } from "expo-router";

export default function LoginPrompt() {
	// const { sdk, account, chainId } = useSDK();
	const { wallet, setWallet, password, setPassword } = useContext(AuthContext);

	// const connectWallet = async () => {
	//     try {
	//         await sdk?.connect();
	//     } catch (error) {
	//         alert("Failed to connect wallet:" + error);
	//     }
	// };

	// useEffect(() => {

	//     // Use the account and chainId returned by useSDK.
	//     if (account && chainId) {
	//         // Handle account and network changes.
	//     }
	// }, [account, chainId]);

	// const disconnectWallet = async () => {
	//     await sdk?.disconnect();
	// };

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				{wallet === "" ? (
					<Button title="Connect Wallet" onPress={() => setWallet("0x4d66D0C84d3F0D7274b3aa4215e9f7e1d1896CB2")} />
				) : (
					<>
						<TextInput style={{ textAlign: 'center' }} placeholder="Enter your password" secureTextEntry={true} value={password} onChangeText={setPassword} />
						<Link href="/home">Submit</Link>
					</>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: "center",
        alignItems: "center"
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
