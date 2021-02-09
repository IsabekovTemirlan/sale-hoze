import React from 'react'

import { sortList } from "../../utils";

const SearchBar = ({ value, onSearch, sortValue, sortHandler, searchHandler, onSort }) => {
  return (
    <div className="flex items-center justify-around flex-wrap">
      <div className="bg-white m-4 flex text-gray-600 items-center p-2 rounded-lg w-full sm:w-1/3 shadow-sm">
        <p>Искать: </p>
        <input
          type="search"
          name="search"
          placeholder="Что ищете? (например: овцы)"
          className="w-full pl-4 outline-none focus:outline-none bg-transparent"
          value={value}
          onChange={(e) => searchHandler(e)}
        />
        <button onClick={onSearch} className="outline-none flex items-center focus:outline-none">
          <box-icon name='search' color='#ff5722'></box-icon>
        </button>
      </div>
      <div className="bg-white m-4 flex text-gray-600 items-center justify-between p-2 w-full sm:w-1/3 rounded-lg shadow-sm">
        <p>Сортировать: </p>
        <select
          className="pl-4 cursor-pointer outline-none focus:outline-none bg-transparent"
          value={sortValue}
          selected={sortList[0].title}
          onChange={(e) => sortHandler(e)}
        >
          {sortList.map(sl => <option className="cursor-pointer" key={sl.id} value={sl.value}>{sl.title}</option>)}
        </select>
        <button onClick={onSort} className="outline-none ml-2 flex items-center focus:outline-none">
          <box-icon name='search' color='#ff5722'></box-icon>
        </button>
      </div>
    </div>
  )
}

export default SearchBar;