import { BaseEntity, EntityManager } from "typeorm";
import { Factory } from "../../types/factory.interface.ts";

async function createMany(manager:EntityManager, factory:Factory<BaseEntity>, count:number) {
  //const promises = [];
  for (let i = 0; i < count; i++) {
    const entity = await factory.createEntity();
    await manager.insert(factory.entity, entity);
   // promises.push(manager.save(entity));
  }
  //return Promise.all(promises);
}
export default createMany