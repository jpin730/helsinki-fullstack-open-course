const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const friends = [
    { id: crypto.randomUUID(), name: 'Peter', age: 4 },
    { id: crypto.randomUUID(), name: 'Maya', age: 10 },
  ]
  return (
    <div>
      <h1>Greetings</h1>
      {friends.map((friend) => (
        <Hello key={friend.id} name={friend.name} age={friend.age} />
      ))}
    </div>
  )
}

export default App
