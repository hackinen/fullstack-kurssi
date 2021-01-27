import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
            <Part key={part.id} part={part.name} num={part.exercises} />
        )}
      </div>
    )
  }

export default Content