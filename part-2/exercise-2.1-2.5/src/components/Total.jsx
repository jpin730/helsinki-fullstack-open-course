const Total = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts.at(0).exercises + props.parts.at(1).exercises + props.parts.at(2).exercises}
    </p>
  )
}

export default Total
