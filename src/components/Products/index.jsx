import { fetchProducts } from "@/services/productsService";
import { useState, useEffect } from "react";
import { Balance, FavoriteBorder, Star } from "@mui/icons-material";
import Image from "next/image";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { productID } from "@/redux/products.slice";
import { putItem, removeItem } from "@/redux/favorite.slice";
import { addToCart } from "@/redux/cart.slice";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const favoriteProduct = useSelector((state) => state.favorite.favoriteItems);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.list);

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        console.log("err, ", err);
      });
  }, []);

  const handleAddFavorite = (data) => {
    const isFavorite = favoriteProduct.some((item) => item.id === data.id);

    if (isFavorite) {
      dispatch(removeItem(data));
    } else {
      dispatch(putItem(data));
    }
  };

  const handleAddToCart = (data) => {
    dispatch(
      addToCart({
        ...data,
        quantity: 1,
      })
    );
  }

  return (
    <div className="flex w-[1320px] m-auto flex-wrap gap-[24px]">
      {products.map((product) => (
        <div
          className="w-[312px] relative h-[468px] rounded-[12px] bg-white "
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
              {product.price + product.discountPercentage} $
            </del>
            <p className="text-[20px] text-[#0D0D0D] font-semibold">
              {product.price} $
            </p>
          </div>

          <div className="w-[55px] bg-[#FF0000] rounded-[4px] absolute left-[15px] top-[13px] flex items-center justify-center h-[30px]">
            <p className="text-[14px] text-white font-bold">
              {" "}
              {product.discountPercentage}%
            </p>
          </div>

          <div className="w-[56px] h-[24px] flex items-center justify-center gap-[8px] absolute top-[12px] right-[12px]">
            <button>
              <Balance
                sx={{
                  color: "#48535B",
                  width: "20px",
                  height: "20px",
                }}
              />
            </button>
            <button onClick={() => handleAddFavorite(product)}>
              {favoriteProduct.some((item) => item.id === product.id) ? (
                <img width="20px" src="/icons/Vector (1).svg" alt="" />
              ) : (
                <FavoriteBorder
                  sx={{
                    color: "#48535B",
                    width: "22px",
                    height: "22px",
                  }}
                />
              )}
            </button>
          </div>

          <button
            type="button"
            className="w-[48px] items-center flex justify-center h-[45px] absolute bottom-[16px] right-[16px]"
            onClick={() => handleAddToCart(product)}
          >
            <img src="/icons/add_shopping_cart.svg" alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}
