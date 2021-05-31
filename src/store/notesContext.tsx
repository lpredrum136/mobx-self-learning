import { useLocalObservable } from 'mobx-react'
import { createContext, ReactNode, useContext } from 'react'
import { createNotesStore, NotesStore } from './notesStore'

interface NotesContextProps {
  children: ReactNode
}

const NotesContext = createContext<NotesStore | null>(null)

export const NotesContextProvider = ({ children }: NotesContextProps) => {
  const notesStore = useLocalObservable(() => createNotesStore())
  return (
    <NotesContext.Provider value={notesStore}>{children}</NotesContext.Provider>
  )
}

export const useNotesStore = () => useContext(NotesContext)
