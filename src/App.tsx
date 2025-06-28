import React, { useEffect, useState, useRef } from "react";
import { Input, Todo as TodoEl } from "./components";
import { addDoc, collection, db, onSnapshot, deleteDoc, doc, updateDoc } from "./config/firebase.ts";
import { message, Button } from "antd";

type Todo = {
  todo: string,
  desc: string,
  completed: boolean,
  id: string
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const editableTodoId = useRef<string | null>(null);

  const [val, setVal] = useState("");
  const [desc, setDesc] = useState("");
  const [isEdit, setIsEdit] = useState(false);


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

  const changeValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }

  const changeDescHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      messageApi.success("todo deleted.");
      handleCancel();
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

  const onEdit = async (id: string, title: string, desc: string) => {
    setIsEdit(true);
    setVal(title);
    setDesc(desc);
    editableTodoId.current = id;
  }

  const handleCancel = () => {
    setVal("");
    setDesc("");
    setIsEdit(false);
    editableTodoId.current = null;
  }

  const editTodo = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(editableTodoId);
    if (!editableTodoId.current) {
      return;
    }
    try {
      await updateDoc(doc(db, "todos", editableTodoId.current), { todo: val, desc: desc });
      messageApi.success("Todo updated.");
      handleCancel();
    } catch (err) {
      messageApi.error("Error.");
    }
  }

  return (
    <>
      {contextHolder}
      <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-6 text-3xl font-extrabold shadow-md rounded-b-lg">
        📝 My Todo App
      </h1>

      <div className="mt-10 px-6 flex justify-center">
        <form
          onSubmit={isEdit ? editTodo : addTodo}
          className="flex flex-col justify-center md:flex-row gap-4 w-full max-w-3xl bg-white p-6 rounded-xl"
        >
          <Input
            placeholder="Enter Todo"
            required={true}
            value={val}
            onChange={changeValHandler}
          />
          <Input
            placeholder="Enter Description"
            value={desc}
            onChange={changeDescHandler}
          />
          <Button
            htmlType="submit"
            type="primary"
            style={{ padding: "14px 0" }}
            className="flex-1/4 inline-block w-full text-white rounded-lg"
          >
            {isEdit ? "Save" : "Add Todo"}
          </Button>
          {isEdit && <Button htmlType="button" type="default" onClick={handleCancel}>Cancel</ Button>}
        </form>
      </div>
      <div className="my-10 px-6 max-w-3xl mx-auto">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul className="space-y-3 mt-6">
            {todos.map((todo) => (
              <TodoEl
                onEdit={onEdit}
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                toggleCompleted={toggleCompleted}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}