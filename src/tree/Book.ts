import { applySnapshot, getSnapshot, onSnapshot, types } from 'mobx-state-tree'

// State
const snapshots: any = []
let currentFrame = -1

export const Book = types
  .model({
    id: types.number,
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
    // authors: types.map(Author), // {'1': Author1, '2': Author2}
    // books: types.map(Book) // {'1': Book1, '2': Book2}
    authors: types.array(Author),
    books: types.array(Book)
  })
  .views(self => ({
    get pendingCount() {
      return self.books.filter(book => !book.read).length
    },
    get completedCount() {
      return self.books.filter(book => book.read).length
    }
  }))
  .actions(self => ({
    addBook: (id: number, name: string) =>
      // self.books.set(id.toString(), Book.create({ name })) // 'set' is used only if books is types.map (object)
      self.books.push({ id, name })
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

bookAuthorStore.addBook(Math.random() * 10, 'A Song of Ice and Fire')

// bookAuthorStore.books.get('1')?.toggle() // 'get' is only when books is type.map (object)

bookAuthorStore.books[0].toggle()

// applySnapshot(bookAuthorStore, {
//   authors: {},
//   books: {
//     '1': {
//       name: 'QLD road rules',
//       read: true
//     }
//   }
// })

applySnapshot(bookAuthorStore, {
  authors: [],
  books: [{ id: Math.random() * 10, name: 'QLD road rules', read: true }]
})
