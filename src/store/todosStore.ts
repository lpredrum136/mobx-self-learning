import { action, autorun, computed, makeObservable, observable } from 'mobx'
import { PeopleStore, Person } from './peopleStore'

interface Todo {
  id: string
  text: string
  completed: boolean
  assignee: Person
}

export class TodosStoreImplementation {
  todos: Todo[] = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
    })
    autorun(() => console.log('AUTORUN', this.status)) // called whenever anything (observable?) inside this.status is changed
  }

  addTodo(text: string) {
    const todo: Todo = {
      id: Math.random().toFixed(4),
      text,
      completed: false,
      assignee: PeopleStore.people[0],
    }

    this.todos.push(todo)
  }

  toggleTodo(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })
  }

  get status() {
    const completed = this.todos.filter((todo) => todo.completed).length
    return completed
  }
}

export const TodosStore = new TodosStoreImplementation()
