import React from "react";
import {useDispatch} from "react-redux";
import {searchAdByCategory} from "../actions/ads";
import {Link} from "react-router-dom";
import {categoryList} from "../utils";

const CategoryItem = ({title, select}) => (
  <Link to="/ads" onClick={() => select(title)} className="w-full cursor-pointer m-2 p-4 bg-orange-200 hover:bg-opacity-75 rounded shadow border border-bgColor">
    <div className="text-center uppercase">{title}</div>
  </Link>
)

export const CategoriesPage = () => {
  const dispatch = useDispatch();
  const selectCategory = value => dispatch(searchAdByCategory(value));

  return (
    <section className="pb-10">
      <h2 className="text-3xl mt-2 uppercase mb-6 font-bold leading-tight font-heading">Категории</h2>
      <hr/>
      <div className="flex items-center flex-wrap justify-around">
        {categoryList.map(item => <CategoryItem key={item} select={selectCategory} title={item}/>)}
      </div>
    </section>
  )
}
