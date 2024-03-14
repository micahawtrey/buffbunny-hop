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
            rep: ""
        }
    })
    const [exerciseTargets, setExerciseTargets] = useState({
        exercise0: {
            target: targets,
            exercises: []
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
                rep: ""
            }
        })
        setExerciseTargets({
            ...exercises,
            [exerciseKey]: {
                target: targets,
                exercises: []
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
        setExerciseTargets(prevExerciseTargets => {
            const newExerciseTargets = {...prevExerciseTargets}
            newExerciseTargets[exerciseKey][exercises] = data
            return newExerciseTargets
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
        <div></div>
    )
}

export default CreateWorkout
