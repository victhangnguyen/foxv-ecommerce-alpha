import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//! imp Actions
import { searchQuery } from '../searchSlice';

//! imp Components
import SearchIcon from '../../../components/icons/SearchIcon';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);

  const handleChange = (e) => {
    // console.log('__Debugger__SearchComponent__e: ', e.target.value);
    dispatch(searchQuery(e.target.value));
  };

  const handleSubmit = (e) => {
    //! localFunction
  };

  return (
    <form className="d-flex">
      <input
        className="form-control me-1"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
        value={text}
      />
      <button className="btn btn-light" type="submit">
        <SearchIcon size={'1.25rem'} />
      </button>
    </form>
  );
};

export default SearchComponent;
