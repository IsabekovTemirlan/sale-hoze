import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { createAd } from "../actions/ads";

import {
  categoryList,
  createPersistentDownloadUrl,
  getTimeOutValue,
  initialStateForm,
  location,
} from "../utils";
import { app } from "../base";

export const AddForm = ({ ownerId }) => {
  const [state, setState] = useState(initialStateForm);
  const dispatch = useDispatch();

  // put the data to the data base
  const submitForm = (e) => {
    e.preventDefault();
    console.log(state);

    if (state.isCheked) {
      dispatch(createAd(state));
      setState(initialStateForm); // set initial state
    } else {
      dispatch({ type: "SET_ALERT", payload: "Загрузите фото" });
    }
  };

  // set field names and values
  const fieldChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
      createdAt: new Date(),
      creator: ownerId,
    });

  // set date when ads to be auto deleted
  const changeKillDate = (e) => setState({ ...state, killDate: e.target.value });

  // multiple files upload logic
  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    const storageRef = app.storage().ref();

    // loop for put every uploaded file into firebase storage
    files.forEach((file) => {
      const fileRef = storageRef.child(file.name);

      fileRef.put(file).then((e) => {
        const { bucket, path } = e._delegate.ref._location;
        const imgUrl = createPersistentDownloadUrl(bucket, path); // safe img URL for display in frontend

        setState(prevState => ({...prevState, photo: [...prevState.photo, imgUrl], photoName: [...prevState.photoName, file.name]}))
      });
    });
  };

  // terms got it
  const checkboxHandler = (e) => {
    const timeOut = getTimeOutValue(state.killDate).getTime(); // get ended time for auto delet ads
    setState({...state, isCheked: e.target.value, timeOut});
  }

  return (
    <>
      <form
        className="max-w-screen-cdd mt-6 p-2 pb-6 mx-auto text-left bg-orange-100 border border-bgColor rounded"
        onSubmit={submitForm}
      >
        <div className="mt-2">
          <div className="border-gray-200 pb-2">
            <div className="w-1/5 font-bold h-6 mx-2 mt-3 text-gray-800">
              Наименование
            </div>
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

            <div className="w-1/5 font-bold h-6 mx-2 mt-3 text-gray-800">
              Описание
            </div>
            <div className="m-2 p-1 bg-white flex border border-gray-200 rounded">
              <textarea
                placeholder="Подробно опишите что именно вы хотите продать!"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                rows="5"
                value={state.description}
                name="description"
                onChange={fieldChange}
                required
              />
            </div>

            <div className="my-2">
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">
                Номер телефона
              </div>
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
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">
                Цена (com)
              </div>
              <input
                placeholder="Укажиет цену"
                className="p-2 mt-2 appearance-none outline-none w-full text-gray-800 border border-gray-200 rounded"
                name="price"
                value={state.price}
                onChange={fieldChange}
                required
                type="number"
              />
            </div>

            <div className="my-2">
              <div className="font-bold mx-2 mt-3 text-gray-800">Категория</div>
              <select
                className="flex-1 h-10 mt-2 form-select w-full border-solid border border-gray-200 rounded"
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

            <div className="my-2">
              <div className="w-1/2 font-bold h-6 mx-2 mt-3 text-gray-800">
                Выберите область
              </div>
              <select
                className="flex-1 p-2 mt-2 form-select w-full border-solid border border-gray-200 rounded"
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

            <div className="my-2">
              <div className="font-bold mx-2 mt-3 text-gray-800">
                Срок существования
              </div>
              <select
                className="flex-1 h-10 mt-2 form-select w-full border-solid border border-gray-200 rounded"
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

            <div className="w-1/3 font-bold mx-2 mt-3 h-6 text-gray-800">
              Фото
            </div>
            <div className="my-2 p-1 bg-white flex flex-wrap ">
              <div className="p-2 px-2 flex flex-wrap appearance-none outline-none w-full text-gray-800 cursor-pointer border border-gray-200 rounded">
                <input type="file" multiple onChange={fileUploadHandler} />
              </div>
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

            <div className="my-2">
              <div className="font-bold mx-2 mt-3 text-gray-800">
                Условия соглашения
              </div>
              <input type="checkbox" value={state.isCheked} onChange={checkboxHandler}/>
            </div>

            <div className="flex mt-4 items-center justify-center">
              <Button type={"submit"} title="Опубликовать" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
