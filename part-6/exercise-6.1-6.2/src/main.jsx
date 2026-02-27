import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

// TODO
// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <main>
      <p>
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button>ok</button>
        <button>bad</button>
        <button>reset stats</button>
      </p>

      <p>good {store.getState().good}</p>
      <p>ok </p>
      <p>bad </p>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
