import {
  addQuantity,
  reduceQuantity,
  removeAllCartItem,
  removeCartItem,
} from "@/redux/cart.slice";
import { putItem, removeItem } from "@/redux/favorite.slice";
import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const favoriteProduct = useSelector((state) => state.favorite.favoriteItems);

  const dispatch = useDispatch();

  const handleAddFavorite = (data) => {
    const isFavorite = favoriteProduct.some((item) => item.id === data.id);

    if (isFavorite) {
      dispatch(removeItem(data));
    } else {
      dispatch(putItem(data));
    }
  };

  const handleDelete = (product) => {
    dispatch(removeCartItem(product));
  };

  const handleClearCart = () => {
    dispatch(removeAllCartItem());
  };

  return (
    <div className="w-[1320px] m-auto mt-[40px]">
      <p className="font-semibold text-[40px]">Корзина</p>

      <div className="w-full flex justify-between mt-[24px] ">
        {cartItems.list.length == 0 ? (
          <div className="w-[872px] p-[24px] bg-white rounded-[12px]">
            <p className="font-medium text-[14px]">
              <span className="text-[17px] font-semibold">Корзина пока пустая</span> <br /> Радуйте себя быстрыми
              покупками, добавляя любимые товары в корзину
            </p>
          </div>
        ) : (
          <div className="w-[872px] p-[24px] pt-0 bg-white rounded-[12px]">
            <div className="w-full py-[26px] flex justify-between">
              <p>Всего: {cartItems.list.length} товара</p>
              <p
                onClick={handleClearCart}
                className="text-[#6E7C87] text-[16px] cursor-pointer"
              >
                <i className="fa-solid fa-trash-can"></i> Очистить корзину
              </p>
            </div>
            {cartItems?.list.map((item) => (
              <div className="w-full h-[150px] flex gap-[26px] py-[25px] border-t">
                <div className="w-[105px] h-[105px] relative">
                  <Image
                    src={item.thumbnail}
                    layout="fill"
                    quality={100}
                    objectFit="contain"
                    alt={item.title}
                  />
                </div>

                <div className="w-full h-[105px]">
                  <div className="w-full flex justify-between py-[10px]">
                    <p className="font-medium text-[18px] text-[#1A2024]">
                      {item.title}
                    </p>
                    <p className="font-semibold text-[18px]">
                      {item.price * item.quantity} $
                    </p>
                  </div>
                  <div className="w-full mt-[20px] flex justify-between">
                    <div className="flex justify-items-center">
                      <button
                        className="px-[12px] pl-0 text-[#48535B] text-[16px]"
                        onClick={() => handleAddFavorite(item)}
                      >
                        {favoriteProduct.some((el) => el.id === item.id) ? (
                          <div className="flex">
                            <img
                              width="20px"
                              src="/icons/Vector (1).svg"
                              alt=""
                            />
                            <p className="text-[#48535B]">В избранное</p>
                          </div>
                        ) : (
                          <div className="flex">
                            <FavoriteBorder
                              sx={{
                                color: "#48535B",
                                width: "22px",
                                height: "22px",
                              }}
                            />{" "}
                            <p className="text-[#48535B]">В избранное</p>
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-[12px] text-[#48535B] text-[16px] border-l"
                      >
                        <i className="fa-solid fa-xmark"></i> Удалить
                      </button>
                    </div>

                    <div className="w-[136px] h-[40px] flex justify-between justify-items-center">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(reduceQuantity(item));
                          }
                        }}
                        className={`${
                          item.quantity === 1 && "text-gray-400"
                        } w-[40px] h-[40px] rounded-[10px] bg-[#F4F4F4]`}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>

                      <p className="font-bold text-center text-[18px] p-0">
                        {item.quantity}
                      </p>

                      <button
                        onClick={() => {
                          dispatch(addQuantity(item));
                        }}
                        className="w-[40px] h-[40px] rounded-[10px] bg-[#F4F4F4]"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`w-[424px] h-fit bg-white p-[16px] py-[24px] rounded-[8px] ${
            cartItems.list.length == 0 && "hidden"
          }`}
        >
          <div className="w-full border-b flex items-center pb-5 gap-4">
            <img
              className="w-[36px] h-[36px]"
              src="/images/Frame 1000002826.svg"
              alt=""
            />

            <p className="w-[255px] text-[16px]">
              <span className="font-bold">Бесплатно доставим ваш заказ</span> в
              фирменный пункт выдачи
            </p>
          </div>

          <p className="w-full flex justify-between mt-[43px] font-semibold text-[23px]">
            <span>Итого</span>
            <span>{cartItems.total} $</span>
          </p>

          <p className="w-full flex justify-between mt-2 font-medium text-[#6E7C87]">
            <span>Товары, {cartItems.list.length} шт</span>
            <span>{cartItems.total} $</span>
          </p>
          <button
            type="button"
            className="w-full h-[48px] text-white rounded-[8px] bg-[#FF9910] font-semibold mt-[16px]"
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </div>
  );
}
