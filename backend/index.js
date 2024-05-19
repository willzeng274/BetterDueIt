const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const saltRounds = 10;
const cors = require("cors");
const { ethers } = require("ethers");
const path = require("path");

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:9650/ext/bc/BDSubnet/rpc");

require("dotenv").config();

const apiKey = process.env.apiKey;
const senderPrivateKey = process.env.privateKey;
const wallet = new ethers.Wallet(senderPrivateKey, provider);

const app = express();

app.use(
	cors({
		origin: "*",
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.use((req, res, next) => {
	console.log("Received request");
	// res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self'");
	next();
});
// app.use('/', express.static("template"));

const validateUser = (password, hash) => bcrypt.compare(password, hash);

// app.use("/", (req, res, next))

const validatePassword = (wallet, password) => {
	const filterString = queryString.stringify({
		filter: JSON.stringify({
			wallet: wallet,
		}),
	});
	const url = `https://us-east-2.aws.neurelo.com/rest/users?${filterString}&take=1`;
	return fetch(url, {
		method: "GET",
		headers: {
			"X-API-KEY": apiKey,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			if (data.data.length) {
				// console.log("yo length");
				return validateUser(password, data.data[0].password)
					.then((result) => {
						// console.log("Result", result);
						if (!result) {
							throw Error("Incorrect password");
						}
						// _storeData;
						return true;
					})
					.catch((err) => {
						throw Error("Incorrect password format");
					});
			} else {
				throw Error("Bad Argument: User Not Found");
			}
		})
		.catch((error) => {
			throw Error(error.errors);
		});
};

app.post("/signup", (req, res) => {
	if (!req.body.wallet || !req.body.password || !req.body.name) {
		return res.status(400).json({
			message: "Missing wallet, password, or name field",
		});
	}
	// const filterString = queryString.stringify({ filter: JSON.stringify({
	//     "wallet": req.body.wallet;
	// })})
	const url = "https://us-east-2.aws.neurelo.com/rest/users/__one";

	bcrypt.hash(req.body.password, saltRounds).then((hash) => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": apiKey,
			},
			body: JSON.stringify({
				wallet: req.body.wallet,
				password: hash,
				name: req.body.name,
				streak: 0,
				bdcoin: 0,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				if (data.data) {
					res.json({
						message: "Successfully signed up",
					});
				} else {
					res.status(400).json({ message: "Something wrong happened", errors: data.errors });
				}
			})
			.catch((error) => res.status(400).json(error.errors));
	});
});

app.post("/posts/create", (req, res) => {
	// console.log(req.body);
	if (!req.body.date || !req.body.name || !req.body.wallet_id || !req.body.money) {
		return res.status(400).json({});
	}
	// console.log("Goated", req.headers, req.headers['x-wallet-id'], req.headers['x-password']);
	validatePassword(req.headers["x-wallet-id"], req.headers["x-password"])
		.then((_) => {
			// console.log("ok doing tsk")
			const url = "https://us-east-2.aws.neurelo.com/rest/tasks/__one";
			fetch(url, {
				method: "POST",
				headers: {
					"X-API-KEY": apiKey,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					completed: false,
					date: req.body.date,
					name: req.body.name,
					wallet_id: req.body.wallet_id,
					money: req.body.money,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					// console.log(data);
					res.json({
						data,
					});
				})
				.catch((error) => res.status(400).json(error.errors));
		})
		.catch((error) => console.log(error.message) && res.status(400).json({ message: "error" }));
});

app.get("/posts/fetch", (req, res) => {
	const filterString = queryString.stringify({ filter: JSON.stringify(req.query) });
	const url = `https://us-east-2.aws.neurelo.com/rest/tasks?${filterString}`;
	validatePassword(req.headers["x-wallet-id"], req.headers["x-password"])
		.then((_) => {
			fetch(url, {
				method: "GET",
				headers: {
					"X-API-KEY": apiKey,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					// console.log("Fetching posts", data);
					res.json(data.data);
				})
				.catch((error) => res.status(400).json(error.errors));
		})
		.catch((error) => console.log(error.message) && res.status(400).json({ message: "error" }));
});

app.patch("/posts/update/:id", (req, res) => {
	const url = `https://us-east-2.aws.neurelo.com/rest/tasks/${req.params.id}`;
	const { completed, date, name, wallet_id } = req.body;
	validatePassword(req.headers["x-wallet-id"], req.headers["x-password"])
		.then((_) => {
			const body = {};

			// Only add the fields that are present in req.body
			if (completed !== undefined) body.completed = completed;
			if (date !== undefined) body.date = date;
			if (name !== undefined) body.name = name;
			if (wallet_id !== undefined) body.wallet_id = wallet_id;
			fetch(url, {
				method: "PATCH",
				headers: {
					"X-API-KEY": apiKey,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((response) => response.json())
				.then((data) => {
					// console.log("Updated", data);
					res.json(data.data);
				})
				.catch((error) => res.status(400).json(error.errors));
		})

		.catch((error) => console.log(error.message) && res.status(400).json({ message: "error" }));
});

async function sendTransaction(wallet_id, amount) {
	try {
		// Convert the amount to wei
		//   const amountInWei = ethers.utils.parseEther(amount);

		// Create the transaction object
		//   console.log("Sending", amountInWei);
		const amountInWei = ethers.utils.parseEther(amount.toString());

		// Create the transaction object
		const tx = {
			to: wallet_id,
			value: amountInWei,
			gasLimit: ethers.utils.hexlify(21000), // Gas limit for a standard transaction
			gasPrice: await wallet.provider.getGasPrice(), // Get the current gas price
		};

		// Send the transaction
		//   console.log(wallet);
		const transaction = await wallet.sendTransaction(tx);

		// Wait for the transaction to be mined
		//   console.log(transaction);
		const receipt = await transaction.wait();

		console.log(receipt);

		console.log(`Transaction successful with hash: ${transaction.hash}`);
	} catch (error) {
		console.error(`Error sending transaction: ${error.message}`);
	}
}

app.delete("/posts/delete/:id", (req, res) => {
	const url = `https://us-east-2.aws.neurelo.com/rest/tasks/${req.params.id}`;
	validatePassword(req.headers["x-wallet-id"], req.headers["x-password"])
		.then((_) => {
			fetch(url, {
				method: "DELETE",
				headers: {
					"X-API-KEY": apiKey,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					// console.log("Delete", data.data.wallet_id);
                    console.log("Wallet", data.data.wallet_id);
					sendTransaction("0x4d66D0C84d3F0D7274b3aa4215e9f7e1d1896CB2", data.data.money.toString());
					res.json({
						message: "Successfully deleted task",
					});
				})
				.catch((error) => res.status(400).json(error.errors));
		})
		.catch((error) => console.log(error.message) && res.status(400).json({ message: "error" }));
});

// useless
app.post("/login", (req, res) => {
	if (!req.body.wallet || !req.body.password) {
		return res.status(400).json({
			message: "Missing wallet or password field",
		});
	}
	const filterString = queryString.stringify({
		filter: JSON.stringify({
			wallet: req.body.wallet,
		}),
	});
	const url = `https://us-east-2.aws.neurelo.com/rest/users?${filterString}&take=1`;
	fetch(url, {
		method: "GET",
		headers: {
			"X-API-KEY": apiKey,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			if (data.data.length) {
				return validateUser(req.body.password, data.data[0].password)
					.then((result) => {
						if (!result) {
							return res.status(400).json(false);
						}
						res.json(true);
					})
					.catch((err) => res.status(400).json(false));
				// res.json(data.data[0]);
			}
			res.status(400).json(false);
		})
		.catch((error) => res.json(false));
});

app.listen(process.env.PORT || "3000", () => {
	console.log("Server Started!");
});
