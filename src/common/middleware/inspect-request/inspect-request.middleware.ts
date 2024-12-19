import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class InspectRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(InspectRequestMiddleware.name);

  use(req: any, res: any, next: () => void) {
    const userAgent = req.headers['user-agent'];

    if (this.isBot(userAgent)) {
      this.logger.log('Acesso de bot detectado');
      this.logger.log('User agente :', userAgent);
    }

    if (
      (req.originalUrl === '/' || req.originalUrl.includes('.env')) &&
      !this.isBot(userAgent)
    ) {
      res.status(403).send('Acesso proibido');
      this.logger.log('Acesso indevido a aplicação');
      return;
    }

    next();
  }

  isBot(userAgent: string) {
    if (userAgent === undefined || userAgent === null || userAgent === '')
      return false;

    const botPatterns = [
      /googlebot/i,
      /googleother/i,
      /google-inspectiontool/i,
      /bingbot/i,
      /yahoo! slurp/i,
      /duckduckbot/i,
      /baiduspider/i,
      /yandexbot/i,
      /facebot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /applebot/i,
      /duckduckBot/i,
      /thumbnails/i,
      /swiftbot/i,
      /slurp/i,
      /ccBot/i,
    ];

    for (const pattern of botPatterns) {
      if (pattern.test(userAgent.toLocaleLowerCase())) {
        return true;
      }
    }

    return false;
  }
}
