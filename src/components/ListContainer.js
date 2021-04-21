import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import ListItem from './ListItem';
import Footer from '../elements/Footer';
import Labels from '../elements/Labels';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: (window.innerWidth < 481),
			availableHeight: 0,
			scrollTop: 0,
			emoticonsNumber: 0,
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
		this.setState({
			availableHeight: this.list.current.clientHeight,
			emoticonsNumber: this.props.data.length,
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {data, filterText} = this.props;
		const {isMobile, availableHeight, scrollTop} = this.state;

		const filteredData = data.filter(emoticon => {
			return (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
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
			mobileItems.push(<ListItem type="mobile" key={key} data={emoticon} />);
			desktopItems.push(<ListItem type="desktop" key={key} data={emoticon} />);
			index++;
		}

		return (
			<div className="ListContainer"
				data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List"
					onScroll={this.handleScroll}
					scrollableNodeProps={{ref: this.list}}>
					<div className="innerWrapper">
						<Labels />
						<ul data-testid="listUl" style={{
							paddingTop: (startIndex * rowHeight),
							height: totalHeight,
						}}>
							{isMobile ? mobileItems : desktopItems}
						</ul>
						<Footer />
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default ListContainer;
