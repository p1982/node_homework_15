import NewspostsService from '../../bll/newsposts/newsposts.service.ts';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import newspostsSchema from './newsposts.schema.ts';
import express from 'express';
import { AppError, ValidationError } from '../utils/customErrors.ts';
import logger from '../utils/logger.ts';
import { INews } from '../../types/params.interface.ts';
import { Service } from 'typedi';

@Service()
class NewspostsController {
  public path = '/newsposts';
  public router = express.Router();
  private newspostValidator: any;

  constructor(private newspostsService: NewspostsService) {
    this.initializeValidators();
    this.initializeRoutes();
  }

  private loggerPrint(body: INews) {
    if (body) {
      logger.info('BODY:' + JSON.stringify(body));
      logger.info('FIELDS:' + JSON.stringify(body));
    }
  }

  public initializeValidators() {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    this.newspostValidator = ajv.compile(newspostsSchema);
  }

  public initializeRoutes() {
    this.router.get('/', this.getAllNewspost);
    this.router.get('/:id', this.getNewspostById);
    this.router.post('/', this.createANewspost);
    this.router.put('/:id', this.updateANewspost);
    this.router.delete('/:id', this.deleteANewspost);
  }

  getNewspostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    const id: string = request.params.id;
    this.loggerPrint(request.body);
    try {    
      const newspost = await this.newspostsService.getById(id);
      response.json(newspost);
    } catch (e: any) {
      logger.error('ERROR:' + JSON.stringify(e));
     next(e.message);
    }
  };

  getAllNewspost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    this.loggerPrint(request.body);
   try {
      const params = {
        size: request.query.size ? Number(request.query.size) : null,
        page: request.query.page ? Number(request.query.page) : null,
        filter: request.query.filter || {},
      };
      const pagedNewsposts = await this.newspostsService.getAllNewspost(params);
      response.json(pagedNewsposts);
    } catch (e: any) {
      logger.error('ERROR:' + JSON.stringify(e));
     next(e.message);
}
  };

  createANewspost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const newspost: INews = request.body;
      this.loggerPrint(request.body);
      const valid = this.newspostValidator(newspost);
      if (!valid) {
        const messages = this.newspostValidator.errors.map(
          (e: any) => `${e.instancePath.slice(1)}: ${e.message}`,
        );

        throw new ValidationError({
          message: messages,
        });
      }
      try {
        const createdNewspost = await this.newspostsService.createANewspost(
          newspost,
        );
        response.json(createdNewspost);
      } catch (e: any) {
        logger.error('WARN:' + JSON.stringify(e));
        throw new AppError({ message: e.message });
      }
    } catch (e: any) {
      logger.error('ERROR:' + JSON.stringify(e));
      next(e.message);
    }
  };

  updateANewspost = async (
    request: express.Request,
    response: express.Response,
  ) => {
    this.loggerPrint(request.body);
    try {
      const newsPost: INews = request.body;
      const id: string = request.params.id;
      const valid = this.newspostValidator(newsPost);
      
      if (!valid) {
        throw new ValidationError({
          message: this.newspostValidator.errors.map((e: any) => ({
            message: e.message,
            statusCode: e.httpCode,
          })),
        });
      }
      const updatedNewspost = await this.newspostsService.updateANewspost(
        id,
        newsPost,
      );
      response.send(updatedNewspost);
    } catch (e: any) {
      logger.error('WARN:' + JSON.stringify(e));
      throw new AppError({ message: e.message });
    }
  };

  deleteANewspost = async (
    request: express.Request,
    response: express.Response,
  ) => {
    const id: string = request.params.id;
    this.loggerPrint(request.body);
    try {
      const message = await this.newspostsService.deleteANewspost(id);
      response.send(message);
    } catch (e: any) {
      logger.error('WARN:' + JSON.stringify(e));
      throw new AppError({ message: e.message });
    }
  };
}

export default NewspostsController;
