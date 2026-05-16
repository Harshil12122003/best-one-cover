import React from 'react'

function Image(props) {
  const { src, id, alt = "", className, onClick } = props;
  return (
    <>
      <img src={src} alt={alt} id={id} className={className} onClick={onClick} />
    </>
  )
}

export default Image