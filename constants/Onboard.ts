function isEthereum() {
    if (window.ethereum) return true;

    return false;
}

function getChainID() {
    if (isEthereum()) return parseInt(window.ethereum.chainId, 16);

    return 0;
}

// async function handleConnection(accounts) {
//     if (accounts.length === 0) {
//         const fetchedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//         return fetchedAccounts;
//     }

//     return accounts;
// }

async function requestAccount() {
    let currentAccount = 0x0;

    if (isEthereum() && getChainID() !== 0) {
        let accounts = await window.ethereum.request({ method: 'eth_accounts' });
        accounts = await handleConnection(accounts);
        currentAccount = accounts[0];
    }

    return currentAccount;
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

export const GetParams = async () => {
    const response = {
        isError: false,
        message: '',
        step: -1,
        balance: 0,
        account: '0x0',
    };

    if (!isEthereum()) {
        response.step = 0;

        return response;
    }

    const currentAccount = await requestAccount();
    if (currentAccount === 0x0) {
        response.step = 1;

        return response;
    }

    response.account = currentAccount;

    if (getChainID() !== 43113) {
        response.step = 2;

        return response;
    }

    const { currentBalance, err } = await requestBalance(currentAccount);
    if (err) {
        response.isError = true;
        response.message = 'Error fetching balance!';

        return response;
    }

    response.balance = currentBalance;

    if (currentBalance < 0.2) {
        response.step = 3;

        return response;
    }

    return response;
};

export async function SwitchNetwork() {
    await window?.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: '0xA869',
            chainName: 'Fuji C-Chain',
            nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18,
            },
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://testnet.snowtrace.io'],
        }],
    }).catch((error) => {
        console.log(error);
    });
}

async function sendEther(fromAccount, toAccount, amount) {
    let transactionHash = '';

    if (isEthereum()) {
        try {
            // Convert the amount to Wei (1 Ether = 1e18 Wei)
            const amountInWei = (amount * 1e18).toString();

            // Create the transaction parameters
            const transactionParameters = {
                from: fromAccount,
                to: toAccount,
                value: '0x' + parseInt(amountInWei).toString(16),
                // gas and gasPrice can be specified here if needed
                // gas: '0x5208', // 21000 Gwei
                // gasPrice: '0x09184e72a000', // 10000000000000 wei
            };

            // Send the transaction
            transactionHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            return { transactionHash, err: false };
        } catch (err) {
            console.error('Error sending transaction:', err);
            return { transactionHash, err: true };
        }
    }

    return { transactionHash, err: true };
}