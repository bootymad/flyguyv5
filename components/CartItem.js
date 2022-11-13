export default function CartItem({ item }) {
	return (
		<li>
			<span>{item.name}</span>
			<span>{item.qty}</span>
			<span>${item.qty * item.price}</span>
		</li>
	);
}
