import { useState, useEffect, useContext } from "react";
import movies from "../../utils/data";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import MovieList from '../movie-list/movie-list';
import MoviesAddForm from '../movies-add-form/movies-add-form';
import './app.css';
import { v4 as uuidv4 } from 'uuid';
import { Context } from "../../context";

const App = () => {
  // const [data, setData] = useState(movies);
  const [data, setData] = useState([]);
  const [temporary, setTemporary] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://jsonplaceholder.typicode.com/todos?_start=0&_limit=7`)
      .then(response => response.json())
      .then(json => {
        const newData = json.map((item) => ({ id: item.id, name: item.title, viewers: item.id * 100, favourite: false, like: false }))
        // console.log(newData);
        setData(newData);
        dispatch({ type: 'GET_DATA', payload: newData });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
        // console.log('Finally');
      })
  }, [])
  
  const allMoviesCount = data.length;
  const favouriteMoviesCount = data.filter((movie) => movie.favourite).length;

  const onDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  }

  const addForm = (movieData) => {
    // console.log(movieData);
    const newMovieData = {...movieData, id: uuidv4(), favourite: false, like: false};
    const newData = [...data, newMovieData];
    setData(newData);
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
        {isLoading && <h2 className="text-center my-3">Loading...</h2>}
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