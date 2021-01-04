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
export const initialStateForm = { contactNumber: "+996 ", description: "", likeCount: 0, location: location[0], killDate: '7', price: 0, title: "", photo: [], creator: '', category: 'Другое', photoName: [], isCheked: false};

export const sortList = [
  {id: 0, title: 'Все объявления', value: 'all'},
  {id: 1, title: 'Цена (дорогие)', value: 'expensive'},
  {id: 2, title: 'Цена (дешёвые)', value: 'cheap'},
  {id: 3, title: 'Старые', value: 'old'},
  {id: 4, title: 'Новые', value: 'new'},
];

// Navigation Links
export const authPageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 2, title: 'Профиль', img: "user", url: '/profile'},
  {id: 3, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 6, title: 'О проекте', img: "question-mark", url: '/about'}
];

export const pageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 2, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 3, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'О проекте', img: "question-mark", url: '/about'},
  {id: 6, title: 'Войти', img: "log-in", url: '/auth'},
];

export const adminPages = [
  {id: 0, title: 'Панель управления', img: "edit", url: '/dashboard'},
];