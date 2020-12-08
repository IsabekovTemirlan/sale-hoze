// helper functions
export const createPersistentDownloadUrl = (bucket, pathToFile) => `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${pathToFile}?alt=media&token=72f92c7d-3d18-4008-ac05-86cabd234dc8`;
export const getTimeOutValue = (time) => new Date(new Date().getTime() + ((+time * 86400) * 1000)).getTime();

// helper variables
export const location = ['Ыссык-Куль', 'Джалал-Абад', 'Нарын', 'Ош', 'Баткен', 'Чуй', 'Талас', 'Бишкек'];
export const categoryList = ['Другое', 'Крупы и кормы', 'Услуги', 'Крупно-рогатый и мелко-копытный скот', 'Лощади', 'Сель-хоз техника', 'Ремесловые изделия', 'Домашние животные']
export const initialStateForm = {contactNumber: "+996", timeOut: undefined, description: "", likeCount: 0, location: location[0], killDate: '7', price: "", title: "", photo: '', creator: '', category: 'Другое', createdAt: undefined};