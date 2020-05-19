import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'wss://3ch9y4ll08.execute-api.us-east-1.amazonaws.com/test1'

class Chat extends Component {
  state = {
    name: '',
    messages: [],
    data: new Date()
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = evt => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const retorno = JSON.parse(evt.data)
      if (retorno.usuario === 'Atendente') {
        const messages = {action : "onMessage" , message : retorno.data, name : retorno.usuarioEnvio} 
        this.state.name = retorno.usuarioEnvio
        this.addMessage(messages)
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [...state.messages, message] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {action : "onMessage" , message : messageString, usuario:this.state.name, name:'Atendente'} 
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          Usuário:&nbsp;
          <input
            type="text"
            id={'usuario'}
            placeholder={'Informe o usuário'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        <table style={{width: '100%', marginTop: '20px'}}>
        <tr><td style={{width: '30%'}}><strong>Nome</strong></td><td style={{width: '70%'}}> <strong>Mensagem</strong></td></tr>
        {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />,
        )}
        </table>
      </div>
    )
  }
}

export default Chat
