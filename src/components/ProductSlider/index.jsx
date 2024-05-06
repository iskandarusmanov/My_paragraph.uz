import Image from "next/image";
import React, { useState } from "react";

export default function ProductSlider({ product }) {
  const [imgUrl, setImgUrl] = useState();
  const [activeCard, setActiveCard] = useState(0);

  const productImages = product.images;

  const handleImgCard = (el, index) => {
    setImgUrl(el);
    setActiveCard(index);
  };

  return (
    <div className=" flex items-center gap-2">
      <div className="h-auto flex flex-col gap-2">
        {productImages?.map((el, i) => (
          <div
            key={i}
            className={`w-[88px] h-[88px] border-[1px] rounded-[4px] cursor-pointer flex  items-center justify-center ${
              activeCard == i && "border-[2px] border-[#FF9910]"
            }`}
            onClick={() => handleImgCard(el, i)}
          >
            <div className={`w-[80px] h-[80px] relative`} key={i}>
              <Image
                src={el}
                layout="fill"
                quality={100}
                objectFit="contain"
                alt={"image"}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-[316px] h-[420px] relative">
        <Image
          src={imgUrl ? imgUrl : product.thumbnail}
          layout="fill"
          quality={100}
          objectFit="contain"
          alt={"image"}
        />
      </div>
    </div>
  );
}
