import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact:React.FC = () =>  {    

    const navigate = useNavigate();

    const buttonClick = () =>
    {
        navigate("/");
    }

    return ( <div style={{backgroundColor:'LightBlue', padding: '10px'}}>
    <h1>Contact Page</h1>  
    <p>This page provides contact details of compnay. This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay. </p>
    <p>This page provides contact details of compnay. This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay. </p>
    <hr/>
    <button  onClick={buttonClick}>Go to Home</button>
    </div>    
    );
}  ;

export default Contact;
 

 