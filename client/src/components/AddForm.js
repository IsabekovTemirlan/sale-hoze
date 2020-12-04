import React, {useState} from "react";
import FileBase from "react-file-base64";

import {useDispatch} from "react-redux";
import {Button} from "./Button";
import {createAd} from "../actions/ads";

const location = ['Ыссык-Куль', 'Джалал-Абад', 'Нарын', 'Ош', 'Баткен', 'Чуй', 'Талас', 'Бишкек'];

export const AddForm = ({ownerId}) => {
  const [state, setState] = useState({
    contactNumber: "",
    description: "",
    likeCount: 0,
    location: "",
    killDate: '',
    price: "",
    title: "",
    photo: '',
    creator: ownerId,
    category: ''
  });
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(createAd(state));

    setState({
      contactNumber: "",
      description: "",
      likeCount: 0,
      location: "",
      killDate: '',
      price: "",
      title: "",
      photo: '',
      creator: '',
      category: ''
    });

  }

  const fieldChange = (e) => {
    let name = e.target.name,
      value = e.target.value;

    const likeCount = 0
    const createdAt = new Date()

    if (name.length) setState({...state, [name]: value, likeCount, createdAt});

  }

  return (
    <>
      <form className="max-w-screen-cdd mt-6 p-2 pb-6 mx-auto text-left bg-orange-100 border border-bgColor rounded"
            onSubmit={submitForm}>
        <div className="mt-2">

          <div className="border-gray-200 pb-2">
            <div className="w-1/5 font-bold h-6 mx-2 mt-3 text-gray-800">Наименование</div>
            <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <input
                type="text"
                placeholder="Что вы хотите продать?"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                name="title"
                value={state.title}
                onChange={fieldChange}
                required
              />
            </div>

            <div className="w-1/5 font-bold h-6 mx-2 mt-3 text-gray-800">Описание</div>
            <div className="m-2 p-1 bg-white flex border border-gray-200 rounded">
              <textarea
                placeholder="Подробно опишите что именно вы хотите продать!"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                rows="5"
                name="description"
                value={state.description}
                onChange={fieldChange}
                required
              />
            </div>


            <div className="my-2">
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">Номер телефона</div>
              <input
                placeholder="Укажите собственный номер"
                className="p-2 mt-2 appearance-none outline-none w-full text-gray-800 border border-gray-200 rounded"
                type="tel"
                name="contactNumber"
                value={state.contactNumber}
                onChange={fieldChange}
                required
              />
            </div>

            <div className="my-2">
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">Цена</div>
              <input
                placeholder="Укажиет цену"
                className="p-2 mt-2 appearance-none outline-none w-full text-gray-800 border border-gray-200 rounded"
                name="price"
                value={state.price}
                onChange={fieldChange}
                required
                type='number'
              />
            </div>

            <div className="my-2">
              <div className="font-bold mx-2 mt-3 text-gray-800">Категория</div>
              <select
                className="flex-1 h-10 mt-2 form-select w-full border-solid border border-gray-200 rounded"
                onChange={fieldChange}
                name="category"
                required
              >
                <option>Крупы и кормы</option>
                <option>Услуги</option>
                <option>Крупно-рогатый и мелко-копытный скот</option>
                <option>Лощади</option>
                <option>Сель-хоз техника</option>
                <option>Ремесловые изделия</option>
                <option>Домашние животные</option>
              </select>
            </div>

            <div className="my-2">
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">Выберите область</div>
              <select
                className="flex-1 p-2 mt-2 form-select w-full border-solid border border-gray-200 rounded"
                onChange={fieldChange}
                name="location"
                value={state.location}
                required
              >
                {location.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>

            <div className="my-2">
              <div className="font-bold mx-2 mt-3 text-gray-800">Срок существования</div>
              <select
                className="flex-1 h-10 mt-2 form-select w-full border-solid border border-gray-200 rounded"
                onChange={fieldChange}
                name="killDate"
                required
              >
                <option>7 дней</option>
                <option>1 день</option>
                <option>2 дня</option>
                <option>3 дня</option>
                <option>4 дня</option>
                <option>5 дней</option>
                <option>6 дней</option>
              </select>
            </div>

            <div className="w-1/3 font-bold mx-2 mt-3 h-6 mt-1 text-gray-800">Фото</div>
            <div className="my-2 p-1 bg-white flex flex-wrap ">
              <div
                className="p-2 px-2 flex flex-wrap appearance-none outline-none w-full text-gray-800 cursor-pointer border border-gray-200 rounded">
                <FileBase
                  multiple={false}
                  onDone={({base64}) => setState({...state, photo: base64})}
                  required
                  type='file'
                />
              </div>
              {state.photo &&
              <img className="m-1 w-auto h-12 border-solid border border-gray-600" src={state.photo} alt=""/>}
            </div>

            <div className="flex mt-4 items-center justify-center">
              <Button type={'submit'} title="Опубликовать"/>
            </div>

          </div>
        </div>
      </form>

    </>
  )
}
