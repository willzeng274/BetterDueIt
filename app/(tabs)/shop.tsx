import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { SafeAreaView, StyleSheet, ScrollView, Image, ImageSourcePropType } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Svg, { Circle, Text as SvgText, Path } from "react-native-svg";
import BalanceDisplay from "@/components/Home/BalanceDisplay";
import { NameDisplay } from "@/components/Home/NameDisplay";
import { Button } from "react-native";

const DueCoin: React.FC = (props) => (
	// @ts-ignore
	<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={24} height={24} {...props}>
		<Circle cx={50} cy={50} r={32} fill="#4CAF50" stroke="#388E3C" strokeWidth={4} />
		<SvgText x={25} y={60} fill="#FFF" fontFamily="Arial, sans-serif" fontSize={50} fontWeight="bold">
			{"B"}
		</SvgText>
		<Path fill="#FFF" d="M55 30q20 20 0 40-20-20 0-40Z" />
		<Path fill="#4CAF50" d="M60 40q10 10 0 20-10-10 0-20Z" />
	</Svg>
);

interface ProductBoxProps {
	imageSource: ImageSourcePropType;
	price: number;
	bannerText: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ imageSource, price, bannerText }) => {
	return (
		<>
			<View style={styles1.banner}>
				<Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>{bannerText}</Text>
			</View>
			<View style={styles1.container}>
				<View style={styles.item}>
					<Image source={imageSource} style={styles1.image} />
				</View>
				<View style={styles.row}>
					<Text style={[styles.price, { textAlign: "center" }]}>{price}</Text>
					<DueCoin />
				</View>
			</View>
		</>
	);
};

function BuyBox() {
	return (
		<View style={styles.container}>
			<View style={styles.item}>
				<FontAwesome5 name="shopping-cart" size={24} color="#1F57E0" style={styles.icon} />
				<Text style={styles.text}>10x VALUE!</Text>
			</View>
		</View>
	);
}

export default function ShopScreen() {
	const im1: ImageSourcePropType = require("@/assets/images/bg1.png");
	const im2: ImageSourcePropType = require("@/assets/images/bg2.png");
	const im3: ImageSourcePropType = require("@/assets/images/bg3.png");
	const im4: ImageSourcePropType = require("@/assets/images/bg4.png");
	const im5: ImageSourcePropType = require("@/assets/images/bg5.png");
	const im6: ImageSourcePropType = require("@/assets/images/bg6.png");

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.displaysContainer}>
				<NameDisplay />
				<BalanceDisplay coin={50} token={27.32} />
			</View>
			<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<View style={styles.container}>
					<View>
						<BuyBox />
					</View>
					<View>
						{/* Color the Sky! */}

						<ProductBox imageSource={im1} price={10} bannerText="Color the Sky!" />
						{/* Light Christmas! */}
						<ProductBox imageSource={im2} price={20} bannerText="Light Christmas!" />
						{/* Rivals Forever! */}
						<ProductBox imageSource={im3} price={15} bannerText="Rivals Forever!" />
						{/* Flowers of Water! */}
						<ProductBox imageSource={im4} price={20} bannerText="Flowers of Water" />
						{/* Synthwave! */}
						<ProductBox imageSource={im5} price={15} bannerText="Synthwave!" />

						<ProductBox imageSource={im6} price={18} bannerText="Violet Sky" />
					</View>
					<View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles1 = StyleSheet.create({
	banner: {
		backgroundColor: "#0087e8",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "gold",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	container: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 0,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#1F57E0",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 10.4,
		elevation: 5,
		marginBottom: 20,
		width: 350,
	},
	image: {
		width: 350,
		height: 200,
		borderStyle: "solid",
		borderBlockColor: "black",
		borderRadius: 10,
		marginBottom: 2,
		borderBottomStartRadius: 0,
		borderBottomEndRadius: 0,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

const styles = StyleSheet.create({
	displaysContainer: {
		position: "absolute",
		top: 50,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
		padding: 5,
		zIndex: 50,
		// marginTop: -100,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "stretch",
		padding: 20,
		flexDirection: "column",
		backgroundColor: "white",
		zIndex: 40,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	item: {
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 10,
		// marginTop: 10,
		borderRadius: 20,
		borderBottomStartRadius: 0,
		borderBottomEndRadius: 0,
	},
	icon: {
		marginRight: 10,
	},
	price: {
		fontSize: 20,
		fontWeight: "bold",
	},
	text: {
		fontSize: 20,
		padding: 5,
		fontWeight: "bold",
		textAlign: "center",
	},
});
