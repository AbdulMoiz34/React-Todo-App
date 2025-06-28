import { Checkbox, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type TodoType = {
    todo: string,
    desc: string,
    id: string,
    completed: boolean
}

type Todo = {
    todo: TodoType,
    onDelete: (id: string) => void,
    onEdit: (id: string, val: string, desc: string) => void,
    toggleCompleted: (id: string, completed: boolean) => void;
}

const Todo = ({ todo, onDelete, toggleCompleted, onEdit }: Todo) => {
    return (
        <li
            className="flex justify-between items-center gap-3 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white"
        >
            <div className="flex items-center gap-3">
                <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id, todo.completed)}
                />
                <div>
                    <h3
                        className={`text-lg font-medium ${todo.completed ? "line-through text-gray-400" : ""
                            }`}
                    >
                        {todo.todo}
                    </h3>
                    <p
                        className={`text-sm ${todo.completed ? "line-through text-gray-300" : "text-gray-600"
                            }`}
                    >
                        {todo.desc}
                    </p>
                </div>
            </div>

            <div className="">
                <Tooltip title="Delete">
                    <DeleteOutlined
                        className="cursor-pointer mt-1"
                        onClick={() => onDelete(todo.id)}
                    />
                </Tooltip>
                <Tooltip title="Edit" className="ml-3">
                    <EditOutlined
                        className="cursor-pointer mt-1"
                        onClick={() => onEdit(todo.id, todo.todo, todo.desc)}
                    />
                </Tooltip>
            </div>
        </li>
    );
}

export default Todo;
