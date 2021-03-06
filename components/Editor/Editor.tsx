import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import EditorJS from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import { useThrottleCallback } from '@react-hook/throttle'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Container, Spinner, Row, Card, Button } from 'react-bootstrap'

const saveEditor = async (screenId: string, data: any) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/screen/${screenId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}

const Editor: FC<{ screenId: string; content: any }> = ({ content, screenId }) => {
  const editor = useRef(null)
  const [saving, setSaving] = useState(false)
  const [doneSaving, setDoneSaving] = useState(false)

  const save = useThrottleCallback(async () => {
    if (editor.current) {
      const data = await editor.current.save()

      setSaving(true)
      setDoneSaving(false)

      await saveEditor(screenId, { content: data })

      setTimeout(() => {
        setSaving(false)
        setDoneSaving(true)

        setTimeout(() => {
          setDoneSaving(false)
        }, 3000)
      }, 2500)
    }
  }, 30)

  useEffect(() => {
    const editorJs = new EditorJS({
      tools: EDITOR_JS_TOOLS,
      holder: 'editorjs',
      data: content,
      autofocus: true,
      placeholder: 'Let???s do this',
      onChange: save,
    })

    editor.current = editorJs

    return () => {
      if (editor.current) {
        try {
          editor.current.destroy()
        } catch {
          console.warn('error destroying editor')
        }
      }
    }
  }, [save, content])

  return (
    <Container>
      <div id="editorjs" style={{ width: '100%' }} />
      {saving || doneSaving ? (
        <Container>
          <Container>{saving ? <Spinner animation="border" role="status" /> : <p>done</p>}</Container>
          <p>{saving ? '...auto saving' : 'saved'}</p>
        </Container>
      ) : null}
    </Container>
  )
}

Editor.defaultProps = {
  content: {},
}

export default Editor
