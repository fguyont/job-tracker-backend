import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { GetUser } from '@/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) { }

  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto, @GetUser('id') userId: string) {
    return this.jobApplicationsService.create(createJobApplicationDto, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.jobApplicationsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.jobApplicationsService.findById(id, userId);
  }

  @Patch(':id')
  archive(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.jobApplicationsService.setArchived(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @GetUser('id') userId: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(id, userId, updateJobApplicationDto);
  }

}