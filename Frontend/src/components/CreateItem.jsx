import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../services/itemService";
import { useState } from "react";

function CreateItem() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Add Task</h2>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="button">Add</button>
    </form>
  );
}

export default CreateItem;