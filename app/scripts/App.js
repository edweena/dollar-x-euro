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
				two: '~',
				usd: 1.00,
				eur: 1.00
			},
			rates: {},
			currency: 'USD'
		}
	},
	// ------------------------------------------------
	// Bring in API
	//
	
	componentDidMount: function(){

		console.log(' R D S . Z o n e ');
		const self = this;

		request({
			type: 'GET',
			url: 'http://www.apilayer.net/api/live?access_key=d537bc8370bc38ee7109e2c7670449fd&format=1&currencies=EUR',
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
						two: '€' + body.quotes.USDEUR.toFixed(4)
					},
					USD: 1,
					EUR: body.quotes.USDEUR.toFixed(4)
				});

			}
		});

	},


	_swap: function(){
		
		if (this._flag === 0){
			
			const amount = (1 / this.state.EUR).toFixed(4);

			this.setState({
				exchange: {
					one: '€1',
					two: '$' + amount.toString()
				}
			});
			this._flag = 1;
		}

		else{

			const amount = this.state.EUR;

			this.setState({
				exchange: {
					one: '$1',
					two: '€' + amount.toString()
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