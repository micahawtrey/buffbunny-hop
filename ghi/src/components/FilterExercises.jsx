import React, { useState, useEffect, useCallback } from 'react';

const FilterExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    muscle_group: '',
  });

  const fetchExercises = useCallback(async () => {
    try {
      const response = await fetch(`/api/exercises?name=${filterCriteria.name}&muscle_group=${filterCriteria.muscle_group}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('There was a problem fetching exercises:', error);
    }
  }, [filterCriteria]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>All Exercises</h2>
      <div>
        <input type="text" name="name" value={filterCriteria.name} onChange={handleFilterChange} placeholder="Exercise Name" />
        <input type="text" name="muscle_group" value={filterCriteria.muscle_group} onChange={handleFilterChange} placeholder="Muscle Group" />
      </div>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterExercise;
