import { useParams } from 'react-router-dom';
import { useGetExerciseApiDetailsQuery } from '../app/exerciseAPI';
import { useGetTokenQuery } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
    const { exercise_name } = useParams()
    const { data, isLoading } = useGetExerciseApiDetailsQuery(exercise_name)
    const { data: token, isLoading: tokenIsLoading} = useGetTokenQuery()
    const navigate = useNavigate()

    if (isLoading) {
        return <div className='m-3'>Loading Exercise...</div>
    }

    if (!tokenIsLoading && !token) {
        navigate("/login")
    }

    const exerciseName = (data.name[0].toUpperCase() + data.name.slice(1))
    return (
        <>
            <div className='col m-3 p-1 shadow rounded text-center'>
                <h1>{exerciseName}</h1>
            </div>
            <div className='col m-3 shadow rounded text-center'>
                <img src={data.gifUrl} alt="" />
            </div>
            <div>
                <ul className='list-group list-group-numbered m-3 shadow'>
                    {data.instructions.map(step => {
                        return (
                            <li className='list-group-item' key={step}>
                                {step}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>

    );
};

export default Exercise;
