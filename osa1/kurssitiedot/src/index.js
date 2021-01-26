import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.p1} num={props.e1} />
      <Part part={props.p2} num={props.e2} />
      <Part part={props.p3} num={props.e3} />
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.num}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.num}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header header={course.name} />
      <Content p1={course.parts[0].name} p2={course.parts[1].name} p3={course.parts[2].name} e1={course.parts[0].exercises} e2={course.parts[1].exercises} e3={course.parts[2].exercises} />
      <Total num={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))