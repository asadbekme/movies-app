import { useState, useEffect, useContext } from "react";
import { AppInfo, SearchPanel, AppFilter, MovieList, MovieAddForm, MoviesAddForm } from '../index';
import './app.css';
import { Context } from "../../context";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://jsonplaceholder.typicode.com/todos?_start=0&_limit=7`)
      .then(response => response.json())
      .then(json => {
        const newData = json.map((item) => ({ id: item.id, name: item.title, viewers: item.id * 1000, favourite: false, like: false }))
        dispatch({ type: 'GET_DATA', payload: newData });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (
    <div className='app font-monospace'>
      <div className='content'>
        <AppInfo />
        <div className='search-panel'>
          <SearchPanel />
          <AppFilter />
        </div>
        {isLoading && <h2 className="text-center my-3">Loading...</h2>}
        <MovieList />
        <MovieAddForm />
      </div>
    </div>
  );
}

export default App;