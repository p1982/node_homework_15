import 'reflect-metadata';
import App from './server/app.ts';
import NewspostsController from './server/newsposts/newsposts.controller.ts';
import { Container } from 'typedi';
import config from './config/index.ts';
import AuthController from './server/auth/auth.controller.ts';
import ReportsController from './server/reports/reports.controller.ts';
import { AppDataSource } from './dal/dataSource.ts';
const PORT = config.get('PORT');
const HOST = config.get('HOST');

const newsSchema = {
  id: String,
  title: String,
  text: String,
  createDate: Date,
  updateDate: Date,
};

const usersSchema = {
  id: String,
  email: String,
  password: String

};

const init = async (PORT: number) => {
  await AppDataSource.initialize()
  const app = await new App([Container.get(NewspostsController), Container.get(ReportsController), Container.get(AuthController)], PORT);
  app.listen();
};

init(PORT);
