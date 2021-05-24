import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeData():Observable<any>{
    return this.http.get('./assets/employee.json')
  }
  
  convertDate(date){
    var convertedString=date.split("/")[1]+"/"+date.split("/")[0]+"/"+date.split("/")[2];
    return convertedString;
  }
}
