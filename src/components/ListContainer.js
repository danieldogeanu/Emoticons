import React, { Component } from 'react';
import SimpleBar from 'simplebar';
import Footer from './Footer';
import { MobileListItem, DesktopListItem } from './ListItem';
import Label from '../elements/Label';

import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

function Labels() {
	const labels = [
		{ class: 'face', name: 'Face' },
		{ class: 'name', name: 'Emoticon Name' },
		{ class: 'copy', name: 'Get' },
	];
	return (
		<div className="Labels">
			{labels.map(label => {
				return <Label key={label.class} label={label} />
			})}
		</div>
	);
}

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: (window.innerWidth < 481),
			availableHeight: 0,
			scrollTop: 0,
		}
		this.list = React.createRef();
	}

	handleScroll = (event) => {
		this.setState({scrollTop: event.target.scrollTop});
	}

	handleResize = () => {
		setTimeout(() => {
			this.setState({isMobile: (window.innerWidth < 481)});
		}, 200);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.setState({availableHeight: this.list.clientHeight});
		new SimpleBar(this.list);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {data, filterText} = this.props;
		const {isMobile, availableHeight, scrollTop} = this.state;
		const filteredData = [];

		data.forEach(emoticon => {
			if (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
			filteredData.push(emoticon);
		});

		const numRows = filteredData.length;
		const rowHeight = isMobile ? 90 : 50;
		const totalHeight = rowHeight * numRows;

		const scrollBottom = scrollTop + availableHeight;

		const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 40);
		const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 40);

		const mobileItems = [];
		const desktopItems = [];

		let index = startIndex;
		while (index < endIndex) {
			let emoticon = filteredData[index];
			let key = emoticon.codes.split(' ').join('');
			mobileItems.push(<MobileListItem key={key} data={emoticon} />);
			desktopItems.push(<DesktopListItem key={key} data={emoticon} />);
			index++;
		}

		return (
			<div className="ListContainer">
				<div className="List"
					onScroll={this.handleScroll}
					ref={list => this.list = list}>
					<div className="innerWrapper">
						<Labels />
						<ul style={{
							paddingTop: (startIndex * rowHeight),
							height: totalHeight,
						}}>
							{isMobile ? mobileItems : desktopItems}
						</ul>
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}

export default ListContainer;
