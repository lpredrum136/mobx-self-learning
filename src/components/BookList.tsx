import { values } from 'mobx'
import { observer } from 'mobx-react'
import { getSnapshot, Instance } from 'mobx-state-tree'
import { ChangeEvent, useState } from 'react'
import {
  Author,
  Book,
  bookAuthorStore,
  IAuthor,
  IBook,
  IBookAuthorStore
} from '../tree/Book'

// TS types
interface HardcodedBookAndAuthorProps {
  bookAuthorStore: IBookAuthorStore
}

interface AuthorPickerProps {
  bookAuthorStore: IBookAuthorStore
  book: IBook
}

const HardcodedBookAndAuthor = observer(
  ({ bookAuthorStore }: HardcodedBookAndAuthorProps) => {
    const john = Author.create({ id: '4', name: 'John' })
    const sherlockHolmes = Book.create({
      id: Math.random() * 10,
      name: 'Sherlock Holmes'
    })

    // this snapshot is to check if the snapshot automatically gets updated
    // when the store is changed, and it DOES!

    // const bookStoreSnapshot = getSnapshot(bookAuthorStore)

    return (
      <>
        John {JSON.stringify(john, null, 4)}
        {JSON.stringify(sherlockHolmes, null, 4)}
        {/* {JSON.stringify(bookStoreSnapshot, null, 4)} */}
      </>
    )
  }
)

const AuthorPicker = observer(
  ({ bookAuthorStore, book }: AuthorPickerProps) => {
    const changeAuthorForBook = (event: ChangeEvent<HTMLSelectElement>) => {
      // here we just pass in a string but as we cast it with "as", store will resolve it to a real Author
      book.setAuthor(event.target.value as typeof book.author)
    }

    return (
      <select value={book.author?.id} onChange={changeAuthorForBook}>
        <option value="">-none-</option>
        {bookAuthorStore.authors.map(author => (
          <option value={author.id} key={author.id}>
            {author.name}
          </option>
        ))}
      </select>
    )
  }
)

const BookList = observer(() => {
  const [bookName, setBookName] = useState('')
  // const bookStoreSnapshot = getSnapshot(bookAuthorStore)

  return (
    <div>
      HARDCODED
      <br />
      <HardcodedBookAndAuthor bookAuthorStore={bookAuthorStore} />
      <br />
      <p>------------------------------------</p>
      BOOK STORE SNAPSHOT
      <br />
      State: Authors
      <ul>
        {bookAuthorStore.authors.map(author => (
          <li key={(Math.random() * 10).toString()}>{author.name}</li>
        ))}
      </ul>
      State: Books
      <ul>
        {bookAuthorStore.books.map(book => (
          <li key={book.id}>
            {book.name} - {book.read.toString()}, written by {book.author?.name}
          </li>
        ))}
      </ul>
      <br />
      Read: {bookAuthorStore.completedCount} - Pending:{' '}
      {bookAuthorStore.pendingCount}
      <br />
      Filtered by status 'Read':{' '}
      <ul>
        {bookAuthorStore.getBooksByStatus(true).map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
      <p>---------------------------------</p>
      <button
        onClick={() => {
          bookAuthorStore.addBook(Math.random() * 10, bookName)
          setBookName('')
        }}
      >
        Add Book
      </button>
      {/* tutorial does it like this: values(bookAuthorStore.books.map) but that */}
      {/* makes book not have toggle() function */}
      {bookAuthorStore.books.map(book => (
        <div key={book.id.toString()}>
          <input
            type="checkbox"
            checked={book.read}
            onChange={() => book.toggle()}
          />
          <input
            type="text"
            value={book.name}
            onChange={event => book.setName(event.target.value)}
          />
          <AuthorPicker bookAuthorStore={bookAuthorStore} book={book} />
        </div>
      ))}
      <input
        type="text"
        value={bookName}
        onChange={event => setBookName(event.target.value)}
      />
    </div>
  )
})

export default BookList
