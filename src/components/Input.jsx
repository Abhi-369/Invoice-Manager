import React from 'react'

const Input = ({ value, handleChangeOne, name }) => {
  return (
    <input
      type='text'
      className='input'
      value={value}
      placeholder='Insert Your Value'
      onChange={handleChangeOne}
      name={name}
    />
  )
}

export default Input