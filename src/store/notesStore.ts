import { v4 as uuidv4 } from 'uuid'

interface Notes {
  text: string
  id: string
}

export interface NotesStore {
  notes: Notes[]
  addNote(text: string): void
  deleteNote(id: string): void
}

export const createNotesStore = () => {
  const notes: Notes[] = []
  return {
    notes,
    addNote(text: string) {
      this.notes.push({ text, id: uuidv4() })
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id)
    },
  }
}
