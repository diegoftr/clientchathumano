import React from 'react'

export default ({ name, message }) => {
  if(name === 'Atendente') {
    return <tr style={{textAlign: 'left'}}><td><strong>{name}</strong></td><td className="chatbox__message" style={{textAlign: 'justify'}}> {message}</td><td></td> </tr>
  } else {
    return <tr style={{textAlign: 'right'}}><td></td> <td className="chatbox__message" style={{textAlign: 'justify'}}>{message}</td><td><strong>{name}</strong></td></tr>
  }

}
