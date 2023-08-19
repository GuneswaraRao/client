import React, { useEffect, useState } from 'react';
import './AddEdit.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState ={
    name:'',
    email: '',
    contact:'',
}
const AddEdit = () => {

    const[state,setState] = useState(initialState);

   const navigator = useNavigate();

   const {id} =useParams();

   useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((res)=>setState({...res.data[0]}));
   },[id]);

    const {name,email,contact} = state;
    const handelInputChange=(e)=>{
      const {name,value} = e.target;
      setState({...state ,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("please provide value in each input Field");
        }else{
            if(!id){
            axios.post("http://localhost:5000/api/post",{
                name,
                email,
                contact
            }).then(()=>{
                setState({name: "",email:"", contact:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success(" data successfully added")
            
        }else{
            axios.put(`http://localhost:5000/api/update/${id}`,{
                name,
                email,
                contact
            }).then(()=>{
                setState({name: "",email:"", contact:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success(" data Updated successfully")

        }
        setTimeout(()=>navigator("/"),500)
    }
    }
  return (
    <div  style={{marginTop:"100px"}}>
     <form onSubmit={handleSubmit} style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={name || ""} onChange={handelInputChange}/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email || ""} onChange={handelInputChange}/>

        <label htmlFor="contact">Contact</label>
        <input type="text" name="contact" id="contact" value={contact || ""} onChange={handelInputChange}/>
        <input type="submit" value={id? "Update":"Save"}/>
        <Link to ="/">
            <input type="button" value="Go Back" />
        </Link>
     </form>
    </div>
  )
}

export default AddEdit
