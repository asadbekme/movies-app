import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../context';
import './search-panel.css';

const SearchPanel = () => {
  const [temp, setTemp] = useState('');
  const { state, dispatch } = useContext(Context);

  const tempHandler = (e) => {
    const temporaryValue = e.target.value.toLowerCase();
    
    setTemp(temporaryValue);
    dispatch({ type: 'ON_TEMP', payload: temp });
  } 

  return (
    <input 
      type='text' 
      className="form-control fs-5 search-input" 
      placeholder="Kinolarni qidirish" 
      onChange={tempHandler}
      value={temp}
    />
  );
}

export default SearchPanel;