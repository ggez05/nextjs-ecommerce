"use client";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TopCategories from "@/components/TopCategories";
import { get_all_categories } from "@/Services/Admin/category";
import { get_all_products } from "@/Services/Admin/product";
import { RootState } from "@/Store/store";
import {
  setCategoryData,
  setCatLoading,
  setProdLoading,
  setProductData,
} from "@/utils/AdminSlice";
import { setUserData } from "@/utils/UserDataSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./loading";

export default function Home() {
  const dispatch = useDispatch();
  const categoryLoading = useSelector(
    (state: RootState) => state.Admin.catLoading
  );
  const productLoading = useSelector(
    (state: RootState) => state.Admin.productLoading
  );
  const [loading, setLoading] = useState(true);
  const [ratio, setRatio] = useState(16 / 9);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    dispatch(setUserData(JSON.parse(userData)));
  }, []);

  useEffect(() => {
    FetchDataOFProductAndCategory();
  }, []);

  const FetchDataOFProductAndCategory = async () => {
    const categoryData = await get_all_categories();
    if (categoryData?.success !== true) toast.error(categoryData?.message);

    dispatch(setCategoryData(categoryData?.data));

    const productData = await get_all_products();
    if (productData?.success !== true) toast.error(productData?.message);

    dispatch(setProductData(productData?.data));

    setLoading(false);
  };

  useEffect(() => {
    dispatch(setCatLoading(loading));
    dispatch(setProdLoading(loading));
  }, [categoryLoading, productLoading, dispatch, loading]);

  return (
    <>
      <Navbar />
      <Hero setRatio={setRatio} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <TopCategories />
          <FeaturedProduct />
          <Footer />
        </>
      )}
      <ToastContainer />
    </>
  );
}
