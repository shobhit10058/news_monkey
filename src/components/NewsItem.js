import React, { Component } from 'react'

export class NewsItem extends Component {
	render() {
		let {title, desc, imgUrl, newsUrl, source, author, publishedAt} = this.props;
		return (
			<div className="card my-2">
				{imgUrl && <img src={imgUrl} className="card-img-top" alt={title}/>}	
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{desc}</p>
					<p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(publishedAt).toUTCString()}</small></p>
					<a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read more</a>
				</div>
				<span className="position-absolute top-0 start-100 badge rounded-pill bg-danger" style={{"zIndex": "1", "transform": "translate(-100%, -50%)"}}>
					{source}
				</span>
			</div>
		)
	}
}

export default NewsItem
