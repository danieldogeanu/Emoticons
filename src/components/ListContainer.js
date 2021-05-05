import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import {List} from 'react-virtualized';
import {DesktopListItem, MobileListItem} from './ListItem';
import Footer from '../elements/Footer';
import Labels from '../elements/Labels';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: (window.innerWidth < 481),
			filteredData: [],
			emoticonsNumber: 0,
			listWidth: 0,
		}
		this.listInnerWrapperRef = React.createRef();
	}

	handleScroll = (event) => {
		event.target.scrollTop();
	}

	handleResize = () => {
		setTimeout(() => {
			this.setState({isMobile: (window.innerWidth < 481)});
		}, 200);
	}

	filterData = (data, filterText) => data.filter(emoticon => {
		return (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
	});

	rowRenderer = ({index, style}) => {
		const {isMobile, filteredData} = this.state;
		const emoticon = filteredData[index];
		const key = emoticon.codes.split(' ').join('');
		return (isMobile) ?
			<MobileListItem key={key} data={emoticon} style={style} /> :
			<DesktopListItem key={key} data={emoticon} style={style} />;
	}

	componentDidMount() {
		const {data, filterText} = this.props;
		window.addEventListener('resize', this.handleResize);
		this.setState({
			filteredData: this.filterData(data, filterText),
			listWidth: this.listInnerWrapperRef.current.clientWidth,
			emoticonsNumber: data.length,
		});
	}

	componentDidUpdate(prevProps) {
		const prevFilterText = prevProps.filterText;
		const {data, filterText} = this.props;

		if (filterText !== prevFilterText) {
			this.setState({filteredData: this.filterData(data, filterText)});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {isMobile, filteredData, listWidth} = this.state;

		const numRows = filteredData.length;
		const rowHeight = isMobile ? 90 : 50;
		const totalHeight = rowHeight * numRows;

		return (
			<div className="ListContainer" data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List" onScroll={this.handleScroll}>
					<div className="innerWrapper" ref={this.listInnerWrapperRef}>
						<Labels />
						<List data-testid="listUl"
							rowRenderer={this.rowRenderer}
							rowHeight={rowHeight}
							rowCount={numRows}
							overscanRowCount={5}
							width={listWidth}
							height={totalHeight}
						/>
						<Footer />
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default ListContainer;
