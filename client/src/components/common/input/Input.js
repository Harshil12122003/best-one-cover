import React from 'react'

function Input(props) {
    const {type, placeholder, onChange, readOnly, value, className, label, htmlFor, name} = props;
  return (
    <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} className={className} value={value} readOnly={readOnly} />
    </div>
  )
}

export default Input