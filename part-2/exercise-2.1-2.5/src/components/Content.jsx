import Part from './Part'

const Content = (props) => {
  return (
    <>
      <Part part={props.parts.at(0).name} exercises={props.parts.at(0).exercises} />
      <Part part={props.parts.at(1).name} exercises={props.parts.at(1).exercises} />
      <Part part={props.parts.at(2).name} exercises={props.parts.at(2).exercises} />
    </>
  )
}

export default Content
