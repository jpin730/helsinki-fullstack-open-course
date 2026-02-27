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

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
