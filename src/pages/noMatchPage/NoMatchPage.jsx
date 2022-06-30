import React from 'react'
import { Link } from 'react-router-dom';

import ErrorMessage from '../../components/errorMessage/ErrorMessage'

export default function NoMatchPage () {
  return (
    <div>
      <ErrorMessage />
      <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>Page doesn't exit</p>
      <Link to='/' style={{display: 'block', marginTop: '25px', textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}} >Back to main page</Link>
    </div>
  )
}
