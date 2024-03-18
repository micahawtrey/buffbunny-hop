import React from 'react';
import { useFilterRecentWorkoutsQuery } from '../app/recentWorkoutsAPI';

function UserDashboard() {
  const { data: workouts, error, isLoading } = useFilterRecentWorkoutsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching workouts: {error.message}</div>;

  return (
    <div className="m-4">
      <div className="border shadow mb-4">
        <div className="text-center">
          <h2>Recent Workouts</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="text-left">Workout</th>
                <th className="text-end px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {workouts?.map(workout => (
                <tr key={workout.id}>
                  <td className="text-left">{workout.name}</td>
                  <td className="text-end px-4">{workout.created_on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
