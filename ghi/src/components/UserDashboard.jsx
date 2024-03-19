import { useEffect } from 'react';
import { useFilterRecentWorkoutsQuery } from '../app/recentWorkoutsAPI';
import { useGetTokenQuery } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { data: workouts, error, isLoading } = useFilterRecentWorkoutsQuery();
  const { data: token, isLoading: tokenIsLoading } = useGetTokenQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tokenIsLoading && !token) navigate("/login")
  }, [token, tokenIsLoading, navigate])

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error fetching workouts: {error.message}</div>;

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="mt-3"> 
      <div className="d-flex justify-content-center">
        <div className="workouts border rounded shadow p-3" style={{ maxWidth: '600px', width: '100%' }}>
          <h2 className="text-center">Recent Workouts</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Workout</th>
                <th className="text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {workouts?.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td className="text-right">{formatDateAndTime(workout.created_on)}</td>
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
