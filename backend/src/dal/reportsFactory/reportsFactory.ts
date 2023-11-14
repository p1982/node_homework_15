import { REPORT_ENTITY } from '../../types/newsposts.interface.ts';
import PostReportStrategy from './strategies/postReportStrategy.ts';
import UserReportStrategy from './strategies/usersReportStrategy.ts';
import { Service } from 'typedi';
@Service()
class ReportsFactory {
    private stategyMap = {
        user: UserReportStrategy,
        post: PostReportStrategy
    }
  getReportStrategy(entity: REPORT_ENTITY, id:string="0") {
    const strategy = this.stategyMap[entity]
    if(!strategy){
        throw new Error(`not found entity (${entity}) in report strategies`)
    }
return new strategy(id)
  }
}
export default ReportsFactory;
