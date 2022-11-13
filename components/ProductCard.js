export default function ProductCard({ product, updateCart }) {
	return (
		<div className="card">
			<h3>{product.name}</h3>
			<img src={product.image}></img>
			<span>{product.description}</span>
			<span>${product.price}</span>
			<button
				className="add_to_cart_button"
				onClick={() => {
					console.log("clicked");
					updateCart((cart) => {
						return cart[product.name]
							? {
									...cart,
									[product.name]: {
										...cart[product.name],
										qty: cart[product.name].qty + 1,
									},
							  }
							: {
									...cart,
									[product.name]: {
										name: product.name,
										price: product.price,
										id: product.id,
										qty: 1,
									},
							  };
					});
				}}
			>
				Add To Cart
			</button>
		</div>
	);
}
