import { useState } from "react";
import SlideDown from "../components/SlideDown";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
export function getStaticProps() {
	// wanted to try with .then syntax
	return fetch(
		"https://fg-store-a3c99-default-rtdb.firebaseio.com/products/-N9DwY-ggRPRc_2nPwjJ.json"
	).then((response) =>
		response.json().then((data) => {
			return { props: { data } };
		})
	);
}

export default function Home({ data }) {
	const [cart, setCart] = useState({});
	const [opens, setOpens] = useState({});
	return (
		<div className="home-wrapper">
			<h1 id="logo">FLYGUY HAIR</h1>
			<SlideDown
				title={"Products"}
				isOpen={opens.products}
				setter={() =>
					setOpens((prev) => {
						return { products: !prev.products };
					})
				}
			>
				<ProductList products={data} updateCart={setCart}></ProductList>
			</SlideDown>
			<SlideDown
				title={"About"}
				isOpen={opens.about}
				setter={() =>
					setOpens((prev) => {
						return { about: !prev.about };
					})
				}
			>
				Big children!!!!
			</SlideDown>
			<SlideDown
				title={"Contact"}
				isOpen={opens.contact}
				setter={() =>
					setOpens((prev) => {
						return { contact: !prev.contact };
					})
				}
			>
				Big children!!!!
			</SlideDown>
			<SlideDown
				title={"Cart"}
				isOpen={opens.cart}
				setter={() =>
					setOpens((prev) => {
						return { cart: !prev.cart };
					})
				}
			>
				<Cart cart={cart}></Cart>
			</SlideDown>
		</div>
	);
}
