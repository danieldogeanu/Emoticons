import React, { Component, PureComponent } from 'react';
import SimpleBar from 'simplebar-react';
import { FixedSizeList } from 'react-window';
import ListItem from './ListItem';
import Footer from '../elements/Footer';
import Labels from '../elements/Labels';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class DesktopListRow extends PureComponent {
	render() {
		const {index, style, data} = this.props;
		const emoticon = data[index];

		return <ListItem type="desktop" data={emoticon} style={style} />;
	}
}

class MobileListRow extends PureComponent {
	render() {
		const {index, style, data} = this.props;
		const emoticon = data[index];

		return <ListItem type="mobile" data={emoticon} style={style} />;
	}
}

class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: (window.innerWidth < 481),
			emoticonsNumber: 0,
		}
		this.list = React.createRef();
	}

	handleScroll = (event) => {
		event.target.scrollTop();
	}

	handleResize = () => {
		setTimeout(() => {
			this.setState({isMobile: (window.innerWidth < 481)});
		}, 200);
	}

	generateKey = (index, data) => {
		const emoticon = data[index];
		return emoticon.codes.split(' ').join('');
	}

	filterData = (data, filter) => data.filter(emoticon => {
		return (emoticon.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
	});

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.setState({emoticonsNumber: this.props.data.length});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {data, filterText} = this.props;
		const {isMobile} = this.state;

		const filteredData = this.filterData(data, filterText);
		const numRows = filteredData.length;
		const rowHeight = isMobile ? 90 : 50;
		const totalHeight = rowHeight * numRows;

		return (
			<div className="ListContainer"
				data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List"
					onScroll={this.handleScroll}
					scrollableNodeProps={{ref: this.list}}>
					<div className="innerWrapper">
						<Labels />
						<FixedSizeList
							data-testid="listUl"
							innerElementType="ul"
							itemKey={this.generateKey}
							itemData={filteredData}
							itemSize={rowHeight}
							itemCount={numRows}
							height={totalHeight}
							width="100%"
						>
							{isMobile ? MobileListRow : DesktopListRow}
						</FixedSizeList>
						<Footer />
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default ListContainer;
