import { useState } from "react";
import items from "../data";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import MovieList from '../movie-list/movie-list';
import MoviesAddForm from '../movies-add-form/movies-add-form';
import './app.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [data, setData] = useState(items);
  const [temporary, setTemporary] = useState('');
  const [filter, setFilter] = useState('all');
  
  const allMoviesCount = data.length;
  const favouriteMoviesCount = data.filter((movie) => movie.favourite).length;

  const onDelete = (id) => {
    // console.log(id);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  }

  const addForm = (movieData) => {
    // console.log(movieData);
    const newMovieData = [...data, {...movieData, id: uuidv4(), favourite: false, like: false}];
    setData(newMovieData);
  }

  // const onToggleFavourite = (id) => {
  //   const newData = data.map((item) => {
  //     if (item.id === id) {
  //       return {...item, favourite: !item.favourite};
  //     }
  //     return item;
  //   })
  //   setData(newData);
  // }

  const onToggleProp = (id, prop) => {
    // console.log(prop);
    const newData = data.map((item) => {
      if (item.id === id) {
        return {...item, [prop]: !item[prop]};
      }
      return item;
    });
    // console.log(newData);
    setData(newData);
  }

  const searchHandler = (arr, temp) => {
    if (temp.length === 0) {
      return arr;
    }

    return arr.filter((item) => item.name.toLowerCase().indexOf(temp) > -1);
  }

  const updateTempHandler = (temp) => {
    setTemporary(temp);
  }
  
  const filterHandler = (arr, filter) => {
    switch (filter) {
      case 'popularMovies': 
        return arr.filter(c => c.like);
      case 'mostViewedMovies':
        return arr.filter(c => c.viewers > 1000);
      default:
        return arr;   
    }
  }

  const updateFilterHandler = (filter) => {
    setFilter(filter);
  }
      
  const visibleData = filterHandler(searchHandler(data, temporary), filter);

  return (
    <div className='app font-monospace'>
      <div className='content'>
        <AppInfo allMoviesCount={allMoviesCount} favouriteMoviesCount={favouriteMoviesCount} />
        <div className='search-panel'>
          <SearchPanel updateTempHandler={updateTempHandler} />
          <AppFilter filter={filter} updateFilterHandler={updateFilterHandler} />
        </div>
        <MovieList 
          data={visibleData} 
          onDelete={onDelete} 
          onToggleProp={onToggleProp} 
          // onToggleFavourite={onToggleFavourite}
        />
        <MoviesAddForm addForm={addForm} />
      </div>
    </div>
  );
}

export default App;