import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Party = () => {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height*2}
    />
  )
}

export default Party