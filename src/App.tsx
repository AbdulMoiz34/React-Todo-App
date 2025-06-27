import React, { useEffect, useState } from "react";
import { Input, Todo as TodoEl } from "./components";
import Button from "@mui/material/Button";
import { addDoc, collection, db, onSnapshot, deleteDoc, doc, updateDoc } from "./config/firebase.ts";
import { message } from "antd";

type Todo = {
  todo: string,
  desc: string,
  completed: boolean,
  id: string
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [val, setVal] = useState("");
  const [desc, setDesc] = useState("");


  useEffect(() => {
    const hide = messageApi.loading({ content: "Loading", duration: 0 });
    onSnapshot(collection(db, "todos"), (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach(doc => {
        todos.push({ ...doc.data(), id: doc.id } as Todo);
      });
      setTodos(todos);
      hide();
    });
  }, []);

  const addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!val.trim()) {
      alert("Please Enter");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        todo: val,
        desc,
        completed: false,
      });
      messageApi.success("Todo added.");
    } catch (err) {
      messageApi.error("Something went wrong.");
    }
    setVal("");
    setDesc("");
  }

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      messageApi.success("todo deleted.");
    } catch (err) {
      messageApi.error("something went wrong.");
    }
  }

  const toggleCompleted = async (id: string, completedStatus: boolean) => {
    try {
      await updateDoc(doc(db, "todos", id), { completed: !completedStatus });
      messageApi.success("Todo updated.");
    } catch (err) {
      messageApi.error("Error.");
    }
  }

  const changeValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }

  const changeDescHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }

  return (
    <>
      {contextHolder}
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
            {todos.map((todo) => (
              <TodoEl onDelete={deleteTodo} todo={todo} key={todo.id} toggleCompleted={toggleCompleted} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}