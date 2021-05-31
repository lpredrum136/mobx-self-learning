import { Fragment } from 'react'
import { observer } from 'mobx-react'

interface CounterProps {
  appState: {
    count: number
    increment: () => void
    decrement: () => void
    readonly countByThree: number
    readonly countByFour: number
  }
}

const Counter = observer(({ appState }: CounterProps) => {
  return (
    <Fragment>
      {appState.count}
      <div>
        <button onClick={appState.increment}>Increment</button>
        <button onClick={appState.decrement}>Decrement</button>
      </div>
      <div>
        Count By 3: {appState.countByThree}
        Count By 4: {appState.countByFour}
      </div>
      <br />
    </Fragment>
  )
})

export default Counter
