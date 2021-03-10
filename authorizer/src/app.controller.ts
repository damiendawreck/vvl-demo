import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async validate(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log(req.headers);
    const valid = await this.appService.opaValidated(req);

    if (!valid) {
      return res.status(403).json({
        statusCode: 403,
        message: 'ko',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'ok',
    });
  }
}
