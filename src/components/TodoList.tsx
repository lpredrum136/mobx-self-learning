import { observer } from 'mobx-react'
import { useState } from 'react'
import { PeopleStoreImplementation } from '../store/peopleStore'
import { TodosStoreImplementation } from '../store/todosStore'

interface TodoListProps {
  todosStore: TodosStoreImplementation
  peopleStore: PeopleStoreImplementation
}

const TodoList = observer(({ todosStore, peopleStore }: TodoListProps) => {
  const [text, setText] = useState('')

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => todosStore.addTodo(text)}>Submit todo</button>
      <br />
      Completed: {todosStore.status}
      <ul>
        {todosStore.todos.map((todo) => (
          <li key={todo.id} onClick={() => todosStore.toggleTodo(todo.id)}>
            {todo.completed ? 'completed! --' : '--'}
            {todo.text} -- {todo.assignee.name}
          </li>
        ))}
      </ul>
      <br />
      <button onClick={() => peopleStore.changeMichelName('Michel changed')}>
        Change Michel Name
      </button>
    </div>
  )
})
export default TodoList
