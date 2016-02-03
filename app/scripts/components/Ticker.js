'use strict';

import React from 'react';
import MakeTicker from '../utils/ticker';




const Ticker = React.createClass({

	getDefaultProps: function(){
		return {
			message: 'Rates based on daily data from the European Central BankⓇ.'
		}
	},

	componentDidMount: function(){

		let ticker = new MakeTicker(5000, '.ticker-outer-container');
	},

	render: function(){
		return (
			<div className="footer-ticker">
				<div className="ticker-outer-container">
					<p>European Central BankⓇ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
				</div>
			</div>
		);
	}

});



export default Ticker;