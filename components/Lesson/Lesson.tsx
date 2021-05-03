import { useState } from 'react'
import Link from 'next/link'
import { Form, Modal, Button } from 'react-bootstrap'

const Lesson = ({ lessons, courseId, isAdmin }) => {
  const [allLessons, setLessons] = useState(lessons || [])
  const [newLessonIsShown, setIsShown] = useState(false)
  const [name, setName] = useState('')

  const handleNewLesson = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/lesson`, {
      method: 'POST',
      body: JSON.stringify({ name, course: courseId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = await res.json()

    setLessons((state) => [...state, data])
    setIsShown(false)
  }

  const handleChange = ({ target: { value } }) => {
    setName(value)
  }

  return (
    <>
      <ul>
        {allLessons.map((lesson) => (
          <li key={lesson._id}>
            <Link href={`/course/${courseId}/${lesson._id}`}>
              <a>{lesson.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <Button variant="primary" onClick={() => setIsShown(true)}>
          Add new lesson
        </Button>
      )}

      <Modal show={newLessonIsShown}>
        <Modal.Header>
          <Modal.Title>Create new lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter lesson name" onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsShown(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleNewLesson}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Lesson
