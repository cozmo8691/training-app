import { Pane, majorScale, Menu, FolderCloseIcon, Heading } from 'evergreen-ui'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

const CourseList: FC<{ courses: any[] }> = ({ courses }) => {
  const router = useRouter()
  return (
    <Pane padding={majorScale(2)}>
      <Heading size={600} marginTop="default">
        Courses
      </Heading>
      <Menu>
        {courses.map((course) => (
          <Menu.Item key={course._id} icon={FolderCloseIcon} onClick={() => router.push(`/course/${course._id}`)}>
            {course.name}
          </Menu.Item>
        ))}
      </Menu>
    </Pane>
  )
}

CourseList.defaultProps = {
  courses: [],
}

export default CourseList
