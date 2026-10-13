import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { MY_CLIENT_ID } from '../keys'
import { signIn, signOut } from '../actions'
import { googleIcon } from '../icons'

const GIS_SRC = 'https://accounts.google.com/gsi/client'

// Loads Google Identity Services once and resolves when window.google is ready
const loadGis = () =>
  new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) return resolve()
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`)
    const script = existing || document.createElement('script')
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', reject)
    if (!existing) {
      script.src = GIS_SRC
      script.async = true
      document.head.appendChild(script)
    }
  })

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn)
  const dispatch = useDispatch()
  const tokenClient = useRef(null)
  const accessToken = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadGis()
      .then(() => {
        if (cancelled) return
        tokenClient.current = window.google.accounts.oauth2.initTokenClient({
          client_id: MY_CLIENT_ID,
          scope: 'openid email',
          callback: async (response) => {
            if (response.error) {
              console.error('Google sign-in failed:', response.error)
              return
            }
            accessToken.current = response.access_token
            try {
              // "sub" is the same stable Google user ID the old gapi getId() returned
              const res = await fetch(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${response.access_token}` } }
              )
              const info = await res.json()
              dispatch(signIn(info.sub))
            } catch (err) {
              console.error('Could not fetch Google user info:', err)
            }
          },
        })
        setReady(true)
      })
      .catch((err) => console.error('Could not load Google sign-in:', err))

    return () => {
      cancelled = true
    }
  }, [dispatch])

  const onSignInClick = () => {
    if (tokenClient.current) tokenClient.current.requestAccessToken()
  }

  const onSignOutClick = () => {
    if (accessToken.current && window.google) {
      window.google.accounts.oauth2.revoke(accessToken.current)
      accessToken.current = null
    }
    dispatch(signOut())
  }

  if (isSignedIn) {
    return (
      <div>
        <Button
          size='sm'
          variant='outline-danger'
          className='d-flex align-items-center bar-button'
          onClick={onSignOutClick}
        >
          {googleIcon}
          <div className='ms-1'>Log Out</div>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button
        size='sm'
        variant='outline-primary'
        className='d-flex align-items-center bar-button'
        onClick={onSignInClick}
        disabled={!ready}
      >
        {googleIcon}
        <div className='ms-1'>Log In</div>
      </Button>
    </div>
  )
}

export default GoogleAuth
