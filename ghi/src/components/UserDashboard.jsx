import React from 'react';

function UserDashboard() {
  return (
    <div className="m-4">
      <div className="col-10 shadow text-center"></div>
      <div className="col-10">
        <div className="border shadow mb-4">
          <div className="text-center
          ">
            <h2>Progress</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>some data goes here</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>more data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-10">
  <div className="border shadow mb-4">
    <div className="text-center">
      <h2>Recent Workout</h2>
    </div>
      <table className="table">
        <thead>
          <tr>
            <th className="text-left">Workout</th>
            <th className="text-end px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">workout 1</td>
            <td className="text-end px-4">Date</td>
          </tr>
          <tr>
            <td className="text-left">workout 2</td>
            <td className="text-end px-4">Date</td>
          </tr>
          <tr>
            <td className="text-left">workout 3</td>
            <td className="text-end px-4">Date</td>
          </tr>
          <tr>
            <td className="text-left">workout 4</td>
            <td className="text-end px-4">Date</td>
          </tr>
          <tr>
            <td className="text-left">workout 5</td>
            <td className="text-end px-4">Date</td>
          </tr>
        </tbody>
      </table>
  </div>
</div>
    </div>
  );
}

export default UserDashboard;
