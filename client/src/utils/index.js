// normolize and adaptation date
export const getNormalDate = (date) => new Date(date.toString()).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', });

// --------- // helper variables // --------- //
export const location = ['Ыссык-Куль', 'Джалал-Абад', 'Нарын', 'Ош', 'Баткен', 'Чуй', 'Талас', 'Бишкек'];
export const categoryList = ['Другое', 'Крупы и кормы', 'Услуги', 'Крупно-рогатый и мелко-копытный скот', 'Лощади', 'Сель-хоз техника', 'Ремесловые изделия', 'Домашние животные']
export const initialStateForm = { contactNumber: "+996 ", description: "", likeCount: 0, location: location[0], killDate: '7', price: 0, title: "", photo: [], creator: '', category: 'Другое', isCheked: false};

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
  {id: 1, title: 'Профиль', img: "user", url: '/profile'},
  {id: 3, title: 'Избранные', img: "heart", url: '/favorites'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 6, title: 'О проекте', img: "question-mark", url: '/about'}
];

export const pageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 3, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'О проекте', img: "question-mark", url: '/about'},
  {id: 6, title: 'Войти', img: "log-in", url: '/auth'},
];

export const adminPages = [
  {id: 0, title: 'Панель управления', img: "edit", url: '/dashboard'},
];

export const tablHeaders = {
  user: ["Логин", "email", "Кол-во объявлений", "Status", "Привилегия"],
  ads: ["Заголовок", "Дата размещения", "Автор"],
};
