import React  from 'react';
import { Link,  useParams  } from 'react-router-dom';

interface Emp{
  empno : number;
  ename :string,
  job : string,
  deptno : number
}

const Details: React.FC = () => 
{  
  
    let empsArray:Emp[] =  [
        {  empno : 10256, ename:"Scott", job: "Manager", deptno : 10  },
        {  empno : 10257, ename:"Smith", job: "Lead", deptno : 20  },
        {  empno : 10258, ename:"Sandy", job: "Programmer", deptno : 30  },
        {  empno : 10259, ename:"Sam", job: "Tester", deptno : 40  }
   ];

   const {id}  = useParams<{id:string}>(); 
   const empObj:Emp|undefined =  empsArray.find(item => item.empno == Number(id));

 
    return (
    <div>
     <h3>Selected Employee Details</h3>       
     <hr/>
     <div>
        Employee Number :  {empObj?.empno}  <br/>
         Employee Name :  {empObj?.ename}  <br/>
         Employee Job :  {empObj?.job}  <br/>
         Employee Deptno :  {empObj?.deptno}  <br/>  
     </div>
        <hr/>
      <Link  to="/Emps">Back to Employees</Link> 
    </div> 
    );
   
}  

export default Details;