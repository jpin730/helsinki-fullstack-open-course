import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { CounterActionTypes, counterReducer } from './reducers/counterReducer'

const store = createStore(counterReducer)

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const { good, ok, bad } = store.getState()

  const dispatchAction = (type) => () => store.dispatch({ type })

  return (
    <main>
      <p>
        <button onClick={dispatchAction(CounterActionTypes.Good)}>good</button>
        <button onClick={dispatchAction(CounterActionTypes.Ok)}>ok</button>
        <button onClick={dispatchAction(CounterActionTypes.Bad)}>bad</button>
        <button onClick={dispatchAction(CounterActionTypes.Reset)}>reset stats</button>
      </p>

      <p>good {good}</p>
      <p>ok {ok}</p>
      <p>bad {bad}</p>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
