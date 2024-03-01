export default function Routine() {
    return (
        <div className="m-4">
            <div className="col-12 shadow text-center bg-light">
                <h1>Routine Name</h1>
            </div>
            <div className="col-12 m-4">
                <p>Description: This will be the description of the routine. Probably holds length, goals,
                    freeweights vs bodyweight, etc.
                </p>
            </div>
            <div className="col-12">
                <div className="border shadow mb-4 bg-light">
                    <div className="text-center mt-3">
                        <h3>Day 1</h3>
                    </div>
                    <div className="m-3" style={{border: "2px solid black"}}>
                        <table className="table table-striped">
                            <thead>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Back Squats</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Deadlift</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Hack Squats</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Leg Extensions</td>
                                    <td>4</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Calf Raises</td>
                                    <td>3</td>
                                    <td>15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="border shadow mb-4 bg-light">
                    <div className="text-center mt-3">
                        <h3>Day 2</h3>
                    </div>
                    <div className="m-3" style={{border: "2px solid black"}}>
                        <table className="table table-striped">
                            <thead>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Back Squats</td>
                                    <td>50</td>
                                    <td>600</td>
                                </tr>
                                <tr>
                                    <td>Deadlift</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Hack Squats</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Leg Extensions</td>
                                    <td>4</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Calf Raises</td>
                                    <td>3</td>
                                    <td>15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
