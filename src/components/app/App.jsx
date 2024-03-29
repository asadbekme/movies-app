import { useState, useEffect, useContext } from "react";
import "./app.css";
import { Context } from "../../context";
import {
  AppInfo,
  SearchPanel,
  AppFilter,
  MovieList,
  MovieAddForm,
} from "../index";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5`)
      .then((response) => response.json())
      .then((json) => {
        const newData = json.map((item) => ({
          id: item.id,
          name: item.title,
          viewers: item.id * 1000,
          favourite: false,
          like: false,
        }));
        dispatch({ type: "GET_DATA", payload: newData });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="app font-monospace">
      <div className="content">
        <AppInfo />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        {isLoading && <h2 className="text-center my-3">Loading...</h2>}
        {state.data.length > 0 ? (
          <MovieList />
        ) : (
          <p className="text-center h2 mt-5">No data</p>
        )}
        <MovieAddForm />
      </div>
    </div>
  );
};

export default App;
