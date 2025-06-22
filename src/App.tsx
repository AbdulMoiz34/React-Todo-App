import React, { useState } from "react";
import { Input } from "./components";
import Button from "@mui/material/Button";

type Todo = {
  todo: string,
  desc: string
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [val, setVal] = useState("");
  const [desc, setDesc] = useState("");

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!val.trim()) {
      alert("Please Enter");
      return;
    }
    setTodos([...todos, { todo: val, desc: desc }]);
    debugger;
    setVal("");
    setDesc("");
  }

  const deleteTodo = (idx: number) => {
    const copyTodos = [...todos];
    setTodos(copyTodos.filter((_, i) => idx !== i));
  }


  const changeValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }

  const changeDescHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }

  return (
    <>
      <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-6 text-3xl font-extrabold shadow-md rounded-b-lg">
        📝 My Todo App
      </h1>

      <div className="mt-10 px-6 flex justify-center ">
        <form
          onSubmit={addTodo}
          className="flex flex-col justify-center md:flex-row gap-4 w-full max-w-3xl bg-white p-6 rounded-xl"
        >
          <Input
            placeholder="Enter Todo"
            required={true}
            value={val}
            changeHandler={changeValHandler}
          />
          <Input
            placeholder="Enter Description"
            value={desc}
            required={false}
            changeHandler={changeDescHandler}
          />
          <Button type="submit" variant="contained" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-all">
            ➕ Add Todo
          </Button>
        </form>
      </div>

      <div className="my-10 px-6 max-w-3xl mx-auto">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex justify-between bg-white p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{todo.todo}</h3>
                  <p className="text-sm text-gray-600">{todo.desc}</p>
                </div>
                <div>
                  <button className="text-xs cursor-pointer hover:font-bold" onClick={() => deleteTodo(index)}>DEL</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}