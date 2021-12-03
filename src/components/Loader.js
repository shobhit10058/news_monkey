import React, { Component } from 'react';
import Preloader from "./Preloader.gif"

export class Loader extends Component {
	render() {
		return (
			<div className="text-center">
				<img src={Preloader} alt="loading"/>
			</div>
		)
	}
}

export default Loader
