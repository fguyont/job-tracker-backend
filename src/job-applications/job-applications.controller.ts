import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Post()
  create(@Body() createDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApplicationsService.findById(id);
  }

  @Patch(':id')
  archive(@Param('id') id : string) {
    return this.jobApplicationsService.setArchived(id);
  }
  
}