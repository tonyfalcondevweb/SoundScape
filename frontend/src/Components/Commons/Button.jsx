import React from 'react'

const Button = ({ onClick, children, classAdd }) => {
  return (
    <button 
      onClick={onClick} 
      className={`${classAdd} text-white px-4 py-2 rounded-lg`}
    >
      {children}
    </button>
  )
}

export default Button