import React, { useState } from "react";
import { Input, Todo as TodoEl } from "./components";
import Button from "@mui/material/Button";

type Todo = {
  todo: string,
  desc: string,
  completed: boolean
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
    setTodos([...todos, { todo: val, desc: desc, completed: false }]);
    setVal("");
    setDesc("");
  }

  const deleteTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => idx !== i));
  }
console.log(todos);
  const toggleTodoCompleted = (idx: number) => {
    const newTodos = [...todos];
    newTodos[idx].completed = !newTodos[idx].completed;
    setTodos(newTodos);
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
              <TodoEl onDelete={deleteTodo} isCompleted={todo.completed} index={index} todo={todo.todo} desc={todo.desc} key={index} toggleTodoCompleted={toggleTodoCompleted} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}