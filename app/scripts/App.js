// -------------------------------------------------
//
// Main App
// 
// -------------------------------------------------
'use strict';

import React from 'react';
import request from 'browser-request';
import Time from './components/Time';
import Money from './components/Money';
import Backgrounds from './components/Backgrounds';
import Ticker from './components/Ticker';
import Sound from './components/Sound';

const App = React.createClass({

	_flag: 0,

	getInitialState: function(){
		return {
			exchange: {
				one: '~',
				two: '~'
			},
			rates: {},
			currency: 'USD'
		}
	},
	// ------------------------------------------------
	// Bring in API
	//
	
	componentDidMount: function(){
		const self = this;

		request({
			type: 'GET',
			url: 'http://api.fixer.io/latest?base=' + self.state.currency,
			json: true
		}, function(err, res, body){
			if (err){
				console.warn(err);
				throw new Err(err);
			}

			else{
				const data = 
				self.setState({
					exchange: {
						one: '$1',
						two: '€' + body.rates.EUR.toFixed(4)
					},
					rates: body
				});

				console.log(self.state);
			}
		});

	},


	_swap: function(){
		
		if (this._flag === 0){
			
			const amount = (1 / this.state.rates.rates.EUR).toFixed(4);

			this.setState({
				exchange: {
					one: '€1',
					two: '$' + amount.toString(),
					rates: this.state.rates.rates
				}
			});
			this._flag = 1;
		}

		else{

			const amount = this.state.rates.rates.EUR.toFixed(4);

			this.setState({
				exchange: {
					one: '$1',
					two: '€' + amount.toString(),
					rates: this.state.rates.rates
				}
			});
			this._flag = 0;
		}

	},

	render: function(){


		return (
			<section className="dollaz-container" onClick={this._swap}>
				<Backgrounds />
				<Time />
				<Sound />
				<Money
					exchange={this.state.exchange}
				/>
				<Ticker />
				
			</section>
		);
	}

});

export default App;