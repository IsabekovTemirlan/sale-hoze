import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {searchAds} from "../actions/ads";

export const SearchBar = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onSearch = () => {
    if (value) {
      dispatch(searchAds(value))
      setValue('');
    }
  }

  return (
    <div className="pt-2 w-1/2 text-gray-600 flex items-center relative z-0">
      <input
        className="border-2 w-full border-gray-300 mr-2 bg-white h-10 px-5 p-6 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Что ищете? (например: овцы)"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onSearch} type="submit" className="hover:bg-opacity-75 flex items-center uppercase text-white focus:outline-none font-bold bg-bgColor h-10 px-5 p-6 rounded-lg">
       Найти
      </button>
    </div>
  )
}