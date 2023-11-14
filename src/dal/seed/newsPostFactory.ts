import { faker } from '@faker-js/faker';
import { getRepository } from 'typeorm';
import { NewsPostEntity } from '../entity/newspost.ts';
import { UserEntity } from '../entity/user.ts';
import { Factory } from '../../types/factory.interface.ts';

const genre = ['Politic', 'Business', 'Sport', 'Other'];
class NewsPostFactory extends Factory<NewsPostEntity> {
    constructor(){
        super()
        this.entity = NewsPostEntity
      }
    async createEntity():Promise<NewsPostEntity> {
    const usersRepository = getRepository(UserEntity); // Предполагая, что Author - это сущность автора

    const allUsers = await usersRepository.find();
    const newsPost = new NewsPostEntity();
    newsPost.title = faker.random.word();
    newsPost.text = faker.random.words();
    const randomIndex = Math.floor(Math.random() * genre.length);
    const randomGenre = genre[randomIndex];
    if (
      randomGenre === 'Politic' ||
      randomGenre === 'Business' ||
      randomGenre === 'Sport' ||
      randomGenre === 'Other'
    ) {
      newsPost.genre = randomGenre;
    }
    newsPost.isPrivate = Math.random() < 0.5;
    newsPost.author = allUsers[Math.floor(Math.random() * allUsers.length)];
    return newsPost;
  }
}

export default NewsPostFactory;
