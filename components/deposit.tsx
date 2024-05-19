import { Avalanche } from 'avalanche/dist/apis/avalanche';
import { Wallet } from '@avalanche-sdk/wallet';

const avalanche = new Avalanche('https://api.avax.network');
const wallet = new Wallet(window.ethereum);

export async function initiateTransfer() {
  if (!wallet.isConnected()) {
    console.error('Please connect your wallet');
    return;
  }

  const recipientAddress = '0xe4427e46b7B1231e839cAF5d5Fe546Fa901f12dF';
  const amount = 10;
  const assetID = 'AVAX';

  try {
    const tx = await wallet.sendTransaction({
      recipientAddress,
      amount,
      assetID,
    });

    console.log('Transaction initiated:', tx);
  } catch (err) {
    console.error('Error initiating transaction:', err);
  }
}