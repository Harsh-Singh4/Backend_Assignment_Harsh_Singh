import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getItems } from "../services/itemService";
import { Link } from "react-router-dom";
import CreateItem from "../components/CreateItem";

function Dashboard() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getItems,
  });

  if (isLoading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">Error loading data</p>;

  const items = data?.data || [];

  return (
    <div className="container">
      <h1>Tasks</h1>

      <CreateItem />

      {items.length === 0 && <p>No tasks found</p>}

      {items.map((item) => (
        <Link key={item._id} to={`/${item._id}`}>
          <div className="card">{item.title}</div>
        </Link>
      ))}

     <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
>
  Logout
</button>

    </div>
  );
}

export default Dashboard;