import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAd } from "../../actions/ads";
import { uploadImage } from "../../api";
import AddEditFormContainer from "./AdEditForm";

export const AdEditForm = ({ showForm, userId, data, id }) => {
  const [state, setState] = useState(data);
  const dispatch = useDispatch();

  const updateAdHandler = () => { dispatch(updateAd(id, state)); };

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
  const fileUploadHandler = async (e) => {

    try {
      const formData = new FormData();
      const file = e.target.files[0];

      formData.append('adImages', file)
      formData.append('name', file.name)
      formData.append('imgInfo', userId)

      const { data } = await uploadImage(formData);

      setState((prev) => ({ ...prev, photo: [...prev.photo, data] }));
    } catch (e) {
      console.log(e.message);
    }

    // const [imgUrl, fileName] = fileUploadeToFirebase(e.target.files);
    // setState((prev) => ({ ...prev, photo: imgUrl, photoName: fileName }));     
  };

  return <AddEditFormContainer
    state={state}
    showForm={showForm}
    fieldChange={fieldChange}
    updateAdHandler={updateAdHandler}
    changeKillDate={changeKillDate}
    fileUploadHandler={fileUploadHandler}
  />
};
