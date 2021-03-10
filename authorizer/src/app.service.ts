import { HttpService, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  private opaUrl;

  constructor(private httpService: HttpService) {
    this.opaUrl = 'http://opa:8181/v1/data';
  }

  async opaValidated(request: Request): Promise<any> {
    return this.httpService
      .post(`${this.opaUrl}/projects`, {
        headers: request.headers,
      })
      .toPromise()
      .then((response) => {
        if (!response.data.hasOwnProperty('result')) {
          return false;
        }
        return response.data.result.allow;
      })
      .catch(() => {
        return Promise.resolve(false);
      });
  }
}
