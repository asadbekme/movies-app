import { useContext } from "react";
import { Context } from "../../context";
import "./app-info.css";

const AppInfo = () => {
  const { state } = useContext(Context);
  const favouriteMoviesCount = state.data.filter(
    (movie) => movie.favourite
  ).length;

  return (
    <div className="app-info">
      <p className="fs-3 text-uppercase">
        Barcha kinolar soni: {state.data.length}
      </p>
      <p className="fs-4 text-uppercase">
        Sevimli kinolar soni: {favouriteMoviesCount}
      </p>
    </div>
  );
};

export default AppInfo;
