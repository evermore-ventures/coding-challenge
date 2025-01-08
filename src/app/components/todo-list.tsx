import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { Todo } from "../../types";
import DeleteTodoDialog from "./delete-todo-dialog";
import EditTodoDialog from "./edit-todo-dialog";
import { getStateLabel } from "../../utils";
import { useDispatch } from "react-redux";
import { changeState } from "../../state/todosSlice";

export default function TodoList({todoListId, todos}: {todoListId: number, todos: Todo[]}) {
    const dispatch = useDispatch();

    const handleChangeState = (id: number) => {
        dispatch(changeState({ todoListId, id }));
    }

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell className="flex gap-2">
                    Priority
                </TableCell>
                <TableCell className="flex gap-2">
                    State
                </TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                todos.map((todo) => (
                    <TableRow key={todo.id}>
                        <TableCell>{todo.name}</TableCell>
                        <TableCell>{todo.priority}</TableCell>
                        <TableCell>
                            <Button variant="text" onClick={() => handleChangeState(todo.id)}>{ getStateLabel(todo.state)}</Button>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <DeleteTodoDialog todoListId={todoListId} id={todo.id} />
                                <EditTodoDialog todoListId={todoListId} {...todo} />
                            </ div>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
}