import { useState } from 'react'
import Link from 'next/link'
import { Container, Form, Modal, Button } from 'react-bootstrap'

const Course = ({ courses }) => {
  const [allCourses, setCourses] = useState(courses || [])
  const [newCourseIsShown, setIsShown] = useState(false)
  const [name, setName] = useState('')

  const handleNewCourse = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/course`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(res)

    const { data } = await res.json()
    console.log('data', data)
    // update local state
    setCourses((state) => [...state, data])
    setIsShown(false)
  }

  const handleChange = ({ target: { value } }) => {
    setName(value)
  }

  console.log('render', name)

  return (
    <>
      <ul>
        {allCourses.map((course) => (
          <li key={course._id}>
            <Link href={`/course/${course._id}`}>
              <a>{course.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Button variant="primary" onClick={() => setIsShown(true)}>
        Add new course
      </Button>

      <Modal show={newCourseIsShown}>
        <Modal.Header>
          <Modal.Title>Create new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter course name" onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsShown(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleNewCourse}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Course
