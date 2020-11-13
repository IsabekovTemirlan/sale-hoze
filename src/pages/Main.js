import React from 'react';
import { Button } from "../components/Button";

export const MainPage = () => {
  return (
    <div className="m-auto pt-12 p-2 max-w-screen-xl bg-white shadow-2xl">
      <section className="py-12 px-4 text-center">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">Добро пожаловать в <span className='font-bold text-bgColor'>SaleHoz</span>!</h2>
          <p className="mb-8 text-gray-500 leading-relaxed"><span className='font-bold'>SaleHoz</span> - это бесплатная и удобная платформа для объявлений, разработанная именно для сельско-хозяйственного сегмента, здесь вы можете не только найти более подходящее вам объявление при помощи различной сортировки но и так же можете подать своё собственное.</p>
          <div>
            <Button title={'Найти объявление'} />
            <Button title={'Подать объявление'} />
          </div>
        </div>
      </section>
    </div>
  )
}