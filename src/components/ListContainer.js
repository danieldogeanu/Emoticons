import React, { Component } from 'react';
import SimpleBar from 'simplebar';
import { MobileListItem, DesktopListItem } from './ListItem';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: (window.innerWidth < 481),
			availableHeight: 0,
			scrollTop: 0,
		}
		this.list = React.createRef();
		this.handleScroll = this.handleScroll.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.setState({availableHeight: this.list.clientHeight});
		new SimpleBar(this.list);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleScroll(event) {
		this.setState({scrollTop: event.target.scrollTop});
	}

	handleResize() {
		setTimeout(() => {
			this.setState({isMobile: (window.innerWidth < 481)});
		}, 200);
	}

	render() {
		const data = this.props.data;
		const isMobile = this.state.isMobile;
		const filterText = this.props.filterText;
		const filteredData = [];

		data.forEach(emoticon => {
			if (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
			filteredData.push(emoticon);
		});

		const numRows = filteredData.length;
		const rowHeight = isMobile ? 90 : 50;
		const totalHeight = rowHeight * numRows;

		const {availableHeight, scrollTop} = this.state;
		const scrollBottom = scrollTop + availableHeight;

		const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 40);
		const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 40);

		const mobileItems = [];
		const desktopItems = [];

		let index = startIndex;
		while (index < endIndex) {
			let emoticon = filteredData[index];
			mobileItems.push(<MobileListItem key={emoticon.no} data={emoticon} />);
			desktopItems.push(<DesktopListItem key={emoticon.no} data={emoticon} />);
			index++;
		}

		return (
			<div className="ListContainer">
				<div className="List"
					onScroll={this.handleScroll}
					ref={list => this.list = list}>
					<div className="innerWrapper">
						<ul style={{
							paddingTop: (startIndex * rowHeight),
							height: totalHeight,
						}}>
							{isMobile ? mobileItems : desktopItems}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ListContainer;