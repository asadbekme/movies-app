import React, { useState } from 'react';
import './movies-add-form.css';

const MoviesAddForm = ({ addForm }) => {
  const [data, setData] = useState({ name: '', viewers: '' });

  const changeHandler = (e) => {
    const newData = {...data};
    newData[e.target.name] = e.target.value;    
    setData(newData);
    // console.log(newData);
  }

  const addFormHandler = (e) => {
    e.preventDefault();

    addForm({ name: data.name, viewers: data.viewers });
    setData({name: '', viewers: ''});
  }

  return (
    <div className='movies-add-form'>
      <h3>Yangi kino qo'shish</h3>

      <form className='add-form d-flex' onSubmit={addFormHandler} >
        <input 
          type="text" 
          className='form-control new-post-label' 
          placeholder='Qanday kino?' 
          onChange={changeHandler} 
          name='name'
          value={data.name}
        />
        <input 
          type="number" 
          className='form-control new-post-label' 
          placeholder="Necha marotaba ko'rilgan?" 
          onChange={changeHandler} 
          name='viewers'  
          value={data.viewers}
        />
        <button type='submit' className='btn btn-outline-dark'>Qo'shish</button>
      </form>
    </div>
  );
}

export default MoviesAddForm;