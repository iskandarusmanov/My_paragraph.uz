import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";
import { HeartBrokenOutlined } from "@mui/icons-material";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const productID = useSelector((state) => state.products.ID);

  useEffect(() => {
    if (productID) {
      axios.get(`https://dummyjson.com/products/${productID}`).then((res) => {
        setProduct(res.data);
      });
    }
  }, [productID]);

  const productImg = product.images;

  console.log("product ==> ", product);

  return (
    <div className="w-[1312px] m-auto">
      <p className="text-[14px] text-[#5B6871]">
        {`Главная / ${product.category} / ${product.title}`}
      </p>
      <div className="w-full rounded-[12px] p-[24px] mt-[32px] bg-[#FFFFFF]">
        <p className="font-semibold text-[28px]">{product.title}</p>
        <div className="mt-[24px]">
          <div>{/* product images carusel */}</div>

          <div className="w-[396px]">
            <img
              width={"100%"}
              height={"38px"}
              src="/images/discount.png"
              alt="discount_pic"
            />
            <p className="font-semibold text-[20px] mt-[24px] text-[#0D0D0D]">
              Цвет товара: синий
            </p>
            <div className="w-full flex flex-wrap gap-1 mt-[16px]">
              {productImg?.map((el, index) => (
                <div
                  key={index}
                  className="w-[76px] h-[76px] border-[1px] rounded-[4px] cursor-pointer flex  items-center justify-center"
                >
                  <div className="w-[60px] h-[60px] relative" key={index}>
                    <Image
                      src={el}
                      layout="fill"
                      quality={100}
                      objectFit="contain"
                      alt={product.title}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-semibold text-[20px] text-[#0D0D0D] mt-[24px]">
              Описание:
            </p>
            <p className="font-medium text-[16px] mr-[20px] text-[#626161] mt-[5px]">
              {product.description}
            </p>
          </div>

          <div>{/* product payment */}</div>
        </div>
      </div>
    </div>
  );
}
