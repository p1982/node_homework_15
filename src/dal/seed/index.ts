import { createConnection } from "typeorm";
import createMany from "./helpers.ts";
import NewsPostFactory from "./newsPostFactory.ts";
import UserFactory from "./userFactory.ts";
import { AppDataSource } from "../dataSource.ts";


// AppDataSource.initialize().then(async() => {
// await AppDataSource.manager.transaction(
//   async (transactionalEntityManager)=>{
//     await createMany(transactionalEntityManager, new NewsPostFactory(), 20)
//   }
//   // async (transactionalEntityManager)=>{
//   //   await createMany(transactionalEntityManager, new UserFactory(), 10)
//   // }
// )
// })

// createConnection().then(async (connection) => {
//   await connection.manager.transaction(async (transactionalEntityManager) => {
//     await createMany(transactionalEntityManager, new UserFactory(), 20);
//   });
// });

// createConnection().then(async (connection) => {
//   await connection.manager.transaction(async (transactionalEntityManager) => {
//     await createMany(transactionalEntityManager, new NewsPostFactory(), 120);
//   });
// });

async function run() {
  console.log(111)
  const connection = await createConnection();
  console.log(connection, 2222);
  
  await connection.manager.transaction(async (transactionalEntityManager) => {
    await createMany(transactionalEntityManager, new UserFactory(), 20);
  });
  await connection.manager.transaction(async (transactionalEntityManager) => {
    await createMany(transactionalEntityManager, new NewsPostFactory(), 120);
  });
}
run()

// async function run() {
//   const connection = await createConnection();
//   await connection.manager.transaction(async (transactionalEntityManager) => {
//     await createMany(transactionalEntityManager, new UserFactory(), 20);
//   });
// }
// run();