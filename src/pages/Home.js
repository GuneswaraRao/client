import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

const Home = () => {
    const [data,setData] =  useState([]);

    const loadData= async()=>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useEffect(()=>{
        loadData();
    },[]);

    const deleteHandle = (id)=>{
            if(window.confirm("Are you sure you wanted to delete the data ?")){
                axios.delete(`http://localhost:5000/api/remove/${id}`);
                toast.success("Data deleted successfully ");
                setTimeout(()=> loadData(),500);
            }
    }
  return (
    <div style={{marginTop:"150px"}}>
        <Link to ={`/addedit`}>
        <button className='btn btn-contact'>Add Edit</button>
        </Link>
        <table className='styled-table'>
           <thead>
            <tr>
                <th style={{textAlign:"center"}}>SNO</th>
                <th style={{textAlign:"center"}}>Name</th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>Contact</th>
                <th style={{textAlign:"center"}}>Action</th>
            </tr>
           </thead>
           <tbody>
            {data.map((item,index)=>{
                return(
                    <tr key={item.id}>
                            <td scope='row'>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>
                                <Link to={`/update/${item.id}`}><button className='btn btn-edit'>Edit</button></Link>
                                <button className='btn btn-delete'onClick={()=>deleteHandle(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}><button className='btn btn-view'>View</button></Link>
                            </td>
                    </tr>
                )
            })}
           
           </tbody>
            
        </table>
    
    </div>
  )
}

export default Home;
