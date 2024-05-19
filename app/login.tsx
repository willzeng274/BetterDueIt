import LoginBtn from "@/components/Login";
import storage from "@/constants/Storage";
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput } from "react-native";
// import { useSDK } from "@metamask/sdk-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/constants/Context";
import { Link } from "expo-router";

function isEthereum() {
	if (window.ethereum) return true;

	return false;
}

function getChainID() {
	if (isEthereum()) return parseInt(window.ethereum.chainId, 16);

	return 0;
}

async function handleConnection(accounts) {
	if (accounts.length === 0) {
		const fetchedAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

		return fetchedAccounts;
	}

	return accounts;
}

async function requestAccount() {
	let currentAccount = 0x0;

	if (isEthereum() && getChainID() !== 0) {
		let accounts = await window.ethereum.request({ method: "eth_accounts" });
		accounts = await handleConnection(accounts);
		currentAccount = accounts[0];
	}

	return currentAccount;
}

export default function LoginPrompt() {
	// const { sdk, account, chainId } = useSDK();
	const { wallet, setWallet, password, setPassword } = useContext(AuthContext);

	const connectWallet = async () => {
		if (isEthereum()) {
			requestAccount()
				// @ts-ignore
				.then((acc) => setWallet(acc));
		} else {
			setWallet("0xd3057b9aB17b034ba5E5D69Dbf632d31c729C967");
		}
	};

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
					<Button title="Connect Wallet" onPress={connectWallet} />
				) : (
					<>
						<TextInput
							style={{ textAlign: "center" }}
							placeholder="Enter your password"
							secureTextEntry={true}
							value={password}
							onChangeText={setPassword}
						/>
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
		alignItems: "center",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
