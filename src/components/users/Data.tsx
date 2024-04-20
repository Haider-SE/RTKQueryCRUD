import { useGetAllUsersQuery } from "../../feature/apiSlice";

export const Data = () => {
  // Auto-generated hook by createApi to fetch and select data
  const { data, error, isError, isLoading } = useGetAllUsersQuery("", {
    //pollingInterval: 60000, // This will refetch data every 60 seconds
  });
  // Display a loading indicator if the request is in progress
  if (isLoading) return <h1>Loading...</h1>;
  // Display an error message if the request failed
  if (error) return <div>Error loading cart items</div>;
  console.log("data", data);
  return (
    <div style={{ padding: "10px" }}>
      <h2>User Information</h2>
      <h3>Total Users: {data?.total}</h3>
      <table
        style={{
          width: "90%",
          marginLeft: "20px",
          textAlign: "left",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              First Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Last Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user: any) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.firstName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.lastName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
