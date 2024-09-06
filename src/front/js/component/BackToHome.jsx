import React from 'react'
import { Link } from 'react-router-dom'

export const BackToHome = ({ text }) => {
  return (
    <Link to="/">
      {text}
    </Link>
  )
}
