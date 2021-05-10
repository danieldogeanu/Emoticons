import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import {List} from 'react-virtualized';
import {DesktopListItem, MobileListItem} from './ListItem';
import Footer from '../elements/Footer';
import Labels from '../elements/Labels';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

// FIXME: Fix list width problem on tablet sizes.
// TODO: Optimize data loading and rendering.

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emoticonsNumber: 0,
			filteredData: [],
			filteredRows: 0,
			isMobile: false,
			listWidth: 0,
			rowHeight: 0,
		}
		this.listInnerWrapperRef = React.createRef();
	}

	getMobileState = () => {
		return (window.innerWidth < 481);
	}

	getPadding = () => {
		let padding;
		if (window.innerWidth < 301) padding = 20;
		if (window.innerWidth < 481) padding = 40;
		if (window.innerWidth >= 481) padding = 0;
		return padding;
	}

	getListWidth = () => {
		return (this.listInnerWrapperRef.current.offsetWidth - this.getPadding());
	}

	getRowHeight = () => {
		return this.state.isMobile ? 90 : 50;
	}

	handleScroll = (event) => {
		event.target.scrollTop();
	}

	handleResize = () => {
		setTimeout(() => {
			this.setState({
				isMobile: this.getMobileState(),
				listWidth: this.getListWidth(),
				rowHeight: this.getRowHeight(),
			});
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
		const currFilteredData = this.filterData(data, filterText);
		this.setState({
			emoticonsNumber: data.length,
			filteredData: currFilteredData,
			filteredRows: currFilteredData.length,
			isMobile: this.getMobileState(),
			listWidth: this.getListWidth(),
			rowHeight: this.getRowHeight(),
		});
	}

	componentDidUpdate(prevProps) {
		const prevFilterText = prevProps.filterText;
		const {data, filterText} = this.props;

		if (filterText !== prevFilterText) {
			const currFilteredData = this.filterData(data, filterText);
			this.setState({
				filteredData: currFilteredData,
				filteredRows: currFilteredData.length,
				isMobile: this.getMobileState(),
				listWidth: this.getListWidth(),
				rowHeight: this.getRowHeight(),
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {filteredRows, listWidth, rowHeight} = this.state;
		const totalHeight = rowHeight * filteredRows;

		return (
			<div className="ListContainer" data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List" onScroll={this.handleScroll}>
					<div className="innerWrapper" ref={this.listInnerWrapperRef}>
						<Labels />
						<List data-testid="listUl"
							rowRenderer={this.rowRenderer}
							rowHeight={rowHeight}
							rowCount={filteredRows}
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
