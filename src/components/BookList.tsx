import { values } from 'mobx'
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { useState } from 'react'
import { Author, Book, bookAuthorStore } from '../tree/Book'

const HardcodedBookAndAuthor = observer(() => {
  const john = Author.create()
  const sherlockHolmes = Book.create({
    id: Math.random() * 10,
    name: 'Sherlock Holmes'
  })
  return (
    <>
      John {JSON.stringify(john, null, 4)} and Sherlock{' '}
      {JSON.stringify(sherlockHolmes, null, 4)}
    </>
  )
})

const BookList = observer(() => {
  const [bookName, setBookName] = useState('')

  return (
    <div>
      HARDCODED
      <br />
      <HardcodedBookAndAuthor />
      <br />
      <p>------------------------------------</p>
      BOOK STORE SNAPSHOT
      <br />
      State: {JSON.stringify(getSnapshot(bookAuthorStore), null, 3)}
      <br />
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
