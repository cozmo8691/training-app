import React, { useState } from 'react'
import { Dialog, TextInput } from 'evergreen-ui'

const NewScreenDialog = ({ onNewScreen, close, ...props }) => {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleNewScreen = async () => {
    setSaving(true)
    await onNewScreen(name)
    setSaving(false)
    setName('')
    close()
  }

  return (
    <Dialog
      {...props}
      title="New Screen"
      confirmLabel="create"
      intent="success"
      onConfirm={handleNewScreen}
      isConfirmLoading={saving}
      onCancel={close}
      onCloseComplete={close}
    >
      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="screen name" />
    </Dialog>
  )
}

export default NewScreenDialog
