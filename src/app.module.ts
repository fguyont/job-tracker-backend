import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, JobApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
