//import React, { useState, useEffect, useCallback } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
// import { fetchExercises } from '../actions/exerciseActions';

const FilterExercise = () => {
  // const dispatch = useDispatch();
  // const { exercises, loading, error } = useSelector((state) => state.exercise);
  // const [filterCriteria, setFilterCriteria] = useState({ name: '', muscle_group: '' });

  // useEffect(() => {
  //   dispatch(fetchExercises(filterCriteria));
  // }, [dispatch, filterCriteria]);

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilterCriteria((prevState) => ({ ...prevState, [name]: value }));
  // };

  // return (
  //   <div>
  //     <h2>All Exercises</h2>
  //     <div>
  //       <input type="text" name="name" value={filterCriteria.name} onChange={handleFilterChange} placeholder="Exercise Name" />
  //       <input type="text" name="muscle_group" value={filterCriteria.muscle_group} onChange={handleFilterChange} placeholder="Muscle Group" />
  //     </div>
  //     {loading && <p>Loading...</p>}
  //     {error && <p>Error: {error}</p>}
  //     <ul>
  //       {exercises.map((exercise, index) => (
  //         <li key={index}>{exercise.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default FilterExercise;
