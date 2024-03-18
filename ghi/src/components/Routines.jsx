import React from 'react';
import { useGetAllRoutinesQuery } from '../app/routineAPI';

function Routines() {
    const { data: routines, error, isLoading } = useGetAllRoutinesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="m-4">
            <div className="col-12 shadow text-center bg-light">
                <h1>Routines</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routines.map((routine, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-light' : 'bg-gray'}>
                                    <td>{routine.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Routines;
