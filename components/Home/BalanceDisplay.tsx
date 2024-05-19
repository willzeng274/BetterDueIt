// BalanceDisplays.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { Link } from 'expo-router';

import Svg, { Circle, Text as SvgText, Path } from 'react-native-svg';
import { AuthContext } from '@/constants/Context';

const AvalancheIcon: React.FC = (props) => (
  <Svg
  // @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 1503 1504"
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M287 258h928v844H287z" />
    <Path
      fill="#E84142"
      fillRule="evenodd"
      d="M1502.5 752c0 414.77-336.23 751-751 751-414.766 0-751-336.23-751-751C.5 337.234 336.734 1 751.5 1c414.77 0 751 336.234 751 751Zm-963.812 298.86H392.94c-30.626 0-45.754 0-54.978-5.9-9.963-6.46-16.051-17.16-16.789-28.97-.554-10.88 7.011-24.168 22.139-50.735l359.87-634.32c15.313-26.936 23.061-40.404 32.839-45.385 10.516-5.35 23.062-5.35 33.578 0 9.778 4.981 17.527 18.449 32.839 45.385l73.982 129.144.377.659c16.539 28.897 24.926 43.551 28.588 58.931a109.562 109.562 0 0 1 0 51.289c-3.69 15.497-11.992 30.257-28.781 59.591L687.573 964.702l-.489.856c-16.648 29.135-25.085 43.902-36.778 55.042-12.73 12.18-28.043 21.03-44.832 26.02-15.313 4.24-32.47 4.24-66.786 4.24Zm368.062 0h208.84c30.81 0 46.31 0 55.54-6.08 9.96-6.46 16.23-17.35 16.79-29.15.53-10.53-6.87-23.3-21.37-48.323-.5-.852-1-1.719-1.51-2.601L1060.43 785.75l-1.19-2.015c-14.7-24.858-22.12-37.411-31.65-42.263a36.734 36.734 0 0 0-33.391 0c-9.594 4.981-17.342 18.08-32.655 44.462L857.306 964.891l-.357.616c-15.259 26.34-22.885 39.503-22.335 50.303.738 11.81 6.826 22.69 16.788 29.15 9.041 5.9 24.538 5.9 55.348 5.9Z"
      clipRule="evenodd"
    />
  </Svg>
);

const DueCoin: React.FC = (props) => (
  // @ts-ignore
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={24} height={24} {...props}>
    <Circle
      cx={50}
      cy={50}
      r={48}
      fill="#4CAF50"
      stroke="#388E3C"
      strokeWidth={4}
    />
    <SvgText
      x={25}
      y={60}
      fill="#FFF"
      fontFamily="Arial, sans-serif"
      fontSize={50}
      fontWeight="bold"
    >
      {"B"}
    </SvgText>
    <Path fill="#FFF" d="M55 30q20 20 0 40-20-20 0-40Z" />
    <Path fill="#4CAF50" d="M60 40q10 10 0 20-10-10 0-20Z" />
  </Svg>
);

function isEthereum() {
  if (window.ethereum) return true;

  return false;
}

async function requestBalance(currentAccount) {
  let currentBalance = 0;

  if (isEthereum()) {
      try {
          currentBalance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [currentAccount, 'latest'],
          });

          currentBalance = parseInt(currentBalance, 16) / 1e18;

          return { currentBalance, err: false };
      } catch (err) {
          return { currentBalance, err: true };
      }
  }

  return { currentBalance, err: true };
}

interface BalanceDisplaysProps {
  token: number;
  coin: number;
}

const BalanceDisplays: React.FC<BalanceDisplaysProps> = ({ token, coin }) => {

  const [actualTokens, setActualTokens] = useState<number>(token);
  const { wallet } = useContext(AuthContext);
  
  useEffect(() => {
    if (isEthereum()) {
      requestBalance(wallet)
        .then((bal) => setActualTokens(bal.currentBalance))
    }
  }, []);

  return (
    <View style={styles.balancesContainer}>
      <View style={styles.balanceContainer}>
        <Link href="/shop" style={styles.icon}>
          <FontAwesome name="plus-square" color={"green"} size={24} />
        </Link>
        <Text style={styles.amountText}>{parseFloat(actualTokens.toString()).toFixed(2)}</Text>
        <AvalancheIcon />
      </View>
      <View style={styles.balanceContainer}>
        <Link href="/shop" style={styles.icon}>
          <FontAwesome style={styles.icon} name="plus-square" color={"green"} size={24} />
        </Link>
        <Text style={styles.amountText}>{parseFloat(coin.toString()).toFixed(2)}</Text>
        <DueCoin />
        {/* <FontAwesome5 styles={styles.currencyIcon} name="gem" color={"red"} size={22} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balancesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10, // Space between the two balances
  },
  icon: {
    // width: 24,
    // height: 24,
    marginHorizontal: 5,
  },
  currencyIcon: {
    // zIndex: 9999999,
  },
  amountText: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default BalanceDisplays;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// interface BalanceDisplayProps {
//   coins: number;
//   tokens: number;
// }

// const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ coins, tokens }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.item}>
//         <FontAwesome style={styles.icon} name="plus-square" color={"green"} size={24} />
//         <Text style={styles.balance1}>{coins.toFixed(2)}</Text>
//         <FontAwesome style={styles.currency1} name="bitcoin" color={"gold"} size={30} />
//       </View>
//       <View style={styles.item}>
//         <FontAwesome style={styles.icon} name="plus-square" color={"green"} size={24} />
//         <Text style={styles.balance2}>{tokens.toFixed(2)}</Text>
//         <FontAwesome5 style={styles.currency2} name="gem" color={"red"} size={22} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     flex: 1,
//     flexDirection: 'row',
//     top: 48,
//     right: 1,
//     alignItems: "flex-end",
//     justifyContent: "flex-start",
//   },
//   icon: {
//     zIndex: 5,
//   },
//   currency1: {
//     // marginLeft: -5,
//     // left: -22,
//     zIndex: 5,
//     // backgroundColor: 'rgba(0, 0, 0, 0.9)',
//   },
//   currency2: {
//     // marginLeft: -5,
//     // left: -30,
//     zIndex: 5,
//     // backgroundColor: 'rgba(0, 0, 0, 0.9)',
//   },
//   item: {
//     flex: 1,
//     flexDirection: 'row',
//     // marginRight: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   balance1: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     padding: 5,
//     paddingLeft: 12,
//     paddingRight: 24,
//     borderTopEndRadius: 100,
//     borderBottomEndRadius: 100,
//     // borderRadius: 5,
//     height: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     zIndex: 4,
//   },
//   balance2: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     padding: 5,
//     paddingLeft: 12,
//     paddingRight: 36,
//     borderTopEndRadius: 25,
//     borderBottomEndRadius: 100,
//     // borderRadius: 5,
//     height: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     zIndex: 4,
//   },
// });

// export default BalanceDisplay;
