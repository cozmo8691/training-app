import React, { useState } from 'react'
import { Dialog, TextInput } from 'evergreen-ui'

const NewCourseDialog = ({ onNewCourse, close, ...props }) => {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleNewCourse = async () => {
    console.log('handleNewCourse')
    setSaving(true)
    await onNewCourse(name)
    setSaving(false)
    setName('')
    close()
  }

  return (
    <Dialog
      {...props}
      title="New Course"
      confirmLabel="create"
      intent="success"
      onConfirm={handleNewCourse}
      isConfirmLoading={saving}
      onCancel={close}
      onCloseComplete={close}
    >
      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="course name" />
    </Dialog>
  )
}

export default NewCourseDialog
