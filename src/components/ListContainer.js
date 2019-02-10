import React, { Component } from 'react';
import SimpleBar from 'simplebar';
import { MobileListItem, DesktopListItem } from './ListItem';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableHeight: 0,
			scrollTop: 0,
		}
		this.list = React.createRef();
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.setState({availableHeight: this.list.clientHeight});
		new SimpleBar(this.list);
	}

	handleScroll(event) {
		this.setState({scrollTop: event.target.scrollTop});
	}

	render() {
		const data = this.props.data;
		const filterText = this.props.filterText;
		const filteredData = [];

		data.forEach(emoticon => {
			if (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
			filteredData.push(emoticon);
		});

		const numRows = filteredData.length;
		const rowHeight = 50; // TODO: Find a way to calculate rowHeight dynamically.
		const totalHeight = rowHeight * numRows;

		const {availableHeight, scrollTop} = this.state;
		const scrollBottom = scrollTop + availableHeight;

		const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 40);
		const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 40);

		const items = [];
		const mobileItems = [];
		const desktopItems = [];

		let index = startIndex;
		while (index < endIndex) {
			mobileItems.push(<MobileListItem key={index} data={filteredData[index]} />);
			desktopItems.push(<DesktopListItem key={index} data={filteredData[index]} />);
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
							{desktopItems}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ListContainer;