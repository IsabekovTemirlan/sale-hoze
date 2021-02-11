import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { Alert } from "../../components/Alert";
import "boxicons";

const UserPage = ({ modalForUser, setModalForUser, deleteUserHandler, showModal, setSowModal, toAdminister, user, alert }) => {
  return (
    <>
      {modalForUser && <Modal close={() => setModalForUser(false)} agree={deleteUserHandler} title="Удаление пользователя" body={`Вы уверены что хотите удалить пользователя ${user.login}?`} />}
      {showModal && <Modal close={() => setSowModal(false)} agree={toAdminister} title="Админимстрирование" body={`Вы уверены в присвоении пользователю ${user.login} роль Адмимнистратора?`} />}
      <div className="mt-1 md:flex-1 flex page-enter">
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Login
          </p>
          <p className="">{user.login}</p>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Email
          </p>
          <p className="">{user.email}</p>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Roles
          </p>
          <div className="">
            {user.roles.map((r) => (
              <div key={r}>
                <p>{r}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Ads</p>
          <div className="">
            {user.links.length ? user.links.map((r) => (
              <div key={r} className="flex">
                <Link className="text-blue-500 underline" to={`/detail/${r}`}>{r}<box-icon color="#4299e1" size="xs" name='link-external'></box-icon></Link>
              </div>
            )) : <p className="text-gray-400">Нет объявлений</p>}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center page-enter">
        {user.roles.includes("ADMIN") ? <Button title="Лишить привилегий" handler={() => setSowModal(!showModal)} pad="py-2" /> : <Button handler={() => setSowModal(!showModal)} title="Назначить Админом" pad="py-2" />}
        <Button handler={() => setModalForUser(true)} title="Удалить" btnType="bg-red-600" pad="py-2" />
      </div>
      {alert && <Alert text={alert} />}
    </>
  );
};
export default UserPage;