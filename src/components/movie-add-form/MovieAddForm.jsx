import React, { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context';
import './movies-add-form.css';

const MovieAddForm = () => {
  const [data, setData] = useState({ name: '', viewers: '' });
  const { state, dispatch } = useContext(Context);

  const changeHandler = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  }

  const addFormHandler = (e) => {
    e.preventDefault();

    if (data.name === '' || data.viewers === '') return;
    dispatch({ type: 'MOVIE_ADD_FORM', payload: data });
    setData({ name: '', viewers: '' });
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

export default MovieAddForm;