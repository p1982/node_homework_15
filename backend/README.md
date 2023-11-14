# Завдання
Переписати модуль fileDB, створений у домашньому завданні 2, на Typescript, використавши паттерни які ви вважаєте потрібними і аргументувати свій вибір.


## Технічні вимоги

Усі об'єкти та методи повинні мати типи аргументів та типи значення, яке вони повертають.


Треба створити клас, або інтерфейс для об`єкта news по прикладу схеми.


Метод getTable() повинен повертати об'єкт класу з усіма методами та їх сігнатурами, використання яких описані нижче:

// повертаємо усі записи у базі у вигляді масиву
const newsposts = newspostTable.getAll();

// повертаємо запис за вказаним id
const newspost = newspostTable.getById(id);

// додаємо новий запис, та повертаємо його з новим id
const data = {
  title: "У зоопарку Чернігова лисичка народила лисеня",
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
};
const createdNewspost = newspostTable.create(data);

// оновлюємо поле title за вказаним id та повертаємо оновлений запис
const updatedNewsposts = newspostTable.update(id, {
  title: "Маленька лисичка",
});

// видаляємо записа за вказаним id та повертаємо id видаленого запису
const deletedId = newspostTable.delete(id);


Strong Typing: Since TypeScript allows us to define types, we've specified types for arguments and return values of functions. This is not only good for compiler checks but also for readability and maintainability.

Interface for Schema: We have created an interface NewsData to define the structure of a news post. This makes it easier to understand the shape of the data we are working with.

Class-Based Design: We have encapsulated all CRUD operations inside a Table class, making it easy to manage state and modularize code. The methods of the class provide the functionality that interacts with the database.

Error Handling: Using the defined error types makes it easier to maintain and understand the errors that might be thrown by our application.