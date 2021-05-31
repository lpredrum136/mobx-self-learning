import { applySnapshot, getSnapshot, onSnapshot, types } from 'mobx-state-tree'

// State
const snapshots: any = []
let currentFrame = -1

export const Book = types
  .model({
    name: types.optional(types.string, ''),
    read: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setName: (name: string) => {
      self.name = name
    },
    toggle: () => {
      self.read = !self.read
    }
  }))

export const Author = types.model({
  name: types.optional(types.string, '')
})

const RootStore = types
  .model({
    authors: types.map(Author),
    books: types.map(Book)
  })
  .actions(self => ({
    addBook: (id: number, name: string) =>
      self.books.set(id.toString(), Book.create({ name }))
  }))

export const bookAuthorStore = RootStore.create()

// Snapshot management
onSnapshot(bookAuthorStore, snapshot => {
  console.log(snapshot)
  if (currentFrame === snapshots.length - 1) {
    currentFrame++
    snapshots.push(snapshot)
  }
  console.log('CURRENT FRAME', currentFrame)
  console.log('SNAPSHOTS', snapshots)
})

export const applyPreviousSnapshot = () => {
  if (currentFrame === 0) return
}

// Modify stuff

bookAuthorStore.addBook(1, 'A Song of Ice and Fire')

bookAuthorStore.books.get('1')?.toggle()

applySnapshot(bookAuthorStore, {
  authors: {},
  books: {
    '1': {
      name: 'QLD road rules',
      read: true
    }
  }
})
