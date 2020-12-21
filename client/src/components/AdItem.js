import React from 'react'
import { Link } from "react-router-dom";
import { getNormalDate } from "../utils";
import "boxicons";

export const AdItem = ({ data, handler, id, editHandler, forAdmin }) => {
  const { title, createdAt, killDate, _id, creator } = data;
  let userToBe;

  if (forAdmin) {
    userToBe = forAdmin.filter(v=> v._id === creator)
  }

  return (
    <tr className="border-b hover:bg-orange-100 bg-gray-100">
      <td className="p-3 px-5">
        <p>{title}</p>
      </td>
      <td className="p-3 px-5">
        <p>{getNormalDate(createdAt)}</p>
      </td>
      <td className="p-3 px-5">
        <p>{forAdmin ? (
          userToBe.length ? <Link className="underline" to={`users/${creator}`}>{creator}</Link> : "Нет автора"
        ) : killDate}</p>
      </td>
      <td className="p-3 px-5 flex justify-end items-center">
        <div className="cursor-pointer mr-2">
          <Link to={`/detail/${id}`}>
            <box-icon title="Открыть" name="window-open" color="blue"></box-icon>
          </Link> 
        </div>
        {forAdmin ? null : <div className="cursor-pointer"> <box-icon title="Редактировать" onClick={() => editHandler(data, id)} name="edit-alt" color="green"></box-icon></div>}
        <div className="cursor-pointer ml-2">
          <box-icon
            onClick={() => handler(_id)}
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
