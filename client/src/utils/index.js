import { app } from "../base";
// --------- // helper functions // --------- //

// create image url for using in front
export const createPersistentDownloadUrl = (bucket, pathToFile) => `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${pathToFile}?alt=media&token=72f92c7d-3d18-4008-ac05-86cabd234dc8`;

// function to upload file into firebase storage
export const fileUploadeToFirebase = (filesArr) => {
  const files = [...filesArr];
  const storageRef = app.storage().ref();

  const imgUrl = [], fileName = [];

  // loop for put every uploaded file into firebase storage
  files.forEach((file) => {
    const namePrefix = new Date().getMinutes().toString();
    const fileRef = storageRef.child(file.name + namePrefix);

    fileRef.put(file).then((e) => {
      const { bucket, path } = e._delegate.ref._location;
      imgUrl.push(createPersistentDownloadUrl(bucket, path)); // save img URL
      fileName.push(file.name + namePrefix);
    });
  });

  return [imgUrl, fileName]
}

// normolize and adaptation date
export const getNormalDate = (date) => new Date(date.toString()).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', });

// this function delete photo in firebase with help photoName
export const deletPhotoInFirebase = (photoName) => {
  if (photoName) {
    try {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(photoName);
      fileRef.delete().catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }
}

// --------- // helper variables // --------- //
export const location = ['Ыссык-Куль', 'Джалал-Абад', 'Нарын', 'Ош', 'Баткен', 'Чуй', 'Талас', 'Бишкек'];
export const categoryList = ['Другое', 'Крупы и кормы', 'Услуги', 'Крупно-рогатый и мелко-копытный скот', 'Лощади', 'Сель-хоз техника', 'Ремесловые изделия', 'Домашние животные']
export const initialStateForm = { contactNumber: "+996 ", description: "", likeCount: 0, location: location[0], killDate: '7', price: "", title: "", photo: [], creator: '', category: 'Другое', photoName: [], isCheked: false};