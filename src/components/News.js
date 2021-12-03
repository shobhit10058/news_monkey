import React, { Component } from 'react';
import Newsitem from './NewsItem';
import PropTypes from 'prop-types';
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

export class News extends Component {

	static defaultProps = {
		country: "in",
		pageSize: 8,
		category: "general"
	}

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string
	}

	constructor() {
		super();
		this.state = {
			articles: [],
			page: 1,
			totResults: 0,
			loading: true
		}
	}

	requestData = async () => {
		this.props.setprogress(10);
		let { country, category, api_key, pageSize } = this.props;
		// console.log(this.state.page, api_key);
		this.setState({ loading: true });
		let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}&page=${this.state.page}&pageSize=${pageSize}`;
		let data = await fetch(url);
		this.props.setprogress(40);
		let parsedData = await data.json();
		this.props.setprogress(70);
		// console.log(parsedData);
		this.setState({ articles: parsedData.articles, loading: false, totResults: parsedData.totalResults, page: this.state.page });
		this.props.setprogress(100);
	}

	async componentDidMount() {
		document.title = `NewsMonkey - ${this.props.category}`;
		await this.requestData();
	}

	handlePrevClick = async () => {
		await this.setState({ page: this.state.page - 1 });
		await this.requestData();
	}

	handleNextClick = async () => {
		await this.setState({ page: this.state.page + 1 });
		await this.requestData();
	}

	fetchMoreData = async () => {
		this.props.setprogress(10);
		await this.setState({ page: this.state.page + 1 });
		// console.log(this.state.page);
		let { country, category, api_key, pageSize } = this.props;
		let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}&page=${this.state.page}&pageSize=${pageSize}`;
		let data = await fetch(url);
		this.props.setprogress(30);
		let parsedData = await data.json();
		this.props.setprogress(60);
		// console.log(parsedData);
		this.setState({ articles: this.state.articles.concat(parsedData.articles), loading: false, totResults: parsedData.totalResults, page: this.state.page});
		this.props.setprogress(100);
	}

	render() {
		return (
			<>
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length < this.state.totResults}
					loader={<Loader/>}
				>
					<div className="container my-3">
						<h2 className="text-center" style={{"margin-top": "66px"}}>Top {this.props.category} Headlines</h2>
						{this.state.loading && <Loader/>}
						<div className="row">
							{this.state.articles.map((element) => {
								return <div className="col-md-4" key={element.url}>
									<Newsitem title={element.title} desc={element.description} imgUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} publishedAt={element.publishedAt}/>
								</div>
							})}
						</div>
						{/* <div className="d-flex justify-content-between my-3">
						<button disabled={this.state.page === 1} type="button" onClick={this.handlePrevClick} class="btn btn-dark">Previous</button>
						<button disabled={this.state.page === Math.ceil(this.state.totResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} class="btn btn-dark">Next</button>
					</div> */}
					</div>
				</InfiniteScroll>
			</>

		)
	}
}

export default News
