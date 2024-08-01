"use client";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import SuperComponent from "@/components/SuperComponent";
import { get_all_categories } from "@/Services/Admin/category";
import { get_all_orders } from "@/Services/Admin/order";
import { get_all_products } from "@/Services/Admin/product";
import { setNavActive } from "@/utils/AdminNavSlice";
import {
  setCatLoading,
  setCategoryData,
  setOrderData,
  setProdLoading,
  setProductData,
} from "@/utils/AdminSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
import Loading from "../loading";

interface userData {
  email: String;
  role: String;
  _id: String;
  name: String;
}

export default function Dashboard() {
  const Router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user: userData | null = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    console.log(user);
    if (
      !Cookies.get("token") ||
      user?.role !== "admin" ||
      user?.email !== "garvit510bhatia@gmail.com"
    ) {
      console.log("redirecting", Cookies, user?.role, user?.email);
      Router.push("/");
    }
    dispatch(setNavActive("Base"));
  }, [dispatch, Cookies, Router]);

  const { data: categoryData, isLoading: categoryLoading } = useSWR(
    "/gettingAllCategoriesFOrAdmin",
    get_all_categories
  );
  if (categoryData?.success !== true) toast.error(categoryData?.message);
  const { data: productData, isLoading: productLoading } = useSWR(
    "/gettingAllProductsFOrAdmin",
    get_all_products
  );
  if (productData?.success !== true) toast.error(productData?.message);
  const { data: orderData, isLoading: orderLoading } = useSWR(
    "/gettingAllOrdersForAdmin",
    get_all_orders
  );
  if (orderData?.success !== true) toast.error(orderData?.message);

  console.log(orderData?.data);
  useEffect(() => {
    dispatch(setCategoryData(categoryData?.data));
    dispatch(setCatLoading(categoryLoading));
    dispatch(setProductData(productData?.data));
    dispatch(setProdLoading(productLoading));
    dispatch(setOrderData(orderData?.data));
    dispatch(setCatLoading(orderLoading));
  }, [
    categoryData,
    dispatch,
    categoryLoading,
    productData,
    productLoading,
    orderData,
    orderLoading,
  ]);

  return (
    <div className="w-full h-screen flex  bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="w-full h-full ">
        <AdminNavbar />
        <div className="w-full h-5/6 flex flex-wrap items-center justify-center overflow-y-auto  px-2 py-4">
          {categoryLoading || productLoading ? <Loading /> : <SuperComponent />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
