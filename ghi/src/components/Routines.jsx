import { useState, useEffect } from 'react';
import { useGetAllRoutinesQuery } from '../app/routineAPI';
import { useCreateRecentWorkoutMutation } from '../app/recentWorkoutsAPI';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Routines() {
    const { data: allRoutines, error, isLoading } = useGetAllRoutinesQuery();
    const [selectedRoutine, setSelectedRoutine] = useState({})
    const [createRecentWorkout, createRecentWorkoutStatus] = useCreateRecentWorkoutMutation()
    const navigate = useNavigate()
    const handleSelectRoutine = (event) => {
        setSelectedRoutine(allRoutines.find((routine) => routine["id"] == event.target.value))
    }

    const handleCompleteWorkout = (name) => {
        createRecentWorkout({name})
    }

    useEffect(() => {
        if (createRecentWorkoutStatus.isSuccess) navigate("/dashboard")
    }, [createRecentWorkoutStatus, navigate])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="m-4">
            <div className="border rounded m-3 col-12 shadow text-center">
                <h1>Routines</h1>
            </div>
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-center">
                    <select className='form-select w-25' name="selectRoutine" id="selectRoutine"
                        onChange={(event) => handleSelectRoutine(event)}
                        >
                        <option defaultValue>Select Routine</option>
                        {allRoutines.map((routine, index) => (
                            <option key={index} value={routine.id}>{routine.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {selectedRoutine.name ?
            <div className='card shadow mx-5'>
                <h3 className='text-center m-3'>{selectedRoutine.name}</h3>
                <h4 className='m-3'>{selectedRoutine.description}</h4>
                {selectedRoutine.workouts.map((workout, index) => {
                    const exercises = workout.exercises
                    const name = workout.name
                    return (
                    <div className='border rounded shadow m-3' key={workout.id + String(index)}>
                        <h3 className='text-center'>{workout.name}</h3>
                        <h4 className='text-center'>{workout.description}</h4>
                        <div className='border rounded m-2'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Exercise Name</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {exercises.map((exercise, index) => {
                                    const link = exercise.name.replaceAll(" ", " ")
                                    const name = exercise.name.slice(0, 1).toUpperCase() + exercise.name.slice(1)
                                    return (
                                        <tr key={exercise.id + String(index)}>
                                            <td><NavLink to={`/exercises/${link}`}>{name}</NavLink></td>
                                            <td>{exercise.set}</td>
                                            <td>{exercise.rep}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-center m-3'>
                            <button
                                onClick={() => handleCompleteWorkout(name)}
                                className='btn btn-success'>
                                    Complete Workout
                            </button>
                        </div>
                    </div>)
                })}
            </div>
            :null
            }
        </div>
    );
}

export default Routines;
