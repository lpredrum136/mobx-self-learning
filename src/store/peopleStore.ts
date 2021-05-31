import { action, makeObservable, observable } from 'mobx'

export interface Person {
  name: string
}

export class PeopleStoreImplementation {
  people: Person[] = [{ name: 'Michel' }, { name: 'Me' }]

  constructor() {
    makeObservable(this, { people: observable, changeMichelName: action })
  }

  changeMichelName(name: string) {
    this.people[0].name = name
    // console.log(name)
  }
}

export const PeopleStore = new PeopleStoreImplementation()
