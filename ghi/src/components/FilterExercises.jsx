//export default function FilterExercises() {
  //  return (
    //    <div></div>
    //)
//}

import React, { useState } from 'react';

const FilterExercises = ({ exerciseData, setFilteredExercises }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    muscle_group: '',
    // Add more filter criteria as needed
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const applyFilter = () => {
    // Perform filtering based on the filter criteria
    const filteredExercises = exerciseData.filter(exercise => {
      // Example: Filter by exercise name
      if (filterCriteria.name && exercise.name !== filterCriteria.name) {
        return false;
      }

      // Example: Filter by muscle group
      if (filterCriteria.muscle_group && exercise.muscle_group !== filterCriteria.muscle_group) {
        return false;
      }

      // Add more filtering criteria as needed

      // If none of the criteria match, include the exercise in the filtered list
      return true;
    });

    // Update the state with the filtered exercises
    setFilteredExercises(filteredExercises);
  };

  return (
    <div>
      {/* Add filter inputs and buttons here */}
      <input type="text" name="name" value={filterCriteria.name} onChange={handleFilterChange} placeholder="Exercise Name" />
      <input type="text" name="muscle_group" value={filterCriteria.muscle_group} onChange={handleFilterChange} placeholder="Muscle Group" />
      {/* Add more filter inputs as needed */}

      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterExercises;
