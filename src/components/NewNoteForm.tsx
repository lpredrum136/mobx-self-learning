import { useState } from 'react'
import { useNotesStore } from '../store/notesContext'

const NewNoteForm = () => {
  const [text, setText] = useState('')
  const notesStore = useNotesStore()

  return (
    <div>
      <input type="text" onChange={(event) => setText(event.target.value)} />
      <button onClick={() => notesStore?.addNote(text)}>Add note</button>
    </div>
  )
}

export default NewNoteForm
