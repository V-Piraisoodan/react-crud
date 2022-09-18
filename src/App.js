import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data,setData]=useState([]);
  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [email,setEmail]=useState("");
  const [id,setID]=useState("");


useEffect(()=>{
  const users=async()=>{
  const response= await axios.get('https://62dd3993ccdf9f7ec2c27434.mockapi.io/react-crud');
  setData(response.data); 
  }
  users();
},[]);
 

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(id){
      const response= await axios.put(`https://62dd3993ccdf9f7ec2c27434.mockapi.io/react-crud/${id}`,{
      name,
      age,
      email,
      })
      //  console.log(data)
      var index=data.findIndex(row=>row.id===response.data.id);
      // console.log(index);
      var user=[...data];
      user[index]=response.data;
      setData(user);  
      clear();
      }
      else{
      const response= await axios.post('https://62dd3993ccdf9f7ec2c27434.mockapi.io/react-crud',{
      name,
      email,
      }) 
      const user=[...data];
      user.push(response.data);
      setData(user);
      clear();
      } 
  
  }
  const clear=()=>{
    setAge("");
    setEmail("");
    setName("");
    setID("");
  }
  const Update=async(id)=>{
    const selectedData=data.filter(row=>row.id===id)[0];
    setAge(selectedData.age);
    setName(selectedData.name);
    setEmail(selectedData.email);
    setID(selectedData.id) 
  }
  const Delete=async(id)=>{
  // console.log(id);
  await axios.delete(`https://62dd3993ccdf9f7ec2c27434.mockapi.io/react-crud/${id}`);
  const user=data.filter(row=>row.id!==id);
  setData(user);
  }
  return (
    <div className='container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='form-tittle'>React - CRUD</div>
        <label className='label'>Name</label>
        <input className='input' type="text" name="name" value={name}
        onChange={(e)=>{setName(e.target.value)}}></input>
        <label className='label'>Age</label>
        <input className='input' type="text" name="age" value={age}
        onChange={(e)=>{setAge(e.target.value)}}></input>
        <label className="label">Email</label>
        <input className='input' type="text" name="email" value={email}
        onChange={(e)=>{setEmail(e.target.value)}}></input>
        <button className='submit' type="submit">SUBMIT</button>
      </form>
      <table className='table'>
        <tr className='table-header'>
          <th className='table-tittle' id='id'>Id</th>
          <th className='table-tittle'>Name</th>
          <th className='table-tittle'>Age</th>
          <th className='table-tittle'>Email</th>
          <th className='table-tittle' colSpan={2}>Edit/Delete</th>
        </tr>
        {data.map(row=>{
          return(
            <tr className='table-value'>
             <td className='table-data'>{row.id}</td>
             <td className='table-data'>{row.name}</td>
             <td className='table-data'>{row.age}</td>
             <td className='table-data'>{row.email}</td>
             <td className='btn'><button className='edit-button' onClick={()=>Update(row.id)}>edit</button></td>
             <td className='btn'><button className='delete-button' onClick={()=>Delete(row.id)}>delete</button></td>
            </tr>
          )})}
      </table>
    </div>
  );
}
export default App;
