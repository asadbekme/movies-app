import { useContext } from "react";
import { Context } from "../../context";
import "./movie-list.css";
import MovieListItem from "../movie-list-item/MovieListItem";
import { filterHandler, searchHandler } from "../../utilities/functions";

const MovieList = () => {
  const { state, dispatch } = useContext(Context);
  const data = filterHandler(
    searchHandler(state.data, state.temporary),
    state.filter
  );

  return (
    <ul className="movie-list">
      {data.map((item) => {
        return <MovieListItem key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default MovieList;
