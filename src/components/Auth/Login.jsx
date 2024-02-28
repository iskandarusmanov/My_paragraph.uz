import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authTrue } from "@/redux/auth.slice";
import { useRef } from "react";
import Timer from "./Timer";

function Login() {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phone, setPhone] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const confirmCode = useRef()
  const confirmNum = useRef()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    setPhone(true);
  };

  const submitCode = (data) => {
    dispatch(authTrue());
    reset()
    setPhone(false)
    handleClose();
  };

  const handleCode = (e) => {
    const codeValue = e.target.value.replace(/\D/g, "");
    if (codeValue.length === 4) {
      setCode(codeValue);
    }
  };

  const handlePhone = (e) => {
    setPhoneNumber(e.target.value);

    const cleanedPhoneNum = e.target.value.replace(/\D/g, "");

    if (cleanedPhoneNum.length === 12) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="text-gray-800 text-[22px]"
        variant="text"
        sx={{
          color: "black",
          fontSize: "22px",
          width: "30px",
          height: "46px",
        }}
      >
        <i className="fa-solid fa-arrow-right-to-bracket"></i>
      </Button>
      <Dialog open={open} onClose={handleClose} className="relative bg-[url('/images/bg-login.png')] bg-cover">
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "600",
            marginTop: "56px",
            fontSize: "32px",
            padding: "0",
          }}
        >
          Вход на сайт
        </DialogTitle>
        <p className="p-0 mt-[17px] text-center text-[18px] text-[#66686C]">
          Войдите с вашим номером телефона
        </p>
        <p
          className={`${
            !phone && "hidden"
          } p-0 text-center text-[18px] text-[#66686C]`}
        >
          {phoneNumber}
        </p>
        <DialogContent>
          <div className={`${phone ? "hidden" : ""}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-32px">
              <p className="text-black">Номер телефона</p>
              <InputMask
                className="text-black focus:border-[#FF9910] w-[380px] h-[42px] p-[15px] border-[1px] rounded-[8px] mt-[9px] outline-none border-gray-400"
                mask={`+\\9\\9\\8 99 999 99 99`}
                maskChar=" "
                ref={confirmNum}
                name="phone"
                type="tel"
                placeholder="+998 00 000 00 00"
                {...register("phone", {
                  required: "",
                })}
                onChange={handlePhone}
              />
              <br />
              <button
                className={`bg-[#F2F2F3] mb-[32px] rounded-[8px] w-[380px] h-[56px] mt-[32px] text-[16px] font-semibold text-[#808284]  ${
                  isSubmit ? "bg-[#FF9910] text-white" : ""
                }`}
                type={`${isSubmit ? "submit" : "button"}`}
              >
                Выслать код
              </button>
            </form>
          </div>
          <div className={`${phone ? "" : "hidden"}`}>
            <form onSubmit={handleSubmit(submitCode)} className="mt-32px">
              <p className="text-black">Код подтверждения</p>
              <InputMask
                className="text-black focus:border-[#FF9910] w-[380px] h-[42px] p-[15px] border-[1px] rounded-[8px] mt-[9px] outline-none border-gray-400"
                mask="9999"
                maskChar=" "
                ref={confirmCode}
                name="smsCode"
                type="text"
                placeholder="2345"
                {...register("smsCode", {
                  required: "",
                })}
                onChange={handleCode}
              />
              <br />
              <Timer />
              <button
                className={`bg-[#F2F2F3] rounded-[8px] mb-[32px] w-[380px] h-[56px] mt-[32px] text-[16px] font-semibold text-[#808284]  ${
                  code ? "bg-[#FF9910] text-white" : ""
                }`}
                type={`${code ? "submit" : "button"}`}
              >
                Подтвердить
              </button>
            </form>
          </div>
        </DialogContent>
        <div className="absolute right-[32px] font-thin top-[30px]">
          <button
            type="button"
            className="text-black text-[24px] w-[28px] h-[28px]"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default Login;
