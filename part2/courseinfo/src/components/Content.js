const Total = ({ sum }) => <p>total of {sum} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    const sum = parts.reduce((s,p) => {
      return s + p.exercises
  }, 0)
  
    return (
    <>
     {parts.map((part) => <Part key={part.id} part={part} />)}  
      <Total sum = {sum} />
    </>
    )
  }
  
  export default Content