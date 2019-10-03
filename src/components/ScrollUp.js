import React, { Component } from 'react';
import Icon from './Icon';
import '../styles/components/ScrollUp.scss';

class ScrollUp extends Component {
	constructor() {
		super();
		this.scrollUpBtn = React.createRef();
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
	}

	componentDidMount() {
		this.SimpleBarContentWrapper = document.querySelector('.simplebar-content-wrapper');
		this.SearchBarInputCL = document.querySelector('.SearchBar input[type="text"]').classList;
		this.SimpleBarContentWrapper.addEventListener('scroll', this.handleScroll);
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		this.SimpleBarContentWrapper.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	handleKeyUp(e) {
		if (e.keyCode === 84 && !this.SearchBarInputCL.contains('focused')) { // T
			this.scrollToTop();
		}
	}

	handleScroll() {
		let currentScroll = this.SimpleBarContentWrapper.scrollTop;
		let thisBtn = this.scrollUpBtn.current.classList;
		(currentScroll > 200) ? thisBtn.add('show') : thisBtn.remove('show');
	}

	scrollToTop() {
		let currentScroll = this.SimpleBarContentWrapper.scrollTop;
		if (currentScroll > 0) {
			window.requestAnimationFrame(this.scrollToTop);
			this.SimpleBarContentWrapper.scrollTo(0, currentScroll - (currentScroll/5));
		}
	}

	render() {
		const scrollText = 'Scroll Back Up';
		return (
			<button className="ScrollUp" title={scrollText}
				onClick={() => this.scrollToTop()}
				ref={this.scrollUpBtn}>
				<span className="show-for-screen-reader">{scrollText}</span>
				<Icon name="chevron-up" />
			</button>
		);
	}
}

export default ScrollUp;
