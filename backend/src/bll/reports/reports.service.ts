import { Service } from 'typedi';
import { REPORT_ENTITY } from '../../types/newsposts.interface.ts';
import ReportsFactory from '../../dal/reportsFactory/reportsFactory.ts';

///report/{entity}
///report/post
//{     totalCount: 4,     MaxContentLength: 56   }
///report/user    {     totalCount: 6,     avgPosts: 0.45   }
@Service()
class ReportsService {
  constructor(private reportsFactory: ReportsFactory) {}
  async getReportByEntity(entity: REPORT_ENTITY) {
    const strategy = this.reportsFactory.getReportStrategy(entity)
    return strategy.buildReport()
  }
}

export default ReportsService;
