import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({course}) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total num={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
        </div>
    )
}
  
export default Course