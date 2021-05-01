import React, { Component, PureComponent } from 'react';
import SimpleBar from 'simplebar-react';
import { FixedSizeList } from 'react-window';
import { DesktopListItem, MobileListItem } from './ListItem';
import Footer from '../elements/Footer';
import Labels from '../elements/Labels';
import '../styles/components/ListContainer.scss';
import 'simplebar/dist/simplebar.min.css';

class ListRow extends PureComponent {
	render() {
		const {index, data} = this.props;
		const ListItem = data[index];

		return ListItem;
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
		this.mobileItems = [];
		this.desktopItems = [];
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
		const emoticon = data[index].props.data;
		return emoticon.codes.split(' ').join('');
	}

	filterData = (components, filter) => components.filter(component => {
		const emoticonName = component.props.data.name;
		return (emoticonName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
	});

	componentDidMount() {
		const emoticons = this.props.data;
		window.addEventListener('resize', this.handleResize);
		this.setState({emoticonsNumber: emoticons.length});

		emoticons.forEach(emoticon => {
			this.mobileItems.push(<MobileListItem data={emoticon} />);
			this.desktopItems.push(<DesktopListItem data={emoticon} />);
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {filterText} = this.props;
		const {isMobile} = this.state;

		const filteredMobileData = this.filterData(this.mobileItems, filterText);
		const filteredDesktopData = this.filterData(this.desktopItems, filterText);
		const filteredData = isMobile ? filteredMobileData : filteredDesktopData;
		const numRows = isMobile ? filteredMobileData.length : filteredDesktopData.length;
		const rowHeight = isMobile ? 90 : 50;
		const totalHeight = rowHeight * numRows;

		return (
			<div className="ListContainer" data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List"
					onScroll={this.handleScroll} scrollableNodeProps={{ref: this.list}}>
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
							width="100%">
							{ListRow}
						</FixedSizeList>
						<Footer />
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default ListContainer;
