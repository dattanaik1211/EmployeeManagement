import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

interface DepartmentCount{
  name:string;
  count:number;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployeeData:any[];
  employeeData:any[];
  searchText:string;
  sorts=["id","name","joining_date"];
  selectedSort="id";
  departmentDistinctCount:Array<DepartmentCount>;
  constructor(private employeeService:EmployeeService,private datePipe: DatePipe) { }

  ngOnInit(){
    this.getEmployeeData();
  }

  getEmployeeData(){
    this.searchText='';
    this.employeeService.getEmployeeData().subscribe((data)=>{
      this.allEmployeeData=data;
      this.employeeData=data;
      this.getDistinctCount();
    })
  }

  convertDate(date){
    var convertedString=date.split("/")[1]+"/"+date.split("/")[0]+"/"+date.split("/")[2];
    return convertedString;
  }

  search(){
    if(this.searchText){
      this.employeeData=this.allEmployeeData.filter((e)=>{
        return e.name.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }else{
      this.employeeData=this.allEmployeeData;
    } 
  }

  findEmployee(){
    let todaysDate=new Date();
    this.employeeData=this.allEmployeeData.filter((e)=>{
      var diff = Math.abs(todaysDate.getTime() - new Date(this.convertDate(e.joining_date)).getTime());
      var diffDays = diff / (1000 * 3600 * 24*365); 
      return diffDays>2;
    });
  }

  deleteDevlopmentEmployee(){
    if(window.confirm('Are sure you want to delete all the development department Employee ?')){
      for(let i=0;i<this.allEmployeeData.length;i++){
        if(this.allEmployeeData[i].department=="Development"){
          this.allEmployeeData.splice(this.allEmployeeData.indexOf(this.allEmployeeData[i]),1);
          i--;
        }
      }
      this.employeeData=this.allEmployeeData;
    }
  }

  getDistinctCount(){
    this.departmentDistinctCount=[];
    this.employeeData.forEach((e)=>{
      let index = this.departmentDistinctCount.findIndex(d => d.name ==e.department);
      if(index==-1){
        this.departmentDistinctCount.push({"name":e.department,"count":1});
      }else{
        this.departmentDistinctCount[index].count+=1;
      }
    });
    console.log(this.departmentDistinctCount);
  }
}
