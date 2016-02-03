'use strict';


// ------------------------------------------------
// Required
//

window.jQuery = window.$ = require('jquery');
require('velocity-animate');




// ------------------------------------------------
// Ticker Class
//

class Ticker {
	
	constructor(speed, el){
		this.speed = speed || 1;
		this.el = $(el);
		this.container = $(el);
		this.content = $(el).children().first();
		this.contentW = 0;

		this.init();

	}


	// ------------------------------------------------
	// Measures length of content
	//
	
	measure(){

		this.contentW = this.content.width() + (parseInt(this.content.css('margin-right')) || 0);


		let wrapper = $('<div></div>');

		wrapper.css({
			'display': 'inline-block'
		});
		wrapper.width(this.contentW);
		wrapper.append(this.content);



		this.content = wrapper;
	}



	// ------------------------------------------------
	// Clones content if need be to fill width
	//
	
	fill(){
		let self = this;
		let repeats = 1;
		let width = window.innerWidth;

		while(repeats * this.contentW < width + (this.contentW * 2)){
			let clone = self.content.clone();

			self.container.append(clone);
			repeats++;
		}
	}

	// ------------------------------------------------
	// Runs infinite animation, on complete, animation starts over
	//
	
	animate(){
		
		let self = this;
		this.container.velocity({
			translateX: 0,
			translateZ: '0px'
		},
		{duration: 0}
		);


		this.container.velocity({
			translateX: '-' + this.contentW + 'px',
			translateZ: '0px'
		}, {
			duration: self.speed,
			easing: 'linear',
			complete: function(){
				self.animate();
			}
		});
	}



	init(){
		let self = this;
		this.measure();
		this.content.detach();
		this.el.append(this.container);
		this.fill();
		this.animate();

		window.addEventListener('resize', self.resize, false);
	}
}




module.exports = Ticker;