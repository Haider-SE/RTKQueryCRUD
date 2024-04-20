import React from "react";
import { useUpdateUserMutation } from "../../feature/apiSlice";

const UpdateUserComponent = () => {
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const [userId, setUserId] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isOptimisticallyUpdated, setIsOptimisticallyUpdated] =
    React.useState(false);

  const handleUpdateUser = async () => {
    setIsOptimisticallyUpdated(true); // Optimistically set the update flag

    try {
      await updateUser({ userId, lastName }).unwrap();
      console.log("User updated:");
      // No need to handle success here, as we're optimistically assuming success
    } catch (err) {
      console.error("Failed to update user:", err);
      setIsOptimisticallyUpdated(false); // Reset the flag if the update fails
    }
  };
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Update User</h2>
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        type="text"
        placeholder="User ID"
      />
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="New Last Name"
      />
      <button
        onClick={handleUpdateUser}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {"Update User"}
      </button>
      {isError && (
        <div style={{ color: "red", marginTop: "10px" }}>
          An error occurred: {error?.toString()}
        </div>
      )}
      {isOptimisticallyUpdated && !isError && (
        <div style={{ color: "green", marginTop: "10px" }}>
          User updated successfully!
        </div>
      )}
    </div>
  );
};

export default UpdateUserComponent;
