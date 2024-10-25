import HeadComp from "@/components/shared/HeadComp";
import Header from "@/components/shared/Header/Header";
import axiosInstance from "@/lib/axios";
import { Empty, Spin } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductInfo = dynamic(() => import("@/components/product/ProductInfo"), {
  ssr: false,
});

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ensure that the router is ready and the slug is available
    if (!router.isReady || !router.query?.slug) return;

    const fetchProductDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `/product/details/${router.query.slug}`
        );
        setProduct(res?.data?.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [router.isReady, router.query.slug]);

  // If loading, show a spinner
  if (loading) return <Spin size="large" />;

  return (
    <div>
      <HeadComp title="Product Dynamic Page" />
      <Header />

      <div id="product_details">
        <div className="main_container">
          <div className="row mt-2">
            {product ? (
              <ProductInfo product={product} />
            ) : (
              <div className="col-md-9 col-sm-12 mt-5">
                <Empty description="No product found" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// SingleProduct.getInitialProps = async (ctx) => {
//   try {
//     const res = await axiosInstance.get(`/product/details/${ctx.query?.slug}`);

//     console.log(res);

//     return {
//       product: res.data?.product,
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
// };

export default SingleProduct;
