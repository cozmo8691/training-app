import React, { useState } from 'react'
import { Dialog, TextInput } from 'evergreen-ui'

const NewLessonDialog = ({ onNewLesson, close, ...props }) => {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleNewLesson = async () => {
    console.log('handleNewLesson')
    setSaving(true)
    await onNewLesson(name)
    setSaving(false)
    setName('')
    close()
  }

  return (
    <Dialog
      {...props}
      title="New Lesson"
      confirmLabel="create"
      intent="success"
      onConfirm={handleNewLesson}
      isConfirmLoading={saving}
      onCancel={close}
      onCloseComplete={close}
    >
      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="lesson name" />
    </Dialog>
  )
}

export default NewLessonDialog
