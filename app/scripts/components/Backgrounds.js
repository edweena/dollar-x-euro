'use strict';

import React from 'react';
import async from 'async';
import classNames from 'classnames';

const Backgrounds = React.createClass({

	_timer: null,
	_interval: 9000,

	_backgrounds: [
		'cartoon1',
		'counting',
		'beyonce',
		'spread',
		'count',
		'simpsons',
		'box',
		'drop',
		'minaj',
		'celebration',
		'machine2',
		'wolf',
		'kid',
		'bands',
		'jewels',
		'juelz',
		'machine',
		'minaj2',
		'meek',
		'money',
		'screen',
		'tupac',
		'euro-rain',
		'tiara',
		'riff',
		'kim',
		'euro-cartoon'
    ],

	getInitialState: function(){
		return {
			swapStarted: false,
			index: Math.floor(Math.random() * this._backgrounds.length),
			loadedImages: []
		}
	},

	_changeImage: function(){

		const self = this;
		
		if (this.state.swapStarted){
			return null;
		}
		else{

			this._timer = setInterval(function(){
				
				let newIndex = self.state.index + 1;

				if (newIndex >= self.state.loadedImages.length - 1){
					newIndex = 0;
				}
				
				self.setState({
					index: newIndex,
					swapStarted: true
				});

			}, self._interval);

		}
	},


	_loadImages: function(){

		const self = this;
		let loadedImages = [];

		async.each(this._backgrounds, function(img, callback){

			let image = new Image();

			image.onload = function(){
				
				loadedImages.push(img);

				self.setState({
					loadedImages: loadedImages
				});

				if (self.state.loadedImages.length === 1){
					self._changeImage();
				}

				callback();
			};

			image.src = 'images/' + img + '.gif';

		},
		function(err){
			if (err){
				console.log('An image failed to load');
			}
		})

	},

	componentDidMount: function(){

		// ------------------------------------------------
		// Load Images
		//
		this._loadImages();
		
	},



	render: function(){
		const self = this;
		let style = {
			background: 'url("images/' + self.state.loadedImages[this.state.index] + '.gif") no-repeat center center'
		};

		return (
			<div className='background-container' style={style}></div>
		);
	}

});

export default Backgrounds;