import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg my-1 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-base"
        required
      />
  )
}

export default Input