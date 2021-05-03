import { useState } from 'react'
import Link from 'next/link'
import { Form, Modal, Button } from 'react-bootstrap'

const Course = ({ courses, isAdmin }) => {
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

    const { data } = await res.json()
    setCourses((state) => [...state, data])
    setIsShown(false)
  }

  const handleChange = ({ target: { value } }) => {
    setName(value)
  }

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

      {isAdmin && (
        <Button variant="primary" onClick={() => setIsShown(true)}>
          Add new course
        </Button>
      )}

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
