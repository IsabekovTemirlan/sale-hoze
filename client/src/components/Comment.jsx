import React, {useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Button } from "./Button";
import {adComment} from "../api";
import {getNormalDate} from "../utils";

const CommentItem = ({ text, date, author }) => {
  return (
    <div className="bg-white border border-l-0 border-t-0 justify-start border-r-0 p-3 flex flex-col">
      <div className="flex flex-row items-center mr-2">
        <h3 className="mr-2 text-purple-600 font-semibold text-sm md:text-left ">@{author}</h3>
        <p className="text-gray-500 text-sm ">{getNormalDate(date)}</p>
      </div>
      <p className="text-gray-800">{text}</p>
    </div>
  )
}

export const Comment = ({comments, id}) => {
  const {userName} = useContext(AuthContext);
  const [value, setValue] = useState("");

  const sendComment = async (e) => {
    e.preventDefault();

    const commentObj = {
      id,
      text: value,
      author: userName,
      date: new Date()
    }

    if (value) {
      await adComment(commentObj);
      commentObj.id = Date.now();
      comments.push(commentObj);
    }
    setValue("");
  }

  return (
    <div className="w-full mt-10">
      <h1 className="mt-3 text-gray-500 text-2xl text-center">Комментарии</h1>
      <section>
        <div className="pt-2">
        {comments.length ? comments.map(c => <CommentItem
          key={c._id}
          text={c.text}
          date={c.date}
          author={c.author}
        />) : <p className="text-center">Комментариев нет</p>}
        </div>

        <form onSubmit={sendComment}>
          <textarea
            className="w-full outline-none border p-4 mt-4 mb-2 rounded-lg focus:shadow-outline"
            placeholder="Напишите свой комментарий здесь" cols="6" rows="4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <Button disabled={value ? false : true} type="submit" title="Отправить" />
        </form>
      </section>
    </div>
  )
}