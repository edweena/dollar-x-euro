'use strict';

import React from 'react';
import moment from 'moment';

const Time = React.createClass({

	getInitialState: function(){
		return {
			time: ''
		}
	},

	_timer: null,

	
	_updateTime: function(){
		let self = this;
		const timeFormat = 'MMM DD, YYYY / hh:mm:ss A';

		function updateTime(){
			let time = moment().format(timeFormat);
			
			self.setState({
				time: time
			});
		}
		

		this._timer = setInterval(function(){
			
			updateTime();

		}, 1000);



	},

	componentWillUnmount: function(){

		clearInterval(this._timer);

	},

	componentDidMount: function(){

		//get time
		this._updateTime();

	},

	render: function(){
		return (
			<div className="time">
				<p>
					<span className="current-time">{this.state.time}</span>
				</p>
			</div>
		);
	}

});

export default Time;