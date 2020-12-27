import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../components/Card";
import {getAds} from "../actions/ads";
import {SearchBar} from "../components/SearchBar";
import { Alert } from "../components/Alert";

export const AllAdsPage = () => {
  const [page, setPage] = useState(1);
  const ads = useSelector((state) => state.ads);
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => setPage(1)
  },[])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // change === to >= if data be very large
    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
      dispatch(getAds(page));
    }
  }

  window.onscroll = function (e) {
    handleScroll(e);
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl mt-2 uppercase font-bold leading-tight font-heading">Все объявления</h2>
        <SearchBar />
      </div>
      <hr/>
      {alert && <Alert title={alert.text} type={alert.type} />}
      <div className="w-full mt-10 flex justify-center flex-wrap">
        {ads.length ? ads.map(item => <Card data={item} key={item._id}/>) : <p>Объявлений нет</p>}
      </div>

    </section>

  )
};