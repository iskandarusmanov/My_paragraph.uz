import { Button } from "@mui/material";
import React from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { useSelector, useDispatch } from "react-redux";
import { authFalse } from "@/redux/auth.slice";
import SearchInput from "./SearchInput";
import CatagoriesList from "../Catagories";

export default function Header() {
  const isAuthh = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  return (
    <>
    <div className='w-[1440px] m-auto'>
        <div className='max-w-[1440px] h-[40px] m-auto bg-[#F5F5F5] flex justify-between'>
            <div>
                <ul className='flex ml-[60px] gap-[26px] mt-[8px] text-[14px]'>
                    <li>О нас</li>
                    <li>Контакты</li>
                    <li>Доставка</li>
                </ul>
            </div>
            <div className='mr-[60px] flex gap-[16px]'>
                <div className='text-[14px] flex gap-[8px] mt-[8px]'>
                    <p>Рус</p>
                    <img src="/icons/Russia-icon.svg" alt="Russia icon" className='w-[16px] h-[16px] mt-[3px]'/>
                </div>
                <div className='text-[16px] flex gap-[8px] mt-[7px]'>
                    <p>Ташкент</p>
                    <img src="/icons/location-icon.svg" alt="Location icon" className='w-[20px] h-[20px] mt-[3px]'/>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full bg-white">
      <div className="w-full h-[72px] m-auto flex justify-between items-center px-[60px]">
        <img src="/images/logo-paragraf-orange 1.png" alt="main_logo_img" />
        <CatagoriesList />
        <SearchInput />
        <div className="flex">
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-solid fa-scale-balanced"></i>
            </span>
            <p className="text-[12px] text-center">Сравнение</p>
          </div>
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-regular fa-heart"></i>
            </span>
            <p className="text-[12px] text-center">Избранное</p>
          </div>
          <div className="w-[80px] h-[46px] flex-row items-center cursor-pointer">
            <span className="w-[24px] h-[24px] m-[28px]">
              <i className="fa-solid fa-cart-arrow-down"></i>
            </span>
            <p className="text-[12px] text-center">Корзина</p>
          </div>
        </div>
        <div className={`${isAuthh && "hidden"} flex`}>
          <Login />
          <Register />
        </div>
        <div className={`${!isAuthh && "hidden"} flex`}>
          <Button
            className="text-gray-800 text-[22px]"
            variant="text"
            sx={{
              color: "black",
              fontSize: "22px",
              width: "30px",
              height: "46px",
            }}
          >
            <i className="fa-solid fa-user-tie"></i>
          </Button>
          <Button
            onClick={() => dispatch(authFalse())}
            className="text-gray-800 text-[22px]"
            variant="text"
            sx={{
              color: "black",
              fontSize: "22px",
              width: "30px",
              height: "46px",
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
