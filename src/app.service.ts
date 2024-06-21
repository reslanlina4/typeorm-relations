import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { Meeting } from './meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private metingRepo: Repository<Meeting>,
  ){}

 async seed(){

    //employee1
    const ceo = this.employeeRepo.create({name:'Mr.CEO'});
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
       email:'lina@gmail.com' ,
      //  emeployeeId:ceo.id
      });

      ceoContactInfo.employee = ceo;

    await this.contactInfoRepo.save(ceoContactInfo);

    //eemployee2
    const manager = this.employeeRepo.create({
      name:'lina',
      manager:ceo
    });
   
    
    const task1 = this.taskRepo.create({name:'create database'});

    await this.taskRepo.save(task1);

    const task2 = this.taskRepo.create({name:'solving problems'});

    await this.taskRepo.save(task2);
    manager.tasks = [task1,task2];


    await this.employeeRepo.save(manager);
    const meeting1 = this.metingRepo.create({zoomUrl:'meeting.com'});
    meeting1.attendees = [ceo];
    await this.metingRepo.save(meeting1);
    manager.meetings = [meeting1]


  }


  getHello(): string {
    return 'Hello World!';
  }
}
