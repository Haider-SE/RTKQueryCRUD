import React from "react";
import { useAddUserMutation } from "../../feature/apiSlice";
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};
const AddUserComponent = () => {
  const [updateUser, { isLoading, isError, error }] = useAddUserMutation();
  const [userData, setUserData] = React.useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleAddUser = async () => {
    try {
      await updateUser(userData).unwrap();
      console.log("User updated:");
      // No need to handle success here, as we're optimistically assuming success
    } catch (err) {
      console.error("Failed to update user:", err);
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
      <h2 style={{ textAlign: "center" }}>Add User</h2>
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userData.id}
        onChange={(e) =>
          setUserData({ ...userData, id: Number(e.target.value) })
        }
        type="number"
        placeholder="ID"
      />
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userData.firstName}
        onChange={(e) =>
          setUserData({ ...userData, firstName: e.target.value })
        }
        type="text"
        placeholder="First Name"
      />
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userData.lastName}
        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
        type="text"
        placeholder="Last Name"
      />
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        type="text"
        placeholder="Email"
      />
      <input
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
        value={userData.phoneNumber}
        onChange={(e) =>
          setUserData({ ...userData, phoneNumber: e.target.value })
        }
        type="text"
        placeholder="Phone Number"
      />
      <button
        onClick={handleAddUser}
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
      {!isError && (
        <div style={{ color: "green", marginTop: "10px" }}>
          User Added successfully!
        </div>
      )}
    </div>
  );
};

export default AddUserComponent;
