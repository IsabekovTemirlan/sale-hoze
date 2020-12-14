import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { categoryList, location, fileUploadeToFirebase } from "../utils";
import { Button } from "../components/Button";

import { updateAd } from "../actions/ads";

export const AdEditForm = ({ showForm, data, id }) => {
  const [state, setState] = useState(data);
  const dispatch = useDispatch();

  const updateAdHandler = () => {
    dispatch(updateAd(id, state));
  };

  // set field names and values
  const fieldChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  // set date when ads to be auto deleted
  const changeKillDate = (e) =>
    setState({ ...state, killDate: e.target.value });

  // multiple files upload
  const fileUploadHandler = (e) => {
    const [imgUrl, fileName] = fileUploadeToFirebase(e.target.files);
    setState((prev) => ({ ...prev, photo: imgUrl, photoName: fileName }));
  };

  return (
    <>
      <hr />
      <div className="pt-4 block">
        <h1 className="text-2xl text-center">Редактирование</h1>
      </div>
      <div className="mt-6 bg-white p-2 ">
        <div className="w-full rounded flex justify-between flex-wrap">
          <div className="m-2 w-1/4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                {" "}
                Наименование{" "}
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
                {" "}
                Описание{" "}
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
          </div>
          <div className="m-2 w-1/4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contactNumber"
              >
                {" "}
                Номер телефона{" "}
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
                {" "}
                Цена (com){" "}
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
                {" "}
                Категория{" "}
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
          </div>
          <div className="m-2 w-1/4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                {" "}
                Выберите область{" "}
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
                {" "}
                Срок существования{" "}
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
                {/* {ownerId && <option value={false}>На всегда</option>} */}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photo"
              >
                {" "}
                Фото{" "}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="photo"
                type="file"
                multiple
                onChange={fileUploadHandler}
              />
              <div className="flex flex-wrap">
                {state.photo &&
                  state.photo.map((p) => (
                    <img
                      key={p.length}
                      className="m-1 w-auto h-12 border-solid border border-gray-600"
                      src={p}
                      alt=""
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div onClick={() => showForm(false)}>
          <Button title="Отменить" btnType="bg-red-600" pad="py-2" />
          <Button
            handler={updateAdHandler}
            title="Сохранить"
            btnType="bg-green-600"
            pad="py-2"
          />
        </div>
      </div>
    </>
  );
};
