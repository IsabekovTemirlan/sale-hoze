import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import { getAds } from "../actions/ads";
import { SearchBar } from "../components/SearchBar";
import { Loader } from "../components/Loader";

export const AllAdsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const ads = useSelector(state => state.ads);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const adsCount = JSON.parse(localStorage.getItem("countFlag"));

  const getAdsFromRedux = async () => {
    if (adsCount > ads.length) {
      await dispatch(getAds(page));
    }
  }

  useEffect(() => {
    getAdsFromRedux()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // - 100
  const handleScroll = (e) => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - Math.floor(scrollTop) === clientHeight) {
      const timeout = setTimeout(() => {
        !sorted && dispatch(getAds(page));
        setPage(prev => prev++);
        clearTimeout(timeout)
      }, 1000);
    }
  }

  window.onscroll = (e) => !sorted ? handleScroll(e) : null;

  return (
    <section className="mt-2" >
      <div className="flex justify-between items-center mb-4 w-full ">
        <h2 className="text-3xl mt-2 ml-2 uppercase font-bold leading-tight font-heading text-center w-full md:text-left">Все объявления</h2>
      </div>
      <hr />
      <SearchBar setSorted={setSorted} />
      <hr />


      <div className="w-full py-2 my-5 flex justify-center flex-wrap rounded-sm shadow-sm">
        {ads.length ? ads.map(item => <Card data={item} key={item._id} />) : null}
        {!loading && !ads.length ? <p>Объявлений нет</p> : null}
        {loading ? <Loader /> : null}
      </div>
    </section>
  )
};