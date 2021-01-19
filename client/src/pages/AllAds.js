import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import { getAds } from "../actions/ads";
import { SearchBar } from "../components/SearchBar";
import { Loader } from "../components/Loader";

export const AllAdsPage = () => {
  // eslint-disable-next-line no-unused-vars
  let [page, setPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const ads = useSelector(state => state.ads);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const getAdsFromStore = useCallback(() => {
		!ads.length && dispatch(getAds(page));
  }, [ads.length, dispatch, getAds, page]);

  useEffect(() => {
    getAdsFromStore();
    return () => window.onscroll = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  const handleScroll = () => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - Math.floor(scrollTop) === clientHeight + 1) {
      dispatch(getAds(page + 1));

      setPage(prev => prev + 1);
      window.onscroll = null
    }
  }

  const goUp = () => window.scrollTo(0,0);

  window.onscroll = () => !sorted ? handleScroll() : null;

  return (
    <section className="mt-2" >
      <div className="flex justify-between items-center mb-4 w-full ">
        <h2 className="text-3xl mt-2 ml-2 uppercase font-bold leading-tight font-heading text-center w-full md:text-left">Все объявления</h2>
      </div>
      <hr />
      <SearchBar setSorted={setSorted} />
      <hr />

      <div style={{bottom: 15, right: 15}} className="fixed w-12 h-12 bg-white bg-opacity-50 z-40 flex items-center justify-center rounded-md cursor-pointer right-0">
        <box-icon onClick={goUp} name='up-arrow-circle' size="md" color="#ff5722" ></box-icon>
      </div>

      <div className="w-full py-2 my-5 flex justify-center flex-wrap rounded-sm shadow-sm">
        {ads.length ? ads.map(item => <Card data={item} key={item._id} />) : null}
        {!loading && !ads.length ? <p>Объявлений нет</p> : null}
        {loading ? <Loader /> : null}
      </div>
    </section>
  )
};