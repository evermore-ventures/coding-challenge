import { CssBaseline, Container, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import CreateTodoDialog from "../components/create-todo-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { filter, selectTest } from '../../state/todosSlice';
import { RootState } from '../../state/store';
import TodoList from "../components/todo-list";
import { useEffect, useState } from "react";
import { sort } from '../../state/todosSlice';
import { useParams } from "react-router-dom";
import CreateTodoList from "../components/create-todo-list";

export default function Todo() {
    const { slug } = useParams();

    const todoListId = parseInt(slug || '0');

    const todos = useSelector((state: RootState) => selectTest(state));

    const [stateFilter, setStateFilter] = useState(() => 
        localStorage.getItem('stateFilter') || 'all'
    );
    const [priorityFilter, setPriorityFilter] = useState(() => 
        localStorage.getItem('priorityFilter') || 'all'
    );
    const [sortCol, setSortCol] = useState(() => 
        localStorage.getItem('sortCol') || 'priority'
    );

    useEffect(() => {
        localStorage.setItem('stateFilter', stateFilter);
        localStorage.setItem('priorityFilter', priorityFilter);
        localStorage.setItem('sortCol', sortCol);
    }, [stateFilter, priorityFilter, sortCol]);


    // const filteredTodos = () => {
    //   if(stateFilter === 'all' && priorityFilter === 'all') {
    //     return todos;
    //   }
    //   if(stateFilter === 'all') {
    //     return todos.filter((todo) => todo.priority === priorityFilter);
    //   }
    //   if(priorityFilter === 'all') {
    //     return todos.filter((todo) => todo.state === stateFilter);
    //   }
    //   return todos.filter((todo) => todo.state === stateFilter && todo.priority === priorityFilter);  
    // }

    const dispatch = useDispatch();

    return   <>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          background: grey[200],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ p: 4, width: '80%' }}>
          <div className="text-right">
            <CreateTodoList />
          </div>
        {
          todos.map((todoList) => (    
            <CardContent>
              <div className="grid gap-4">
                <div className="text-xl font-bold">
                  List: {todoList.name}
                </div>
                  <div className="flex gap-4">
                    <CreateTodoDialog todoListId={todoList.id} />
                    <FormControl className="ml-0 mr-auto" >
                      <InputLabel id="state-filter-label">State</InputLabel>
                      <Select
                          labelId="state-filter-label"
                          id="state-filter-select"
                          value={stateFilter}
                          label="Priority"
                          onChange={(e) => {
                            setStateFilter(e.target.value)
                            dispatch(filter({ todoListId, stateFilter: e.target.value, priorityFilter }))
                          }}
                      >
                          <MenuItem value={'all'}>All</MenuItem>
                          <MenuItem value={'todo'}>To Do</MenuItem>
                          <MenuItem value={'in_progress'}>In Progress</MenuItem>
                          <MenuItem value={'done'}>Done</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className="mr-0" >
                      <InputLabel id="priority-filter-label">Priority</InputLabel>
                      <Select
                          labelId="priority-filter-label"
                          id="priority-filter-select"
                          value={priorityFilter}
                          label="Priority"
                          onChange={(e) => {
                            setPriorityFilter(e.target.value)
                            dispatch(filter({ todoListId, stateFilter, priorityFilter: e.target.value }))
                          }}
                      >
                          <MenuItem value={'all'}>All</MenuItem>
                          <MenuItem value={'high'}>High</MenuItem>
                          <MenuItem value={'medium'}>Medium</MenuItem>
                          <MenuItem value={'low'}>Low</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className="mr-0" >
                        <InputLabel id="sort-filter-label">Sort</InputLabel>
                        <Select
                            labelId="sort-filter-label"
                            id="sort-filter-select"
                            value={sortCol}
                            label="Sort"
                            onChange={(e) => {
                              setSortCol(e.target.value)
                              dispatch(sort({ todoListId, col: e.target.value }))
                            }}
                        >
                            <MenuItem value={'priority'}>Priority</MenuItem>
                            <MenuItem value={'state'}>State</MenuItem>
                        </Select>
                    </FormControl>
                  </div>
                  <TodoList todoListId={todoList.id} todos={todoList.todos} />
              </div>
          </CardContent>    
            ))
      }
      </Card>
      </Container>
    </>
}