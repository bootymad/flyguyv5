const stripe = require("stripe");
const stripeSession = stripe(process.env.STRIPE_KEY);

const parseCartItems = (cart) => {
	const keys = Object.keys(cart);
	// {id: qty}
	const mappings = {};
	keys.forEach((key) => {
		const cartItem = cart[key];
		mappings[cartItem.id] = cartItem.qty;
	});
	console.log("ids to qty", mappings);
	return mappings;
};

const getProducts = async () => {
	const response = await fetch(
		"https://fg-store-a3c99-default-rtdb.firebaseio.com/products/-N9DwY-ggRPRc_2nPwjJ.json"
	);
	const data = await response.json();
	// {id: price}
	const mappings = {};
	data.forEach((product) => (mappings[product.id] = product.price));
	console.log("ids to price", mappings);
	return mappings;
};

const getTotal = (qtyMaps, priceMaps) => {
	const ids = Object.keys(qtyMaps);
	let total = 0;
	ids.forEach((id) => (total += qtyMaps[id] * priceMaps[id]));
	console.log(total);
	return total;
};

export default async function handler(req, res) {
	try {
		const cart = req.body;
		console.log("CART", cart);
		const priceMaps = await getProducts();
		const qtyMaps = parseCartItems(cart);

		const paymentIntent = await stripeSession.paymentIntents.create({
			amount: getTotal(qtyMaps, priceMaps),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});
		res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.log("ERROR", error);
		res.status(500).json({ message: "Error initializing payment" });
	}
}
