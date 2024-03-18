import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateWorkoutMutation } from '../app/workoutAPI';
import { useGetExerciseApiListQuery } from '../app/exerciseAPI';

function CreateWorkout (){
    const { data: exerciseList, isLoading } = useGetExerciseApiListQuery()
    console.log({exerciseList})
    const targets = [
        "abductors",
        "abs",
        "adductors",
        "biceps",
        "calves",
        "cardiovascular system",
        "delts",
        "forearms",
        "glutes",
        "hamstrings",
        "lats",
        "levator scapulae",
        "pectorals",
        "quads",
        "serratus anterior",
        "spine",
        "traps",
        "triceps",
        "upper back"
    ]
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [exercises, setExercises] = useState({
        exercise0: {
            name: "",
            muscle_group: "",
            set: "",
            rep: "",
            exercises: [],
            exerciseKey: "exercise0"
        },

    })
    const [exerciseNum, setExerciseNum] = useState(1)
    const [workout, workoutStatus] = useCreateWorkoutMutation()
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const addNewExercise = () => {
        const exerciseKey = `exercise${exerciseNum}`
        setExercises({
            ...exercises,
            [exerciseKey]: {
                name: "",
                muscle_group: "",
                set: "",
                rep: "",
                exercises: [],
                exerciseKey
            }
        })
        setExerciseNum(exerciseNum + 1)
    }

    const removeExercise = (exerciseKey) => {
        setExercises(prevExercises => {
            const newExercises = {...prevExercises}
            delete newExercises[exerciseKey]
            return newExercises
        })
    }

    const setExerciseValues = (event, exerciseKey) => {
        const name = event.target.name
        const value = event.target.value
        setExercises(prevExercises => {
            const newExercises = {...prevExercises}
            newExercises[exerciseKey][name] = value
            return newExercises
        })
    }

    const handleSubmit = () => {
        const data = {
            name,
            description,
            exercises: []
        }
        for (let exercise of Object.values(exercises)) {
            data["exercises"].push(exercise)
        }
        workout(data)
    }

    useEffect(() => {
        if (workoutStatus.isSuccess) navigate("/dashboard")
        if (workoutStatus.isError) setErrorMessage(workoutStatus.error)
    }, [workoutStatus, navigate])

    const filterMuscleGroup = async (data, exerciseKey) => {
        const filteredExercises = exerciseList.exercise.filter((exercise) => exercise.target === data)
        setExercises(prevExercise => {
            const newExercise = {...prevExercise}
            newExercise[exerciseKey]["exercises"] = filteredExercises
            return newExercise
        })
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        if (name === "name") {
            setName(value)
        } else if (name === "description") {
            setDescription(value)
        }
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

   return (
    <div className='pt-3 text-center'>
        <h1>Create a new Workout</h1>
        <div className="form-floating my-3">
            <input type="text" className="form-control" id="workoutName" placeholder="Workout Name" name="name"
                onChange={(event) => handleChange(event)} value={name}/>
            <label htmlFor="workoutName">Workout Name</label>
        </div>
        <div className="form-floating mb-3">
            <textarea className="form-control" id="workoutDescription" placeholder="Workout Description" name="description"
            onChange={(event) => handleChange(event)} value={description}></textarea>
            <label htmlFor="workoutDescription">Workout Description</label>
        </div>
        <div className="d-flex flex-wrap border rounded" >
            {Object.values(exercises).map(exercise => {
                const exerciseKey = exercise.exerciseKey
                return (
                <div className="d-flex m-2" key={exercise.exerciseKey}>
                    <div className="form-group w-50 me-2" >
                        <select
                            className="form-select" style={{height: 58}}
                            aria-label="Select Muscle Group"
                            name="muscle_group"
                            onChange={(event) => {
                                setExerciseValues(event, exerciseKey)
                                filterMuscleGroup(event.target.value, exerciseKey)
                                }}>
                                <option value="">Select Muscle Group</option>
                                {targets.map((target, index) => (
                                    <option key={index} value={target}>{target}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form-group w-50 me-2">
                        <select
                            className="form-select" style={{height: 58}}
                            aria-label="Select Exercise" name="name"
                            onChange={(event) => setExerciseValues(event, exerciseKey)}>
                            <option defaultValue>Select Exercise</option>
                            {exercise.exercises.map(exercise => (
                                <option key={exercise.url} value={exercise.name}>{exercise.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex">
                        <div className="form-floating me-2">
                            <input type="number" className="form-control form-control-sm" id="sets" placeholder="Sets" min="1"
                            name="set" value={exercises[exerciseKey]["set"]}
                            onChange={(event) => setExerciseValues(event, exerciseKey) }/>
                            <label htmlFor="sets">Sets</label>
                        </div>
                        <div className="form-floating me-2">
                            <input type="number" className="form-control form-control-sm" id="reps" placeholder="Reps" min="1"
                                name="rep" value={exercises[exerciseKey]["rep"]}
                                onChange={(event) => setExerciseValues(event, exerciseKey)} />
                            <label htmlFor="reps">Reps</label>
                        </div>
                    </div>
                    <button className='btn btn-danger' onClick={() => removeExercise(exerciseKey)}>Delete</button>
                </div>
                )
            })}
            <button className="btn btn-primary m-2" onClick={() => addNewExercise()}>Add New Exercise</button>
        </div>
        <button className='btn btn-success m-2'onClick={() => handleSubmit()}> Create Workout</button>
    </div>
);

}

export default CreateWorkout
