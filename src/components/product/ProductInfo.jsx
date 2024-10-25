// import { Rate } from "antd";
// import { useEffect, useState } from "react";
// import SliderImage from "react-zoom-slider";

// const ProductInfo = ({ product }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (!product) return;

//     const newImages = [
//       {
//         image: product?.thumbnail,
//         text: "",
//       },
//       ...(product?.gallery || []).map((gImage) => ({
//         image: gImage,
//         text: "",
//       })),
//     ];

//     setImages(newImages);
//   }, [product]);

//   return (
//     <div className="col-md-9 col-sm-12">
//       <div className="row background_white">
//         <div className="col-md-6 col-sm-12 product_image">
//           <div className="row">
//             {images.length > 0 && (
//               <SliderImage
//                 data={images.map((img) => ({
//                   image: img.image,
//                   text: img.text || "Product image",
//                 }))}
//                 width="500px"
//                 showDescription={true}
//                 direction="right"
//               />
//             )}
//           </div>
//         </div>

//         <div className="col-md-6 col-sm-12 product_info mt-3">
//           <h1 className="product_name text-capitalize">
//             {product?.name || "Product Name Unavailable"}
//           </h1>
//           <div className="review">
//             <span>
//               <Rate
//                 style={{ fontSize: "16px" }}
//                 disabled
//                 value={product?.rating || 0}
//               />
//             </span>
//             <span>({product?.ratingCount || 0} reviews)</span>
//           </div>

//           <div className="sku">
//             <span className="key">SKU: {product?.sku || "N/A"}</span>
//           </div>

//           <div className="price">
//             {product?.price && (
//               <span className="original_price">${product.price}</span>
//             )}
//             {product?.disc && (
//               <span className="discounted_price">${product.disc}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;

import { Rate } from "antd";
import { useEffect, useState } from "react";
import SliderImage from "react-zoom-slider";
import Link from "next/link"; // Import Link

const ProductInfo = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!product) return;

    const newImages = [
      {
        image: product?.thumbnail,
        text: "",
      },
      ...(product?.gallery || []).map((gImage) => ({
        image: gImage,
        text: "",
      })),
    ];

    setImages(newImages);
  }, [product]);

  return (
    <div className="col-md-9 col-sm-12">
      <div className="row background_white">
        <div className="col-md-6 col-sm-12 product_image">
          <div className="row">
            {images.length > 0 && (
              <SliderImage
                data={images.map((img) => ({
                  image: img.image,
                  text: img.text || "Product image",
                }))}
                width="500px"
                showDescription={true}
                direction="right"
              />
            )}
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <div className="col-md-6 col-sm-12 product_info mt-3">
            {/* Wrap the product name in a Link component */}
            <h1 className="product_name text-capitalize">{product.name}</h1>
            <div className="review">
              <span>
                <Rate
                  style={{ fontSize: "16px" }}
                  disabled
                  value={product?.rating || 0}
                />
              </span>
              <span>({product?.ratingCount || 0} reviews)</span>
            </div>

            <div className="sku">
              <span className="key">SKU: {product?.sku || "N/A"}</span>
            </div>

            <div className="price">
              {product?.price && (
                <span className="original_price">${product.price}</span>
              )}
              {product?.disc && (
                <span className="discounted_price">${product.disc}</span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;
