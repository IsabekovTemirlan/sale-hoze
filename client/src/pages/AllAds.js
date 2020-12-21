import React, { useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../components/Card";
import {Button} from "../components/Button";
import {getAds} from "../actions/ads";
import {SearchBar} from "../components/SearchBar";
// import { Pagination } from "../components/Pagination";

export const AllAdsPage = () => {
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const getMoreAds = useCallback(() => {
    dispatch(getAds())
  }, [dispatch]);

  useEffect(() => {
    return () => getMoreAds();
  }, [getMoreAds]);

  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl mt-2 uppercase font-bold leading-tight font-heading">Все объявления</h2>
        <SearchBar />
      </div>
      <hr/>
      <div className="w-full mt-10 flex justify-center flex-wrap">
        {ads.length ? ads.map(item => <Card data={item} key={item._id}/>) : <p>Объявлений нет</p>}
      </div>

      <div className='text-center my-12 w-full'>
        <Button handler={getMoreAds} title="Загрузить ещё" />
      </div>

    </section>

  )
};