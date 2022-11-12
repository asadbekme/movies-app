import { useState } from 'react';
import './search-panel.css';

const SearchPanel = (props) => {
  const [temp, setTemp] = useState('');

  const tempHandler = (e) => {
    const temporaryValue = e.target.value.toLowerCase();
    
    setTemp(temporaryValue);
    props.updateTempHandler(temp);
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