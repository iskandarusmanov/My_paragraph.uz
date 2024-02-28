import React from "react";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export default function Register() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // Implement your login logic here
    console.log(
      "Logging in with username:",
      username,
      "and password:",
      password
    );
    handleClose();
  };

  const handleInputChange = (value) => {
    // {value ? setInputChange(true) : setInputChange(false)}
    setInputValue(value);
    console.log("inputValue =>", value.length);
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
        <i className="fa-solid fa-user-plus"></i>
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
          Регистрация
        </DialogTitle>
        <p className="p-0 mt-[8px] text-center text-[18px] text-[#66686C]">
          Войдите с вашим именем
        </p>
        <DialogContent>
          <form className="mt-32px">
            <p className="text-black">ФИО</p>
            <div>
              <input
                onChange={(e) => handleInputChange(e.target.value)}
                className="text-black focus:border-[#FF9910] w-[380px] h-[42px] p-[15px] border-[1px] rounded-[8px] mt-[9px] outline-none border-gray-400"
                id="phone"
                type="text"
                placeholder="Введите ваше имя"
              />
              <br />
              <button
                className={`bg-[#F2F2F3] rounded-[8px] w-[380px] h-[56px] mt-[32px] text-[16px] font-semibold text-[#808284] ${
                  inputValue ? "bg-[#FF9910] text-white" : ""
                }`}
                type="submit"
              >
                Выслать код
              </button>
            </div>
          </form>
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
