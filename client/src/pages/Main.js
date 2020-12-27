import React, {useEffect, useState } from 'react';

import {Button} from "../components/Button";
import {Card} from "../components/Card";
import {kg, success, comfort} from "../assets/icons";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const storageName = "isVisiting";

export const MainPage = ({isAuth}) => {
  const [greeting, setGreeting] = useState(false);
  const ads = useSelector(state => state.ads);

  useEffect(() => {
    const greetingFlag = JSON.parse(localStorage.getItem(storageName));

    if (greetingFlag) {
     setGreeting(greetingFlag);
    } else {
      localStorage.setItem(storageName, JSON.stringify(true));
    }

  }, [greeting]);

  return (
    <>
      {greeting ? <h2 className="text-3xl mt-2 uppercase mb-6 font-bold leading-tight font-heading">Главная</h2> : (<><section className="pt-2 pb-12 px-4 text-center">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">Добро пожаловать в <span
            className='font-bold text-bgColor'>SaleHoz</span>!</h2>
          <p className="mb-8 text-gray-500 leading-relaxed"><span className='font-bold'>SaleHoz</span> - это бесплатная
            и удобная платформа для объявлений, разработанная именно для сельско-хозяйственного сегмента, здесь вы
            можете не только найти более подходящее вам объявление при помощи различной сортировки но и так же можете
            подать своё собственное.</p>
          <div>
            <Link to="/ads">
              <Button title={'Найти объявление'}/>
            </Link>
            <Link to={isAuth ? "/profile" : "/advertise"}>
              <Button title={'Подать объявление'}/>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 mb-32 text-center bg-white shadow-2xl">
        <h2 className="text-3xl mb-8 font-heading">В чём приумушество <span
          className='font-bold text-bgColor'>SaleHoz</span>?</h2>
        <div className="flex flex-wrap items-center justify-center -mx-8 mb-12">
          <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
            <img className="mx-auto" src={comfort} alt=""/>
            <h3 className="text-2xl mt-6 mb-3 font-heading">Удобный дизайн!</h3>
            <p className="text-gray-500 leading-relaxed">Интуитивно понятный и простой дизайн поможет вам быстро
              разместить ваше объявление.</p>
          </div>
          <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
            <img className="mx-auto" src={success} alt=""/>
            <h3 className="text-2xl mt-6 mb-3 font-heading">Быстрый резултат!</h3>
            <p className="text-gray-500 leading-relaxed">В наше время интернет есть почти в каждой точки страны, а наша
              платформа представляет собой быстрый сайт работающий без перезагрузки страницы.</p>
          </div>
          <div className="lg:w-1/3 px-8 mb-8 lg:mb-0">
            <img className="mx-auto h-16 w-auto" src={kg} alt=""/>
            <h3 className="text-2xl mt-6 mb-3 font-heading">Широкий охват!</h3>
            <p className="text-gray-500 leading-relaxed">По скольку сельское хозяйство в нашей стране широко
              распрастранено, ваше объявление будет доступно по всей стране.</p>
          </div>
        </div>
        <Link to="/about">
          <Button title={'Подробнее'}/>
        </Link>
      </section></>)
      }
      <hr/>

      <section className="bg-white mt-6 mb-32 py-10 shadow-2xl">
        <div className="w-full max-w-4xl text-center mx-auto">
          <h3 className="text-3xl mt-2 mb-6 leading-tight font-heading"><span
            className='font-bold text-bgColor'>VIP</span> - Объявления</h3>
          <p className="mb-8 text-gray-500 leading-relaxed">
            <span className='font-bold'>VIP</span> объявлении всегда находятся в доступной видимости как для старых
            пользователей так и для новых и оно будет паказано большему колличеству людей.
          </p>
        </div>

        <section className="w-full flex justify-center flex-wrap">
          {ads.length ? ads.map(item => <Card key={item._id} data={item}/>) : <p>Объявлений нет</p>}
        </section>

      </section>
    </>
  )
}