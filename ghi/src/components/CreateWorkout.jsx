import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateWorkoutMutation } from '../app/workoutAPI';
import { useGetExerciseApiByTargetQuery } from '../app/exerciseAPI';

function CreateWorkout (){
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
        }
    })
    const [exerciseNum, setExerciseNum] = useState(1)
    const [workout, workoutStatus] = useCreateWorkoutMutation()
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const targetQuery = useGetExerciseApiByTargetQuery()

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
                exerciseKey: "exercise0"
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
        const data = {name, description}
        const exerciseList = []
        for (let exercise of Object.values(exercises)) {
            exerciseList.push(exercise)
        }
        data[exercises] = exerciseList
        workout(data)
    }

    useEffect(() => {
        if (workoutStatus.isSuccess) navigate("/dashboard")
        if (workoutStatus.isError) setErrorMessage(workoutStatus.error)
    }, [workoutStatus, navigate])

    const filterMuscleGroup = (event, exerciseKey) => {
        const { data } = targetQuery(event.target.value)
        setExercises(prevExercise => {
            const newExercise = {...prevExercise}
            newExercise[exerciseKey][exercises] = data
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


   return (
  <div style={{ paddingTop: '20px' }}>
    <div className="form-floating mb-3">
      <input type="text" className="form-control" id="workoutName" placeholder="Workout Name" />
      <label htmlFor="workoutName">Workout Name</label>
    </div>
    <div className="form-floating mb-3">
      <textarea className="form-control" id="workoutDescription" placeholder="Workout Description"></textarea>
      <label htmlFor="workoutDescription">Workout Description</label>
    </div>
    <div className="d-flex flex-wrap" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px' }}>
        {Object.values(exercises).map(exercise => {
            return (
            <div className="d-flex flex-grow-1" key={exercise.exerciseKey}>
                <div className="form-group w-50">
                    <select className="form-select" aria-label="Select Muscle Group">
                        <option defaultValue>Select Muscle Group</option>
                        {targets.map((target, index) => (
                        <option key={index} value={target}>{target}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group w-50">
                    <select className="form-select" aria-label="Select Exercise">
                        <option defaultValue>Select Exercise</option>
                        {exercise.exercises.map(exercise => (
                            <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                        ))}
                    </select>
                </div>
                <div className="ms-4 d-flex">
                <div className="form-floating me-2">
                    <input type="number" className="form-control form-control-sm" id="sets" placeholder="Sets" min="1" />
                    <label htmlFor="sets">Sets</label>
                </div>
                <div className="form-floating">
                    <input type="number" className="form-control form-control-sm" id="reps" placeholder="Reps" min="1" />
                    <label htmlFor="reps">Reps</label>
                </div>
                </div>
            </div>
            )
        })}
    </div>
  </div>
);

}

export default CreateWorkout
