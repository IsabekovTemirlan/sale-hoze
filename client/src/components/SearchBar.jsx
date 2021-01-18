import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchAds, sortAds, getAds } from "../actions/ads";
import { sortList } from "../utils";

export const SearchBar = ({ setSorted }) => {
  const [value, setValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [sortValue, setSortValue] = useState('');
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    setValue(e.target.value);
    if (searchTimeout !== false) { clearTimeout(searchTimeout); }
    if (e.target.value !== "") {
      setSearchTimeout(setTimeout(value => {
        dispatch(searchAds(value));
      }, 1000, e.target.value));
    } else { dispatch(getAds()); }
    setSorted(true);
  }

  const onSearch = () => {
    if (value.trim()) {
      dispatch(searchAds(value));
      setValue('');
    }
    setSorted(true);
  }

  const onSort = () => {
    if (sortValue.trim()) { dispatch(sortAds(sortValue)); }
    setSorted(true);
  }

  const sortHandler = (e) => {
    if (e.target.value.trim()) { dispatch(sortAds(e.target.value)); }
    setSorted(true);
    setSortValue(e.target.value);
  }

  return (
    <div className="flex items-center justify-around flex-wrap">
      <div className="bg-transparent m-4 flex items-center p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-300 hover:border-bgColor w-full sm:w-1/3 ">
        <p>Искать: </p>
        <input
          type="search"
          name="search"
          placeholder="Что ищете? (например: овцы)"
          className="w-full pl-4 text-lg outline-none focus:outline-none bg-transparent"
          value={value}
          onChange={(e) => searchHandler(e)}
        />
        <button onClick={onSearch} className="outline-none flex items-center focus:outline-none">
          <box-icon name='search' color='#ff5722'></box-icon>
        </button>
      </div>
      <div className="bg-transparent m-4 flex items-center justify-between p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-gray-300 hover:border-bgColor w-full sm:w-1/3">
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