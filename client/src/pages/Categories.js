import React from "react";
import { useDispatch } from "react-redux";
import { searchAds } from "../actions/ads";
import { Link } from "react-router-dom";
import { categoryList } from "../utils";

const CategoryItem = ({ title, select }) => (
  <Link to="/ads" onClick={() => select(title)} className="cursor-pointer m-2 p-4 bg-orange-200 hover:bg-opacity-75 rounded shadow border border-bgColor page-enter">
    <div className="text-center uppercase">{title}</div>
  </Link>
)

export const CategoriesPage = () => {
  const dispatch = useDispatch();
  const selectCategory = value => dispatch(searchAds(value, "category"));

  return (
    <section className="pb-10">
      <h2 className="text-3xl mt-2 uppercase mb-6 font-bold leading-tight text-center w-full md:text-left font-heading">Категории</h2>
      <hr />
      <div className="flex items-center flex-wrap">
        {categoryList.map(item => <CategoryItem key={item} select={selectCategory} title={item} />)}
      </div>
    </section>
  )
}
