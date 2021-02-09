import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchAds, sortAds, getAds } from "../../actions/ads";
import SearchBarComponent from "./SearchBar";

export const SearchBar = () => {
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
  }

  const onSearch = () => {
    if (value.trim()) {
      dispatch(searchAds(value));
      setValue('');
    }
  }

  const onSort = () => {
    if (sortValue.trim()) { dispatch(sortAds(sortValue)); }
  }

  const sortHandler = (e) => {
    if (e.target.value.trim()) { dispatch(sortAds(e.target.value)); }
    setSortValue(e.target.value);
  }

  return <SearchBarComponent
    value={value}
    searchHandler={searchHandler}
    onSearch={onSearch}
    onSort={onSort}
    sortHandler={sortHandler}
  />
}