import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import { getAds } from "../actions/ads";
import { SearchBar } from "../components/SearchBar";
import { Skeleton } from "../components/Skeleton";

export const AllAdsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const ads = useSelector(state => state.ads);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const adsCount = JSON.parse(localStorage.getItem("countFlag"));

  useEffect(() => {
    
    if (adsCount > ads.length) {
      dispatch(getAds(page));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // change === to >= if data be very large
    if (scrollHeight - scrollTop === clientHeight) {
      // setPage(prev => prev + 1);
      // dispatch(getAds(page));
    }
  }

  window.onscroll = (e) => !sorted ? handleScroll(e) : null;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl mt-2 uppercase font-bold leading-tight font-heading">Все объявления</h2>
      </div>
      <hr />

      <SearchBar setSorted={setSorted} />

      <div className="w-full my-5 flex justify-center flex-wrap bg-white rounded-sm shadow-sm">
        {ads.length ? ads.map(item => <Card data={item} key={item._id} />) : <p>Объявлений нет</p>}
      </div>
      <div className="w-full my-5 flex min-h-full justify-center flex-wrap bg-white rounded-sm shadow-sm">
        {(loading || !ads) ? new Array(8).fill(0).map((_,idx) => <Skeleton key={idx}/>) : null }
      </div>
    </section>
  )
};