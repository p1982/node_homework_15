import ReportsService from '../../bll/reports/reports.service.ts';
import express from 'express';
import { Service } from 'typedi';
import { REPORT_ENTITY } from '../../types/newsposts.interface.ts';


@Service()
class ReportsController {
  public path = '/reports';
  public router = express.Router();
  constructor(private reportsService: ReportsService) {
    
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get('/:entity', this.getReport);
    
  }
  async getReport(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ){
    const pagedNewsposts = await this.reportsService.getReportByEntity(request.params.entity as REPORT_ENTITY);
  }
}
export default ReportsController;
