import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';
import Icon from './Icon';
import './CopyButton.scss';
import { animateCSS } from '../animate';

class CopyButton extends Component {
	constructor(props) {
		super(props);
		this.state = {isCopied: false};
		this.onSuccess = this.onSuccess.bind(this);
		this.copyBtn = React.createRef();
	}

	componentDidMount() {
		this.selectedScreen = document.querySelector('.SelectedScreen');
	}

	onSuccess() {
		this.setState({isCopied: true});
		this.copyBtn.current.element.classList.add('copied');
		setTimeout(() => {
			this.setState({isCopied: false});
			this.copyBtn.current.element.classList.remove('copied');
		}, 1500);

		this.selectedScreen.innerHTML = this.props.emoticon;
		animateCSS(this.selectedScreen, 'fadeIn');
		this.selectedScreen.classList.add('show');
		setTimeout(() => {
			this.selectedScreen.classList.remove('show');
		}, 1500);
	}

	render() {
		return (
			<Clipboard
				ref={this.copyBtn}
				className="CopyButton"
				onSuccess={this.onSuccess}
				data-clipboard-text={this.props.emoticon}>
				{this.state.isCopied ? (
					<Icon name="check" />
				) : 'Copy'}
			</Clipboard>
		);
	}
}

export default CopyButton;