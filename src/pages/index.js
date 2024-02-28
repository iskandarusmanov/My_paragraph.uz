import React from "react";
import Router from "next/router";
import MainBanner from "@/components/UI/Banner";
import AllProducts from "@/components/Products";

export default function home() {
  return (
      <div >
       <MainBanner />

       <div className="mt-[56px]">
         <AllProducts />
       </div>
      </div>
  );
}
