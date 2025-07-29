import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // custom axios jisme withCredentials: true set hai

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts"); // cookies auto send hogi
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Submit new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/posts", { title, description }); // no need to add headers manually
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Todos</h2>

        {/* Create Todo Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>

        {/* Todos List */}
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos found</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold text-lg">{todo.title}</h3>
                <p className="text-gray-600">{todo.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;
