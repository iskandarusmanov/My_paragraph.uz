import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { productsCategories } from "@/services/productsService";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeCategory } from "@/redux/products.slice";
import Router from "next/router";

function CatagoriesList(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredcatalog, setHoveredCatalog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    productsCategories().then((res) => {
      setCategories(res);
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setHoveredCatalog(null);
  };

  const handleCategoryChange = () => {
    dispatch(changeCategory(hoveredcatalog));
    setMobileOpen(false);
    setHoveredCatalog("");
    Router.push(`/categories/${hoveredcatalog}`);
  };

  useEffect(() => {
    if (hoveredcatalog) {
      axios
        .get(`https://dummyjson.com/products/category/${hoveredcatalog}`)
        .then((res) => {
          setCategoryType(res.data.products);
        });
    }
  }, [hoveredcatalog]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="relative">
      <button
        className="h-[44px] text-white w-[143px] bg-[#FF9910] border-none rounded-md font-medium flex items-center justify-center gap-2 p-4"
        onClick={handleDrawerToggle}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        Категории
      </button>
      <div
        className={`absolute top-[57px] left-0 w-[348px] h-[460px] bg-[#F6F6F6] z-40 overflow-y-auto transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-[-280px]" : "-translate-x-[640px]"
        }`}
      >
        <div className="ml-[28px]">
          {categories.map((el, index) => (
            <div
              key={index}
              className={`h-[56px] flex rounded-l-[8px] text-black items-center cursor-pointer hover:bg-white pl-4`}
              onMouseEnter={() => setHoveredCatalog(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      {hoveredcatalog && (
        <div className="absolute right-0 top-[57px] left-[50px] w-[1190px] h-[460px] bg-white z-50 p-4">
          <div
            onClick={handleCategoryChange}
            className="px-[40px] w-fit cursor-pointer py-[12px]"
          >
            <h2 className="text-[16px] text-black mb-3 font-[700]">
              {hoveredcatalog}
            </h2>
            {categoryType.map((el) => (
              <p key={el.id} className="mt-[12px] text-black cursor-pointer">
                <p>{el.title}</p>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CatagoriesList;
