'use strict';

import React from 'react';
import {Howl, Howler} from 'howler';
import classNames from 'classnames';

const Audio = React.createClass({

	getInitialState: function(){
		return {
			sound: null,
			playing: false
		}
	},


	_toggleSound: function(){

		if (this.state.playing){
			this.state.sound.pause();
		}
		else{
			this.state.sound.play();
		}

	},

	componentDidMount: function(){
		const self = this;
		
		const sound = new Howl({
			urls: ['audio/money.mp3'],
			loop: true,
			autoplay: true,
			onplay: function(){

				self.setState({
					sound: sound,
					playing: true
				});
			},
			onpause: function(){
				self.setState({
					playing: false
				});
			}
		});

	},

	render: function(){
		const self = this;
		
		let cx = classNames({
			'sound-on': self.state.playing,
			'sound-off': !self.state.playing
		});


		return (
			<div className="sound-container">
				<span className={cx} onClick={this._toggleSound}></span>
			</div>
		);
	}

});

export default Audio;