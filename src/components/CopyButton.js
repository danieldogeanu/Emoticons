import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';
import Icon from '../elements/Icon';
import { animateCSS } from '../animate';
import '../styles/components/CopyButton.scss';

class CopyButton extends Component {
	constructor(props) {
		super(props);
		this.state = {isCopied: false};
		this.copyBtn = React.createRef();
	}

	onSuccess = () => {
		this.setState({isCopied: true});
		this.copyBtn.current.element.classList.add('copied');
		setTimeout(() => {
			this.setState({isCopied: false});
			this.copyBtn.current.element.classList.remove('copied');
		}, 1500);

		this.SelectedScreen.innerHTML = this.props.data;
		animateCSS(this.SelectedScreen, 'fadeInOut');
		this.SelectedScreen.classList.add('show');
		setTimeout(() => {
			this.SelectedScreen.classList.remove('show');
		}, 1000);
	}

	componentDidMount() {
		this.SelectedScreen = document.querySelector('.SelectedScreen');
	}

	render() {
		return (
			<Clipboard
				ref={this.copyBtn}
				onSuccess={this.onSuccess}
				className={'CopyButton ' + this.props.className}
				data-clipboard-text={this.props.data}>
				{this.props.children ? this.props.children : (
					this.state.isCopied ? (<Icon name="check" />) : 'Copy'
				)}
			</Clipboard>
		);
	}
}

export default CopyButton;
