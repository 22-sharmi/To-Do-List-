import { FaCheck, FaMinus, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FaDeleteLeft } from "react-icons/fa6";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          completed: doc.data().completed || false,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        await addDoc(collection(db, "todos"), { todo: input });
        setInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const todoDocRef = doc(db, "todos", todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });
        setEditIndex(-1);
        setInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleCompletion = async (id, completed) => {
    try {
      const todoDocRef = doc(db, "todos", id);
      await updateDoc(todoDocRef, { completed: !completed });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-gradient-to-r from-pink-100 via-blue-100 to-green-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">To Do List</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Your Task"
              className="py-2 px-4 border w-full rounded-lg focus:outline-none mr-2 bg-slate-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={editIndex === -1 ? addTodo : updateTodo}
              className=" bg-gradient-to-r from-yellow-300 to-yellow-600 text-white py-2 px-4 rounded text-nowrap"
            >
              {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
            </button>
          </div>
        </div>
        {todos.length > 0 && (
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <ul>
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between bg-slate-50 rounded shadow-md p-3 mb-3 ${
                    todo.completed && "line-through text-gray-500"
                  }`}
                >
                  <span>{todo.todo}</span>
                  <div className="flex gap-2">
                    {!todo.completed ? (
                      <button
                        onClick={() =>
                          toggleCompletion(todo.id, todo.completed)
                        }
                        className="text-green-300"
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          toggleCompletion(todo.id, todo.completed)
                        }
                        className="text-red-300"
                      >
                        <FaMinus/>
                      </button>
                    )}
                    <button
                      onClick={() => setEdit(index)}
                      className="border rounded px-4 py-2 bg-gradient-to-r from-blue-300 to-blue-600 text-white"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="border rounded px-4 py-2 bg-gradient-to-r from-red-300 to-red-600 text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
