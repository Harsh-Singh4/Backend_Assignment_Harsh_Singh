// src/services/itemService.js
import api from "./api";

// GET all items
export const getItems = () => api.get("/tasks");

// GET single item
export const getItemById = (id) => api.get(`/tasks/${id}`);

// CREATE item
export const createItem = (data) => api.post("/tasks", data);