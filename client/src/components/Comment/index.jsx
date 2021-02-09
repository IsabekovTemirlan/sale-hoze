import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { adComment, getComments } from "../../api";
import CommnetComponent from "./Comment"

export const Comment = ({ id, isAuth }) => {
  const [comments, setComments] = useState([]);
  const { userName } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const getCommentsFromServer = async (id) => {
    const { data } = await getComments({ id });
    setComments(data);
  }

  useEffect(() => {
    if (isAuth) getCommentsFromServer(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    const date = new Date();
    const commentObj = { id, value, author: userName, date };

    if (value) {
      await adComment(commentObj);
      commentObj.id = Date.now();
      commentObj.date = date;
      comments.push(commentObj);
    }
    setValue("");
  }

  return <CommnetComponent
    comments={comments}
    sendComment={sendComment}
    isAuth={isAuth}
    value={value}
    setValue={setValue}
  />
}
