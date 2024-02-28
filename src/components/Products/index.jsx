import { fetchProducts } from "@/services/productsService";
import { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import Image from "next/image";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { productID } from "@/redux/products.slice";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        console.log("err, ", err);
      });
  }, []);

  return (
    <div className="flex w-[1320px] m-auto flex-wrap gap-[24px]">
      {products.map((product) => (
        <div
          className="w-[312px] h-[468px] rounded-[12px] bg-white "
          key={product.id}
        >
          <div className="w-[312px] h-[284px] flex items-center justify-center">
            <div
              onClick={() => {
                Router.push(`/products/${product.title}`);
                dispatch(productID(product.id));
              }}
              className="relative w-[220px] h-[220px] cursor-pointer"
            >
              <Image
                src={product.thumbnail}
                layout="fill"
                quality={100}
                objectFit="contain"
                alt={product.title}
              />
            </div>
          </div>
          <div className="px-[16px]">
            <p className="text-[#7E7E83] leading-[24px] text-[16px]">
              {product.category}
            </p>
            <p className="w-[272px] leading-[19.36px] font-medium text-[16px] mt-[2px]">
              {product.title}
            </p>
            <div className="h-[20px] w-[123px] flex items-center">
              <Star
                sx={{
                  color: "#F8C51B",
                  width: "14.26px",
                }}
              />
              <Star
                sx={{
                  color: "#F8C51B",
                  width: "14.26px",
                }}
              />
              <Star
                sx={{
                  color: "#F8C51B",
                  width: "14.26px",
                }}
              />
              <Star
                sx={{
                  color: "#F8C51B",
                  width: "14.26px",
                }}
              />
              <Star
                sx={{
                  color: "#c8c8ce",
                  width: "14.26px",
                }}
              />
              <p className="font-medium text-[12px] ml-[8px] mt-1">52</p>
            </div>
            <div className="flex items-center gap-[5px]">
              <div className="w-[102px] rounded-[12px] px-[8px] text-[12px] font-medium text-[#FFFFFF] my-[10px] bg-[#FF9910]">
                <p>1 000 000 сум</p>
              </div>
              <p className="text-[12px] font-medium text-[#7E7E83]">x 12 мес</p>
            </div>
            <del className="text-[#C3C3CA] mt-[15px] text-[16px]">
              {/* 1 200 650 000 сум */}
              {product.price + product.discountPercentage} $
            </del>
            <p className="text-[20px] text-[#0D0D0D] font-semibold">
              {product.price} $
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
