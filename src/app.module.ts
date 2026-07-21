import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobApplicationsModule } from './job-applications/job-applications.module';

@Module({
  imports: [JobApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
