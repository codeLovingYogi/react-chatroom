import React, { Component } from 'react'

class ChatRoom extends Component {

	constructor(props, context){
		super(props, context)
		this.updateMessage = this.updateMessage.bind(this)
		this.updateUser = this.updateUser.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
		this.state = {
			message: '',
			messages: [
				// {id:0, text:'first message'},
				// {id:1, text:'second message'},
				// {id:2, text:'third message'}
			]
		}
	}

	componentDidMount() {
		console.log('component did mount')
		firebase.database().ref('messages/').on('value', (snapshot)=> {
				const currentMessages = snapshot.val()

				if(currentMessages != null) {
					this.setState({
						messages:currentMessages
					})
				}
			})

	}

	updateMessage(event) {
		console.log('updateMessage: ' +event.target.value)
		this.setState({
			message: event.target.value
		})
	}

	updateUser(event) {
		console.log('updateUser: ' +event.target.value)
		this.setState({
			name: event.target.value
		})
	}

	submitMessage(event){
		var time = new Date(); // for now
		var hours = time.getHours(); // => 9
		var minutes = time.getMinutes(); // =>  30
		var seconds = time.getSeconds();

		console.log('submitMessage: ' +this.state.message)
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message,
			name: this.state.name,
			timestamp: hours + ':' + minutes + ':' + seconds
		}

		firebase.database().ref('messages/' +nextMessage.id).set(nextMessage)

		// var list = Object.assign([], this.state.messages)
		// list.push(nextMessage)
		// this.setState({
		// 	messages: list
		// })
	}

	render() {
		const currentMessage = this.state.messages.map((message, i) => {
			return (
				<li key={message.id}>
					<strong>{message.name}</strong>
					:{message.text}
					{message.timestamp}
				</li>

			)
		})
		return (
			<div>
				<ol>
					{currentMessage}
				</ol>
				<input onChange={this.updateUser} type="text" placeholder="User"/>
				<br/>
				<input onChange={this.updateMessage} type="text" placeholder="Message"/>
				<br/>
				<button onClick={this.submitMessage}>Submit Message</button>
			</div>
		)
	}
}

export default ChatRoom