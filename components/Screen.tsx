import { FC, useState } from 'react'
import Link from 'next/link'

import edjsHTML from 'editorjs-html'
const edjsParser = edjsHTML()

const Screen: FC<{ lessonDetails: any; currentScreen: number }> = ({ lessonDetails, currentScreen }) => {
  const { screens, course } = lessonDetails

  console.log('currentScreen', currentScreen)
  console.log('screens.length', screens.length)

  const previousScreen: number = +currentScreen - 1
  const nextScreen: number = +currentScreen + 1

  function createMarkup(markup) {
    return { __html: markup }
  }

  let html = null
  if (screens[currentScreen].content) {
    html = edjsParser.parse(screens[currentScreen].content)
  }

  return (
    <div>
      <div>{screens[currentScreen].name}</div>
      <div dangerouslySetInnerHTML={createMarkup(html)} />
      {currentScreen > 0 && (
        <Link href={`/course/${course}/${encodeURIComponent(lessonDetails._id)}/${previousScreen}`}>
          previous screen
        </Link>
      )}
      {currentScreen < screens.length - 1 && (
        <Link href={`/course/${course}/${encodeURIComponent(lessonDetails._id)}/${nextScreen}`}>next screen</Link>
      )}
    </div>
  )
}

export default Screen
