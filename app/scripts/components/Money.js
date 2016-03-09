'use strict';

import React from 'react';

const Money = React.createClass({

	propTypes: {
		exchange: React.PropTypes.object.isRequired
	},


	render: function(){

		return (
			<h1>
				<a className="swap">{this.props.exchange.one} / {this.props.exchange.two}</a>
			</h1>
		);
	}

});

export default Money;