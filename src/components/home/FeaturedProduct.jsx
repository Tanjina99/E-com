import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";
import { Rate } from "antd";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const FeaturedProduct = () => {
  const [featureProduct, setFeatureProduct] = useState([]);

  useEffect(() => {
    const fetchFeaturedProduct = () => {
      axiosInstance
        .get("/product/getFeatured")
        .then((res) => {
          if (res.data?.success) {
            setFeatureProduct(res.data?.products);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchFeaturedProduct();
  }, []);
  console.log("featureProduct", featureProduct);
  return (
    <div className="featured_product">
      <div className="section_content">
        <Swiper
          pagination={{
            //   dynamicBullets: true,
            clickable: true,
          }}
          slidesPerView={5}
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
          }}
          // slidesPerView={2}
        >
          {featureProduct?.length > 0 &&
            featureProduct.map((product) => (
              <SwiperSlide key={product?._id}>
                <div className="product_card">
                  <div className="product_image">
                    <Image
                      height={200}
                      width={250}
                      objectFit="cover"
                      className="mx-auto w-100"
                      src={
                        product?.thumbnail
                          ? product?.thumbnail
                          : "https://via.placeholder.com/250"
                      }
                      alt="product"
                    />
                  </div>
                  <div>
                    <Link href={`/product/${product.slug}`}>
                      <div className="product_info">
                        <div className="rating">
                          <Rate
                            style={{ fontSize: "16px" }}
                            disabled
                            defaultValue={product?.ratingCount}
                          />
                        </div>
                        <h5>{product?.name}</h5>
                        <div className="product_price">
                          {product?.discount.value > 0 ? (
                            <>
                              <span className="old-price">
                                ${product.price}
                              </span>
                              {product?.discount?.discountType === "flat" ? (
                                <span className="new-price">
                                  ${product?.price - product?.discount.value}
                                </span>
                              ) : (
                                <span className="new-price">
                                  $
                                  {product.price -
                                    Math.floor(
                                      product.price *
                                        (product.discount.value / 100)
                                    )}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="new-price">${product.price}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        ;
      </div>
    </div>
  );
};

export default FeaturedProduct;
