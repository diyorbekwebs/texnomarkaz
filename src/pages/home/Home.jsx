import React from "react";
import Hero from "../../components/hero/Hero";
import Brands from "../../components/brands/Brands";
import TabsSection from "../../components/Tabs/Tabs";
import Categories from "../../components/Categories/Categories";
import Products from "../../components/products/Products";
import TopProducts from "../../components/Topproducts/Topproducts";
import Features from "../../components/features/Features";
import Calculator from "../../components/calculator/Calculator";
import Reviews from "../../components/reviews/Reviews";


export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <TabsSection />
      <Categories />
      <Products />
      <TopProducts />
      <Features />
      <Calculator />
      <Reviews />
    </main>
  );
}