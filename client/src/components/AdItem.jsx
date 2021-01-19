import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { getNormalDate } from "../utils";
import "boxicons";

export const AdItem = ({ data, handler, id, editHandler, forAdmin }) => {
  const [showModal, setShowModal] = useState(false);
  const { title, createdAt, killDate, _id, creator } = data;
  let userToBe;

  if (forAdmin) userToBe = forAdmin.filter(v => v._id === creator);

  const confireHandler = () => {
    handler(_id);
    setShowModal(false);
  }

  return (
    <tr className="border-b hover:bg-orange-100 bg-gray-100 page-enter">
      <td className="p-1 cdd:p-3 cdd:px-5">
        <p>{title}</p>
      </td>
      <td className="p-1 cdd:p-3 cdd:px-5">
        <p>{getNormalDate(createdAt)}</p>
        {showModal && <Modal
          title="Удаление объявления"
          body="Вы уверены что хотите удалить объявление?"
          close={() => setShowModal(false)}
          agree={confireHandler} />}
      </td>
      <td className="p-1 cdd:p-3 cdd:px-5 hidden sm:table-cell">
        <p>{forAdmin ? (
          userToBe.length ? <Link className="underline" to={`users/${creator}`}>{creator}</Link> : "Нет автора"
        ) : (killDate === "false" ? "Бесконечно" : killDate)}</p>
      </td>
      <td className="p-1 cdd:p-3 cdd:px-5 flex justify-end items-center">

        <div className="cursor-pointer mr-2">
          <Link to={`/detail/${id}`}>
            <box-icon title="Открыть" name="window-open" color="blue"></box-icon>
          </Link>
        </div>
        {forAdmin ? null : <div className="cursor-pointer"> <box-icon title="Редактировать" onClick={() => editHandler(data, id)} name="edit-alt" color="green"></box-icon></div>}
        <div className="cursor-pointer ml-2">
          <box-icon
            onClick={() => setShowModal(true)}
            name="trash"
            type="solid"
            color="red"
            title="Удалить"
          ></box-icon>
        </div>
      </td>
    </tr>
  );
};
