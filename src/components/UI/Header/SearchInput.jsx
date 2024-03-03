import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
import { Clear } from "@mui/icons-material";
import { useDebounce } from "@/hooks/useBebounce";
import Router from "next/router";
import { productID } from "@/redux/products.slice";
import { useDispatch } from "react-redux";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const productListRef = useRef(null);

  const dispatch = useDispatch();
  const debouncedQuery = useDebounce(query, 300);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${debouncedQuery}&limit=10`
      );
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedQuery]);

  const handleInputChange = (value) => {
    setQuery(value);
    if (value === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const clearInput = () => {
    setQuery("");
    setDisabled(true);
  };

  const handleProduct = (title, id) => {
    clearInput();
    Router.push(`/products/${title}`);
    dispatch(productID(id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productListRef.current &&
        !productListRef.current.contains(event.target)
      ) {
        setDisabled(true);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-fit relative `}>
      <div className="flex  relative">
        <input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="border-[#FF9910] border-[2px] p-[16px] h-[48px] rounded-l-[8px] focus:border-[#FF9910] outline-none w-[517px]"
          placeholder="Искать товары"
        />
        <button
          onClick={fetchProducts}
          className="bg-[#FF9910] w-[64px] h-[48px] text-white rounded-r-[8px]"
        >
          {loading ? (
            <Loader />
          ) : (
            <i className="fa-solid fa-magnifying-glass"></i>
          )}
        </button>
        <button
          onClick={clearInput}
          className={`${
            disabled && "hidden"
          } absolute h-full w-10 top-0 right-[64px] text-[#808388]`}
        >
          <Clear />
        </button>
      </div>

      <div
        ref={productListRef}
        className={`${
          disabled && "hidden"
        } w-[581px] absolute top-[55px] z-50 bg-white rounded-[8px] px-[20px] py-[10px] `}
      >
        {products.length > 0 && (
          <ul className="grid grid-cols-1 gap-2">
            {products.map((product, index) => (
              <li
                onClick={() => handleProduct(product.title, product.id)}
                key={index}
                className="cursor-pointer flex items-center gap-[20px]"
              >
                <button className="text-[#808388]">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <p className=" p-0 text-black  text-[16px]">{product.title}</p>
              </li>
            ))}
          </ul>
        )}
        {products.length === 0 && (
          <p className="text-center text-gray-600 font-semibold">
            This product was not found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
