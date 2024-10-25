import axiosInstance from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (query === "") {
        return setSearchedProducts([]);
      }

      axiosInstance
        .get(`/product/getSearchProducts?search=${query.trim()}`)
        .then((res) => {
          setSearchedProducts(res.data?.products);
        })
        .catch((err) => {
          searchedProducts([]);
        });
    }, 200);

    return () => {
      clearTimeout(delayed);
    };
  }, [query]);

  return (
    <div className="search_wrapper">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // onKeyDown={handleKeyPress}
        placeholder="Search for..."
      />
      <i
        // onClick={() => handlePush()}
        className="fas fa-search"
      ></i>

      {/* Conditional rendering for search results */}
      {searchedProducts.length > 0 && (
        <div className="search_overlay">
          <div className="search_products">
            {searchedProducts.map((product, index) => (
              <Link key={index} href={`/product/${product.slug}`}>
                <div className="items">
                  <img src={product.thumbnail} alt={product.name} />
                  <h5>{product.name}</h5>
                  <div className="product-price">
                    {product?.discount?.value > 0 ? (
                      <>
                        <span className="old-price">${product.price}</span>
                        {product.discount.discountType === "flat" ? (
                          <span className="new-price">
                            ${product.price - product.discount.value}
                          </span>
                        ) : (
                          <span className="new-price">
                            $
                            {product.price -
                              Math.floor(
                                product.price * (product.discount.value / 100)
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
