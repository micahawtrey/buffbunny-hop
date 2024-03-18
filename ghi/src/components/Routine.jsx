import React from 'react';

function Routine({ routine }) {
    return (
        <div className="m-4">
            <div className="col-12 shadow text-center bg-light">
                <h1>Routine Details</h1>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            {routine.name}
                        </div>
                        <div className="card-body">
                            <p>Description: {routine.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routine;
