import React from 'react'
import './App.css'
import Counter from './components/Counter'
import { observable, configure, action } from 'mobx'
import { NotesContextProvider } from './store/notesContext'
import NewNoteForm from './components/NewNoteForm'
import Notes from './components/Notes'
import TodoList from './components/TodoList'
import { TodosStore } from './store/todosStore'
import { PeopleStore } from './store/peopleStore'
import BookList from './components/BookList'

configure({ enforceActions: 'always' })

const appState = observable({
  count: 0,
  increment: action('Increment Counter', () => {
    appState.count += 1
  }),
  decrement: action('Decrement Counter', () => {
    appState.count -= 1
  }),
  get countByThree() {
    return this.count * 3
  },
  get countByFour() {
    return this.count * 4
  }
})

function App() {
  return (
    <div className="App">
      <NotesContextProvider>
        <h2>RAW MOBX</h2>
        <Counter appState={appState} />
        <h2>===================</h2>
        <h2>RAW MOBX WITH CONTEXT API</h2>
        <Notes />
        <NewNoteForm />
        <h2>=====================</h2>
        <h2>RAW MOBX WITH STORE STYLE</h2>
        <TodoList todosStore={TodosStore} peopleStore={PeopleStore} />
        <h2>======================</h2>
        <h2>MOBX STATE TREE</h2>
        <BookList />
      </NotesContextProvider>
    </div>
  )
}

export default App
