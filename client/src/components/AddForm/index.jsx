import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createAd } from "../../actions/ads";
import { initialStateForm } from "../../utils";
import { SET_ALERT } from "../../types";
import { uploadImage } from "../../api";
import { AuthContext } from "../../context/authContext";
import AddFormComponent from "./AddForm";

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

  return <AddFormComponent
    ownerId={ownerId}
    state={state}
    submitForm={submitForm}
    fieldChange={fieldChange}
    changeKillDate={changeKillDate}
    fileUploadHandler={fileUploadHandler}
    checkboxHandler={checkboxHandler}
    clearFormField={clearFormField}
  />
};
