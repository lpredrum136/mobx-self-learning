import {
  applySnapshot,
  getSnapshot,
  Instance,
  onSnapshot,
  SnapshotIn,
  TypeOfValue,
  types
} from 'mobx-state-tree'

// State
const snapshots: any = []
let currentFrame = -1

const defaultAuthors = [
  { id: '1', name: 'Conan Doyle' },
  { id: '2', name: 'George R.R. Martin' },
  { id: '3', name: 'Suzanne Collins' }
]

// TS declaration
export interface IAuthor extends Instance<typeof Author> {}
export interface IBook extends Instance<typeof Book> {}
export interface IBookAuthorStore extends Instance<typeof RootStore> {}

// Store declaration
export const Book = types
  .model({
    id: types.number,
    name: types.optional(types.string, ''),
    read: types.optional(types.boolean, false),
    author: types.maybe(types.reference(types.late(() => Author))) // 'maybe' so author can be null, 'reference' to link to Author instance,
    //  'late' to resolve Author after it is declared (possibly later in the file for example, like in THIS file)
  })
  .actions(self => ({
    setName: (name: string) => {
      self.name = name
    },
    toggle: () => {
      self.read = !self.read
    },

    // if you set author: IAuthor and self.author = author, then front-end must find "author" to pass into setAuthor() which is really dumb

    // if you set author: any and self.author = author, then front-end can pass in anything, either "the" author or authorId only, and the store can find "the" author fine,
    // so that in front end you can use book.author.name

    // but any doesn't make sense, we would want to pass in authorId (string) from front-end, and store must be able to find "the" author based on that authorId
    // but if you set author: string and self.author = author, and front-end pass in authorId to setAuthor(), it DOES NOT WORK!
    // TS will show error that string (from authorId passed in) is not assignable to type self.author (which should be "an" Author instance)
    setAuthor: (author: typeof self.author) => {
      self.author = author
    }
  }))

export const Author = types.model({
  id: types.identifier,
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
    },
    getBooksByStatus(status: boolean) {
      return self.books.filter(book => book.read === status)
    }
  }))
  .actions(self => ({
    addBook: (id: number, name: string) =>
      // self.books.set(id.toString(), Book.create({ name })) // 'set' is used only if books is types.map (object)
      self.books.push({ id, name })
  }))

export const bookAuthorStore = RootStore.create({ authors: defaultAuthors }) // you can pass in starting values here for the store

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
  authors: defaultAuthors,
  books: [{ id: Math.random() * 10, name: 'QLD road rules', read: true }]
})
