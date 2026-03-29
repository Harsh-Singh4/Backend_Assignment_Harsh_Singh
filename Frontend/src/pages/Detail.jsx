import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "../services/itemService";

function Detail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getItemById(id),
  });

  if (isLoading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">Error loading task</p>;

  const task = data?.data;

  return (
    <div className="container">
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
      <p>Status: {task?.status}</p>
    </div>
  );
}

export default Detail;