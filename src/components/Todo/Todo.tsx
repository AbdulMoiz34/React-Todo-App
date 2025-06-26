import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

type Todo = {
    todo: string,
    desc: string,
    onDelete: (index: number) => void,
    index: number,
    toggleTodoCompleted: (index: number) => void,
    isCompleted: boolean
}


const Todo = ({ todo, desc, onDelete, index, toggleTodoCompleted, isCompleted }: Todo) => {
    return (
        <li
            // key={index}
            className={`relative flex justify-between items-center p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all ${isCompleted && ("bg-gray-50 line-through")}`}
        >
            <input type="checkbox" className="absolute left-4 accent-black" onChange={() => toggleTodoCompleted(index)} />
            <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-800">{todo}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
            <div className="flex items-center">
                <button className="text-lg cursor-pointer mr-3" >
                    <FaEdit className="hover:text-gray-500" />
                </button>
                <button className="text-xl cursor-pointer" onClick={() => onDelete(index)}>
                    <MdDeleteOutline className="hover:text-gray-500" />
                </button>
            </div>
        </li>
    )
}

export default Todo;
