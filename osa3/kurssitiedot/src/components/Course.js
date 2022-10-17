const CourseHeader = ({name}) => <h2>{name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </div>
)

const Total = ({parts}) => {
  const sum = parts.reduce((previous, currentPart) => previous + currentPart.exercises, 0);
  return (
    <div>
      <p><b>Total of exercises {sum}</b></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course