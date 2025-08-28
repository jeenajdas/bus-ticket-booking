import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser } from "../../features/users/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(removeUser(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users</h2>

      {status === "loading" && <p>Loading users...</p>}
      {status === "failed" && <p className="text-danger">{error}</p>}

      {status === "succeeded" && list.length === 0 && <p>No users found.</p>}

      {status === "succeeded" && list.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
