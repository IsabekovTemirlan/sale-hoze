import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { comfort, success, kg } from "../assets/icons";

export const AboutPage = ({ isAuth }) => {
  return (
    <>
      <section className="pt-2 pb-12 mx-auto px-4 text-center page-enter">
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

      <section className="py-12 px-4 mb-32 text-center bg-white shadow-2xl page-enter">
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

      <section className="py-12 px-4 mb-32 text-left bg-white shadow-2xl page-enter">
        <h1 className="font-bold mt-2">Пользовательское соглашение</h1>
        <p>1. Термины</p>

        <p>В настоящем Соглашении используются следующие термины:</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam doloremque ex dolor nesciunt mollitia, totam eum quisquam est necessitatibus pariatur iste ipsa provident molestiae ratione, suscipit ad architecto aliquid corrupti! </p>        

        <p className="font-bold mt-2">2. Условия использование маркетплейса.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolore dignissimos similique molestias molestiae, in vel accusamus nulla suscipit beatae accusantium earum animi quis, quia nobis! Rerum perspiciatis facilis vero? </p>

        <p className="font-bold mt-2">3. Интеллектуальная собственность</p>
       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, magni ullam. Officia dolore eaque ut rerum facilis repudiandae eius atque distinctio. Beatae excepturi laborum quam vel, impedit dolorum eaque incidunt?</p>

        <p className="font-bold mt-2">4. Конфидециальность</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis recusandae maiores itaque! Temporibus commodi, sunt sed delectus a quae beatae nulla doloribus ipsam, aliquid esse quidem natus praesentium assumenda odit?</p>

        <p className="font-bold mt-2">5. Форс-мажор</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad praesentium illum quibusdam eligendi magnam mollitia optio est sunt blanditiis nihil unde autem perspiciatis corrupti distinctio laboriosam nam culpa, aspernatur in!</p>

        <p className="font-bold mt-2">6. Срок действия Соглашения</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloribus, perspiciatis quaerat libero accusantium architecto minima eaque possimus labore doloremque, rem vero, cumque sapiente. Aliquid soluta voluptatem ducimus eligendi cupiditate.</p>

        <p className="font-bold mt-2">7. Прочие условия</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, illum similique. Minima blanditiis earum, numquam voluptatem suscipit praesentium, explicabo soluta optio, architecto saepe excepturi fuga laudantium est dolores id deleniti.</p>
      </section>

      <div>
        <Link to="/admin" className="m-2 text-blue-600 underline p-4 text-center"> Для правообладателей</Link>
      </div>
    </>
  )
}
