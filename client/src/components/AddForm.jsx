import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { createAd } from "../actions/ads";
import {
  categoryList,
  initialStateForm,
  location,
} from "../utils";
import { SET_ALERT } from "../types";
import { uploadImage, url } from "../api";
import { AuthContext } from "../context/authContext";

export const AddForm = ({ ownerId }) => {
  const [state, setState] = useState(initialStateForm);
  const { userId } = useContext(AuthContext);
  const dispatch = useDispatch();

  // put the data to the data base
  const submitForm = (e) => {
    e.preventDefault();

    if (state.isCheked) {
      dispatch(createAd(state));
      setState(initialStateForm); // set initial state
      window.scrollTo(0, 0);
    } else { dispatch({ type: SET_ALERT, payload: { text: "Загрузите фото", type: 300 } }); }
  }

  // set field names and values
  const fieldChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
      creator: ownerId,
    });

  // set date when ads to be auto deleted
  const changeKillDate = (e) => {
    const killDate = e.target.value;
    setState(prev => {
      return { ...prev, killDate }
    });
  }

  // multiple files upload
   const fileUploadHandler = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];

      formData.append('adImages', file)
      formData.append('name', file.name)
      formData.append('imgInfo', userId || ownerId)

      const { data } = await uploadImage(formData);

      setState((prev) => ({ ...prev, photo: [...prev.photo, data] }));
    } catch (e) {
      console.log(e.message);
    }
  }

  // terms got it
  const checkboxHandler = (e) => setState({ ...state, isCheked: e.target.value });

  const clearFormField = (e) => {
    e.preventDefault();
    setState(initialStateForm);
  }

  return (
    <div className="w-full m-auto max-w-sm page-enter">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Наименование
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            type="text"
            placeholder="Что вы хотите продать?"
            required
            value={state.title}
            onChange={fieldChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Описание
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={state.description}
            name="description"
            onChange={fieldChange}
            required
            rows="5"
            placeholder="Подробно опишите что именно вы хотите продать!"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contactNumber"
          >
            Номер телефона
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Укажите собственный номер"
            type="tel"
            name="contactNumber"
            value={state.contactNumber}
            onChange={fieldChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Цена (com)
          </label>
          <input
            placeholder="Укажиет цену"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="price"
            value={state.price}
            onChange={fieldChange}
            required
            type="number"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Категория
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={fieldChange}
            name="category"
            defaultValue={state.category}
            required
          >
            {categoryList.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Выберите область
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={fieldChange}
            name="location"
            value={state.location}
            required
          >
            {location.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="killDate"
          >
            Срок существования
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeKillDate}
            name="killDate"
            placeholder="Выберите срок существования"
            defaultValue={state.killDate}
            required
          >
            <option value={7}>7 дней</option>
            <option value={1}>1 день</option>
            <option value={2}>2 дня</option>
            <option value={3}>3 дня</option>
            <option value={4}>4 дня</option>
            <option value={5}>5 дней</option>
            <option value={6}>6 дней</option>
            {ownerId && <option value={false}>На всегда</option>}
          </select>
        </div>

        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Фото
          </span>
          <input
            // className="shadow overflow-hidden appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            className="hidden focus:outline-none focus:shadow-outline"
            name="photo"
            id="imgupload"
            type="file"
            onChange={fileUploadHandler}
          />
          <label className="shadow cursor-pointer flex items-center justify-between overflow-hidden border mt-2 mx-auto rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" htmlFor='imgupload'>Добавить фото <box-icon color="#ff5722" name='image-add'></box-icon></label>
          <div className="flex flex-wrap mt-3">
            {state.photo &&
              state.photo.map((p) => (
                <img
                  key={p.id}
                  className="m-1 w-auto h-12 border-solid border border-gray-600"
                  src={`${url}${p.url}`}
                  alt=""
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="terms"
          >
            Условия соглашения
          </label>
          <div className="flex items-center">
            <input
              name="terms"
              type="checkbox"
              value={state.isCheked}
              onChange={checkboxHandler}
            />
            <a className="ml-2 text-blue-600 underline" href="/about">
              Условия и правила
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button type={"submit"} title="Опубликовать" />
        </div>
        <div className="text-center"><button className="focus:outline-none" onClick={clearFormField}>Очистить форму</button></div>
      </form>
    </div>
  );
};
