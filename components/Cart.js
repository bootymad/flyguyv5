import CartItem from "./CartItem";
export default function Cart({ cart }) {
	const cartKeys = Object.keys(cart);
	console.log(cartKeys);
	const clickHandler = async (cart) => {
		const response = await fetch("/api/checkout", {
			method: "POST",
			body: JSON.stringify(cart),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const { clientSecret } = await response.json();
		console.log("IN APP", clientSecret);
	};
	return (
		<div>
			{cartKeys.length === 0 ? (
				<p>Your cart is empty!</p>
			) : (
				<>
					<ul>
						{cartKeys.map((key) => (
							<CartItem
								key={cart[key].id}
								item={cart[key]}
							></CartItem>
						))}
					</ul>
					<span>
						Total: $
						{cartKeys.reduce(
							(sum, item) =>
								sum + cart[item].qty * cart[item].price,
							0
						)}
					</span>
				</>
			)}
			<button onClick={() => clickHandler(cart)}>Checkout</button>
		</div>
	);
}
