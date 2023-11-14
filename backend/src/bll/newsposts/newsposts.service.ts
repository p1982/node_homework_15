import NewspostsRepository from '../../dal/newsposts/newsposts.repository.ts';
import {INews, Params} from '../../types/params.interface.ts';
import {Service} from 'typedi';
import { PagedNewsPosts } from 'types/newsposts.interface.ts';

@Service()
class NewspostsService {
  constructor(private newspostsRepository:NewspostsRepository) {
  }

  getAllNewspost = async(params: Params): Promise<PagedNewsPosts> => {   
    return await this.newspostsRepository.getAllNewspost(params);
  };

  getById = async(id:string):Promise<INews> => {
    const newsPost = await this.newspostsRepository.getById(id)    
    return await newsPost;
  }

  createANewspost = async (newsPost: INews): Promise<INews> => {  
    return await this.newspostsRepository.createANewspost(newsPost);
  };

  updateANewspost = async (id:string, newsPost: INews): Promise<INews> => { 
    return await this.newspostsRepository.updateANewspost(id, newsPost);
  };

  deleteANewspost = async (id:string): Promise<any> => {  
    return await this.newspostsRepository.deleteANewspost(id);
  };
}

export default NewspostsService;
