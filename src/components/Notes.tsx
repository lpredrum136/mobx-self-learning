import { observer } from 'mobx-react'
import { useNotesStore } from '../store/notesContext'

const Notes = observer(() => {
  const notesStore = useNotesStore()

  return (
    <ul>
      {notesStore?.notes.map((note) => (
        <li key={note.id} onClick={() => notesStore.deleteNote(note.id)}>
          {note.text}
        </li>
      ))}
    </ul>
  )
})

export default Notes
