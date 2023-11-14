import { PagedNewsPosts } from '../../types/newsposts.interface.ts';
import { INews, ITable, Params } from '../../types/params.interface.ts';
import { Service } from 'typedi';
import { NewsPostEntity } from '../entity/newspost.ts';
import { AppDataSource } from '../dataSource.ts';
import { DeepPartial, getRepository, Equal } from 'typeorm';
import { AppError, HttpCode } from '../../server/utils/customErrors.ts';
import UsersRepository from '../../dal/users/users.repository.ts';
import logger from '../../server/utils/logger.ts';

@Service()
class NewspostsRepository {
  manager;
  constructor(private usersRepository: UsersRepository) {
    this.manager = AppDataSource.getRepository(NewsPostEntity);
  }
  getAllNewspost = async (params: Params): Promise<PagedNewsPosts> => {
    const newspost = await this.manager.find({
      relations: {
        author: true,
      },
    });

    let result = [...newspost];

    // if (params.filter.author) {
    //   result = newspost.filter((item: INews) => item.title.includes(params.filter.title));
    // }

    if (params.size != null && params.page != null) {
      result = result.splice(params.page * params.size, params.size);
    }

    return {
      total: newspost.length,
      newsposts: result,
      size: params.size || 5,
      page: params.page || 1,
    };
  };

  getById = async (id: string): Promise<any> => {
    try {
      const newsPost = await this.manager.findOne({
        where: {
          id: Equal(+id) as any,
        },
      });
      console.log(newsPost);
      if (!newsPost) {
        throw new AppError({
          message: 'No news post found',
          httpCode: HttpCode.NOT_FOUND,
        });
      }

      return newsPost;
    } catch (e: any) {
      throw new AppError({ message: e.message });
    }
  };

  createANewspost = async (newspost: INews): Promise<any> => {
    const author = await this.usersRepository.getByEmail(newspost.author);
    const post = { ...newspost, author };
    console.log(post);

    const res = await this.manager.create(post as DeepPartial<any>);
    await this.manager.insert(res);
    return res;
  };

  updateANewspost = async (id: string, newspost: INews): Promise<any> => {
    try {
      const existingNewsPost = await this.getById(id);

      if (!existingNewsPost) {
        throw new AppError({ message: `NewsPost with ${id} not found` });
      }
      existingNewsPost.title = newspost.title;
      existingNewsPost.text = newspost.text;
      existingNewsPost.genre = newspost.genre;
      existingNewsPost.isPrivate = newspost.isPrivate;

      const updatedNewsPost = await this.manager.save(existingNewsPost);
      return updatedNewsPost;
    } catch (e: any) {
      logger.error('ERROR:' + JSON.stringify(e));
      return e.message;
    }
  };

  deleteANewspost = async (id: string): Promise<any> => {
    try {
      const newsPost = await this.getById(id);

      if (!newsPost) {
        throw new AppError({ message: `NewsPost with ${id} not found` });
      }
      await this.manager.delete(id);
      return { message: `NewsPost with ID ${id} has been deleted` };
    } catch (e: any) {
      logger.error('ERROR:' + JSON.stringify(e));
      return e.message;
    }
  };
}

export default NewspostsRepository;
