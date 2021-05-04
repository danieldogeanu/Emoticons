import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
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
			emoticonsNumber: 0,
			filteredData: [],
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

	filterData = (data, filterText) => data.filter(emoticon => {
		return (emoticon.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
	});

	componentDidMount() {
		const {data, filterText} = this.props;
		window.addEventListener('resize', this.handleResize);
		this.setState({
			emoticonsNumber: data.length,
			filteredData: this.filterData(data, filterText)
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
		const {isMobile, filteredData} = this.state;

		const mobileItems = [];
		const desktopItems = [];

		filteredData.forEach(emoticon => {
			let key = emoticon.codes.split(' ').join('');
			mobileItems.push(<MobileListItem key={key} data={emoticon} />);
			desktopItems.push(<DesktopListItem key={key} data={emoticon} />);
		});

		return (
			<div className="ListContainer"
				data-testid="ListContainer">
				<SimpleBar className="List" data-testid="List"
					onScroll={this.handleScroll}
					scrollableNodeProps={{ref: this.list}}>
					<div className="innerWrapper">
						<Labels />
						<ul data-testid="listUl">
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
