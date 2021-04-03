import React, { useEffect, useState } from 'react'
import { Pane, majorScale, Text, TextInput, Button } from 'evergreen-ui'

import Logo from '../components/logo'
import SocialButton from '../components/socialButton'

import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const Signin = () => {
  const [session, loading] = useSession()
  const [emailValue, setEmailValue] = useState('')
  const router = useRouter()

  // if a user is logged it, never show them this page,
  // go straight to app
  useEffect(() => {
    if (session) {
      router.push('/profile')
    }
  }, [session, router])

  const handleChange = (e) => {
    setEmailValue(e.target.value)
  }

  // const handleEmailSignIn = async () => {
  //   const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/signin/${emailValue}`
  //   const res = await fetch(url)
  //   if (res.ok) {
  //     console.log(res)
  //   } else {
  //     console.log('fail')
  //     console.log(res)
  //   }
  // }

  console.log(emailValue)

  return (
    <Pane height="100vh" width="100vw" display="flex">
      <Pane
        height="100%"
        width="50%"
        borderRight
        paddingX={majorScale(8)}
        paddingY={majorScale(5)}
        background="#47B881"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pane>
          <Logo color="white" fontSize="60px" />
          <Pane marginTop={majorScale(2)}>
            <Text color="white" fontSize="22px">
              Sign in.
            </Text>
          </Pane>
        </Pane>
      </Pane>
      <Pane
        height="100%"
        width="50%"
        background="tint2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={majorScale(7)}
      >
        <Pane width="100%" textAlign="center">
          <SocialButton type="github" onClick={() => signIn('github')} />
        </Pane>
        <Pane width="100%" textAlign="center">
          Email
          {/* <TextInput name="email" placeholder="Enter email..." onChange={handleChange} /> */}
          <Button appearance="primary" onClick={() => signIn('email')}>
            Sign in with email
          </Button>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default Signin
