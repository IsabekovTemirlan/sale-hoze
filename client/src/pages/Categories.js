import React from "react";

const categories = [
  {id: 0, title: 'Крупно-рогатый и мелко-копытный скот', path: ''},
  {id: 1, title: 'Крупы и кормы', path: ''},
  {id: 2, title: 'Услуги', path: ''},
  {id: 3, title: 'Лощади', path: ''},
  {id: 4, title: 'Сель-хоз техника', path: ''},
  {id: 5, title: 'Ремесловые изделия', path: ''},
  {id: 6, title: 'Домашние животные', path: ''},
];

const CategoryItem = ({title}) => (
  <div className="w-full cursor-pointer m-2 p-4 bg-orange-200 hover:bg-opacity-75 rounded shadow border border-bgColor">
    <div className="text-center uppercase">{title}</div>
  </div>
)

export const CategoriesPage = () => {
  return (
    <section className="pb-10">
      <h2 className="text-3xl mt-2 uppercase mb-6 font-bold leading-tight font-heading">Категории</h2>
      <hr/>
      <div className="flex items-center flex-wrap justify-around">
        {categories.map( item => <CategoryItem key={item.id} title={item.title} />)}
      </div>
    </section>
  )
}
