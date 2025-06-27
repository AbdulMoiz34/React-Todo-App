import { Checkbox, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type TodoType = {
    todo: string,
    desc: string,
    id: string,
    completed: boolean
}

type Todo = {
    todo: TodoType,
    onDelete: (id: string) => void,
    toggleCompleted: (id: string, completed: boolean) => void;
}

const Todo = ({ todo, onDelete, toggleCompleted }: Todo) => {
    return (
        <li
            className="flex justify-between items-start gap-3 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white"
        >
            <div className="flex items-start gap-3">
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

            <Tooltip title="Delete">
                <DeleteOutlined
                    className="text-red-500 text-lg hover:text-red-700 cursor-pointer mt-1"
                    onClick={() => onDelete(todo.id)}
                />
            </Tooltip>
        </li>
    );
}

export default Todo;
