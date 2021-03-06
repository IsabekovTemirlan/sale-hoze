import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../components/Button";
import { kg, success, comfort } from "../assets/icons";
import { Card } from "../components/Card";
import { SearchBar } from "../components/SearchBar";
import { Loader } from "../components/Loader";

export const MainPage = ({ isAuth, page, setPage }) => {
  const ads = useSelector(state => state.ads);
  const loading = useSelector(state => state.loading);
  const greetingFlag = JSON.parse(localStorage.getItem("isVisiting"));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => window.onscroll = null, []);

  window.onscroll = () => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - Math.floor(scrollTop) === clientHeight + 1) ads.length >= 8 && setPage(page + 1);
  }

  return <>
    {greetingFlag ? null :
      <>
        <section className="pt-2 pb-12 px-4 text-center page-enter">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">Добро пожаловать в <span
              className='font-bold text-bgColor'>SaleHoz</span>!</h2>
            <p className="mb-8 text-gray-500 leading-relaxed"><span className='font-bold'>SaleHoz</span> - это бесплатная
            и удобная платформа для объявлений, разработанная именно для сельско-хозяйственного сегмента, здесь вы
            можете не только найти более подходящее вам объявление при помощи различной сортировки но и так же можете
            подать своё собственное.</p>
            <div>
              <Link to="/ads">
                <Button title={'Найти объявление'} />
              </Link>
              <Link to={isAuth ? "/profile" : "/advertise"}>
                <Button title={'Подать объявление'} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 mb-32 text-center bg-white shadow-2xl">
          <h2 className="text-3xl mb-8 font-heading">В чём приумушество <span
            className='font-bold text-bgColor'>SaleHoz</span>?</h2>
          <div className="flex flex-wrap items-center justify-center -mx-8 mb-12">
            <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
              <img className="mx-auto" src={comfort} alt="" />
              <h3 className="text-2xl mt-6 mb-3 font-heading">Удобный дизайн!</h3>
              <p className="text-gray-500 leading-relaxed">Интуитивно понятный и простой дизайн поможет вам быстро
              разместить ваше объявление.</p>
            </div>
            <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
              <img className="mx-auto" src={success} alt="" />
              <h3 className="text-2xl mt-6 mb-3 font-heading">Быстрый резултат!</h3>
              <p className="text-gray-500 leading-relaxed">В наше время интернет есть почти в каждой точки страны, а наша
              платформа представляет собой быстрый сайт работающий без перезагрузки страницы.</p>
            </div>
            <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
              <img className="mx-auto h-16 w-auto" src={kg} alt="" />
              <h3 className="text-2xl mt-6 mb-3 font-heading">Широкий охват!</h3>
              <p className="text-gray-500 leading-relaxed">По скольку сельское хозяйство в нашей стране широко
              распрастранено, ваше объявление будет доступно по всей стране.</p>
            </div>
          </div>
        </section>
      </>
    }
    <section className="mt-2" >
      <div className="flex justify-between items-center mb-4 w-full ">
        <h2 className="text-3xl mt-2 ml-2 uppercase font-bold leading-tight font-heading text-center w-full md:text-left">Все объявления</h2>
      </div>
      <hr />
      <SearchBar />

      <div style={{ bottom: 15, right: 15 }} className="fixed w-12 h-12 bg-white bg-opacity-50 z-40 flex items-center justify-center rounded-md cursor-pointer right-0">
        <box-icon onClick={() => window.scrollTo(0, 0)} name='up-arrow-circle' size="md" color="#ff5722" ></box-icon>
      </div>

      <div className="w-full py-2 my-5 flex justify-center flex-wrap rounded-sm shadow-sm">
        {ads.length ? ads.map(item => <Card data={item} key={item._id} />) : null}
        {!loading && !ads.length ? <p>Объявлений нет</p> : null}
        {loading ? <Loader /> : null}
      </div>
    </section>
  </>
}
