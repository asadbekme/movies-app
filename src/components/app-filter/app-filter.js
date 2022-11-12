import './app-filter.css';

const AppFilter = ({ filter, updateFilterHandler }) => {
  return (
    <div className='btn-group'>
       {
          btnsArr.map((btn) => {
            return (
               <button 
                 key={btn.name} 
                 className={`btn ${filter === btn.name ? 'btn-dark' : 'btn-outline-dark'}`} 
                 onClick={() => updateFilterHandler(btn.name)}
                 type='button'
               >
                 {btn.label}
               </button>
            );
          })
       }
    </div>
  );
}

const btnsArr = [
    { name: 'all', label: 'Barcha kinolar' },
    { name: 'popularMovies', label: 'Mashhur kinolar' },
    { name: 'mostViewedMovies', label: "Eng ko'p ko'rilgan kinolar" }
]; 

export default AppFilter;


