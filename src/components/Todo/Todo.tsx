import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

type Todo = {
    onDelete: (id: string) => void,
    toggleCompleted: (id: string, completedStatus: boolean) => void,
    todo: { todo: string, desc: string, completed: boolean, id: string }
}

const Todo = ({ todo, onDelete, toggleCompleted }: Todo) => {
    const { desc, todo: title, id, completed } = todo;
    return (
        <li
            className={`relative flex justify-between items-center p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all ${completed && ("bg-gray-50 line-through")}`}
        >
            <input type="checkbox" checked={completed} className="absolute left-4 accent-black" onChange={() => toggleCompleted(id, completed)} />
            <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
            <div className="flex items-center">
                <button className="text-lg cursor-pointer mr-3" >
                    <FaEdit className="hover:text-gray-500" />
                </button>
                <button className="text-xl cursor-pointer" onClick={() => onDelete(id)}>
                    <MdDeleteOutline className="hover:text-gray-500" />
                </button>
            </div>
        </li>
    )
}

export default Todo;
