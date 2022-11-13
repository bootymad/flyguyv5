import ProductCard from "./ProductCard";

export default function ProductList({ products, updateCart }) {
	return (
		<ul className="product_list">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					updateCart={updateCart}
				></ProductCard>
			))}
		</ul>
	);
}
