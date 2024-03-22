import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateRoutineMutation } from '../app/routineAPI';
import { useGetAllWorkoutsQuery } from '../app/workoutAPI';

function RoutineCreation() {
    const navigate = useNavigate();
    const [createRoutine, isSuccess] = useCreateRoutineMutation();
    const { data: workouts, isLoading: isLoadingWorkouts, isError: isWorkoutsError } = useGetAllWorkoutsQuery();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        workouts: []
    });
    const [workoutNum, setWorkoutNum] = useState(2)
    const [workoutList, setWorkoutList] = useState({
        workout1: {
            workoutId: "",
            workoutKey: "workout1",
            workoutNum: 1
        }
    })
    const addNewWorkout = () => {
        const workoutKey = `workout${workoutNum}`
        setWorkoutList({
            ...workoutList,
            [workoutKey]: {
                workoutId: "",
                workoutKey: [workoutKey],
                workoutNum: [workoutNum]
            }
        })
        setWorkoutNum(workoutNum + 1)
    }

    const removeWorkout = (workoutKey) => {
        setWorkoutList(prevWorkouts => {
            const newWorkouts = {...prevWorkouts}
            delete newWorkouts[workoutKey]
            return newWorkouts
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
        }
    }, [isSuccess, navigate]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleWorkoutChange = (event, workoutKey) => {
        const value = event.target.value
        setWorkoutList(prevWorkouts => {
            const newWorkouts = {...prevWorkouts}
            newWorkouts[workoutKey]["workoutId"] = value
            return newWorkouts
        })
    }

    const handleSubmit = () => {
        const body = {...formData}
        for (let workout of Object.values(workoutList)) {
            const workoutObject = workouts.find((queriedWorkout) => queriedWorkout["id"] == workout["workoutId"])
            body["workouts"].push(workoutObject)
        }
        createRoutine(body);
    };

    if (isLoadingWorkouts) return <div>Loading workouts...</div>;

    if (!isWorkoutsError) return (
    <div className="">
        <h1 className='text-center m-3'>Create a new Routine</h1>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="workoutName" placeholder="Workout Name" name="name"
                onChange={(event) => handleFormChange(event)} value={formData.name}/>
            <label htmlFor="workoutName">Routine Name</label>
        </div>
        <div className="form-floating mb-3">
            <textarea className="form-control" id="workoutDescription" placeholder="Workout Description" name="description"
            onChange={(event) => handleFormChange(event)} value={formData.description}></textarea>
            <label htmlFor="workoutDescription">Routine Description</label>
        </div>
        <div className="mb-3 border rounded">
            {Object.values(workoutList).map(workout => {
                const workoutKey = workout.workoutKey
                return (
                <div className="row m-3 border rounded shadow" key={workoutKey}>
                    <h4 className='mt-3'>Day #{workout.workoutNum}</h4>
                    <div className="d-flex flex-grow-1" >
                        <div className="form-group me-3 mb-3">
                            <select className="form-select" aria-label="Select Workout" name="workoutId"
                                onChange={(event) => handleWorkoutChange(event, workoutKey)}>
                                <option defaultValue>Select workout</option>
                                {workouts.map(workout => (
                                    <option key={workout.id} value={workout.id}>{workout.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-danger mb-3'
                            onClick={() => removeWorkout(workoutKey)}>Delete Workout</button>
                    </div>
                </div>
                )
            })}
            <button className="btn btn-primary m-3"
                onClick={() => addNewWorkout()}>Add New Workout</button>
        </div>
        <div className='d-flex justify-content-center'>
            <button className='btn btn-success'
            onClick={() => handleSubmit()}> Create Routine</button>
        </div>
    </div>
    );
}

export default RoutineCreation;
