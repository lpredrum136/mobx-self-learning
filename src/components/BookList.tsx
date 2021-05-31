import { getSnapshot } from 'mobx-state-tree'
import { Author, Book, bookAuthorStore } from '../tree/Book'

const BookList = () => {
  const john = Author.create()
  const sherlockHolmes = Book.create({ name: 'Sherlock Holmes' })

  return (
    <div>
      John {JSON.stringify(john)} and Sherlock {JSON.stringify(sherlockHolmes)}
      <br />
      State: {JSON.stringify(getSnapshot(bookAuthorStore))}
    </div>
  )
}

export default BookList
