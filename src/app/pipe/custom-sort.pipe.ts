import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {

  constructor(private service: EmployeeService) {
       
  }

  transform(value: any[], column:string): any[] {
    let self=this;
    if(column=="id"){
      return value.sort(function(a, b){
        if(a[column] < b[column]) { return -1; }
        if(a[column] > b[column]) { return 1; }
        return 0;
      })
    }else if(column=="joining_date"){
      return value.sort(function(a, b){
        if(new Date(self.service.convertDate(a[column])) < new Date(self.service.convertDate(b[column]))) { return -1; }
        if(new Date(self.service.convertDate(a[column])) > new Date(self.service.convertDate(b[column]))) { return 1; }
        return 0;
      })
    }else{
      return value.sort(function(a, b){
        if(a[column].toLowerCase() < b[column].toLowerCase()) { return -1; }
        if(a[column].toLowerCase() > b[column].toLowerCase()) { return 1; }
        return 0;
      })
    }
  }
}
