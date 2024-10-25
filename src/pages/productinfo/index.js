import Link from "next/link";

// Example Product List Component
const ProductList = ({ products }) => (
  <div>
    {products.map((product) => (
      <div key={product._id}>
        <Link href={`/products/${product.slug}`}>
          <a>{product.name}</a>
        </Link>
      </div>
    ))}
  </div>
);
