import { useEffect, useState } from 'react';
import { useCreateRoutineMutation } from '../app/routineAPI';
import { useGetAllWorkoutsQuery } from '../app/workoutAPI';
import { useNavigate } from 'react-router-dom';

function RoutineCreation() {
const [createRoutine, createRoutineStatus] = useCreateRoutineMutation();
const { data: workoutsData } = useGetAllWorkoutsQuery();
const navigate = useNavigate();
const [errorMessage, setErrorMessage] = useState("");

const [formData, setFormData] = useState({
    routineName: '',
    routineDescription: '',
    selectedWorkouts: [],
    routineFrequency: '',
    durationWeeks: '',
    durationMonths: '',
});

useEffect(() => {
    if (createRoutineStatus.isSuccess) navigate("/dashboard");
    if (createRoutineStatus.isError) {
    setErrorMessage(createRoutineStatus.error.data.detail);
    }
}, [createRoutineStatus, navigate]);

const handleSubmit = (event) => {
    event.preventDefault();
    createRoutine({
    name: formData.routineName,
    description: formData.routineDescription,
    workouts: formData.selectedWorkouts,
    frequency: formData.routineFrequency,
    durationWeeks: formData.durationWeeks,
    durationMonths: formData.durationMonths,
    });
};

const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
    setFormData(prevFormData => ({
        ...prevFormData,
        selectedWorkouts: checked
        ? [...prevFormData.selectedWorkouts, value]
        : prevFormData.selectedWorkouts.filter(workoutId => workoutId !== value),
    }));
    } else {
    setFormData({
        ...formData,
        [name]: value,
    });
    }
};

return (
    <div className="my-5 container">
    <div className="row">
        <div className="col">
        <div className="card shadow mx-5">
            <div className="card-body">
            <h1 className="card-title">Create New Routine</h1>
            <form onSubmit={handleSubmit}>
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                <div className="mb-3 form-floating">
                <input onChange={handleFormChange} value={formData.routineName} required type='text' name='routineName' id='routineName' className='form-control' />
                <label htmlFor="routineName">Routine Name</label>
                </div>
                <div className="mb-3 form-floating">
                <textarea onChange={handleFormChange} value={formData.routineDescription} name='routineDescription' id='routineDescription' className='form-control' />
                <label htmlFor="routineDescription">Routine Description</label>
                </div>
                <div className="mb-3 form-floating">
                <select onChange={handleFormChange} value={formData.routineFrequency} required name='routineFrequency' id='routineFrequency' className='form-control'>
                    <option value="">Select Days per Week</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <label htmlFor="routineFrequency">Days per Week:</label>
                </div>
                <div className="mb-3 form-floating">
                <input type="number" className="form-control" id="durationWeeks" name="durationWeeks" placeholder="Duration in Weeks" value={formData.durationWeeks} onChange={handleFormChange} />
                <label htmlFor="durationWeeks">Duration in Weeks</label>
                </div>
                <div className="mb-3 form-floating">
                <input type="number" className="form-control" id="durationMonths" name="durationMonths" placeholder="Duration in Months" value={formData.durationMonths} onChange={handleFormChange} />
                <label htmlFor="durationMonths">Duration in Months</label>
                </div>
                <div>
                <h3>Select Workouts</h3>
                {workoutsData && workoutsData.map((workout) => (
                    <div key={workout.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={workout.id}
                        id={`workout-${workout.id}`}
                        name="selectedWorkouts"
                        onChange={handleFormChange}
                    />
                    <label className="form-check-label" htmlFor={`workout-${workout.id}`}>
                        {workout.name}
                    </label>
                    </div>
                ))}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Create Routine</button>
            </form>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default RoutineCreation;
