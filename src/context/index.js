import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialValue = {
  data: [],
  temporary: '', 
  filter: 'all',
}

export const Context = React.createContext();

const reducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_DATA':
      return { ...state, data: payload };

    case 'ON_DELETE':
      const deleteArr = state.data.filter(c => c.id !== payload);
      return { ...state, data: deleteArr };

    case 'ON_TOGGLE_PROP': 
      const { id, prop } = payload;
      const toggleArr = state.data.map((item) => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]};
        }
        return item;
      });
      return { ...state, data: toggleArr };

    case 'MOVIE_ADD_FORM': 
      const { name, viewers } = payload;
      const newMovieData = { 
        name: name,
        viewers: viewers,
        id: uuidv4(), 
        favourite: false, 
        like: false
      };
      return { ...state, data: [...state.data, newMovieData] };

    case 'ON_TEMP': 
      return { ...state, temporary: payload };
    
    case 'ON_FILTER': 
      return { ...state, filter: payload };  

    default:
      return { state };
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export default Provider;