var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


var Cluster = Class.create( {
		cCapCount: 0,
		nCapWidth: 0,
		
		nCurCap: 0,
		bInScroll: false,
		bSuppressScrolling: false,
		rgImages: Array(),
		rgImageURLs: {},
		nCapsulesToPreload: 1,
		bUseActiveClass: false,
		
		initialize: function( args )
		{
			this.cCapCount = args.cCapCount;
			this.nCapWidth = args.nCapWidth;

			if ( args.bUseActiveClass ) {
				this.bUseActiveClass = true;
			}

			this.nCapsulesToPreload = args.nCapsulesToPreload || 1;
			
			this.elClusterArea = args.elClusterArea;
			this.elScrollArea = args.elScrollArea || this.elClusterArea.down('.cluster_scroll_area');
			this.elScrollLeftBtn = args.elScrollLeftBtn || this.elClusterArea.down('.cluster_control_left');
			this.elScrollRightBtn = args.elScrollRightBtn  || this.elClusterArea.down('.cluster_control_right');

			if ( !this.elScrollArea.style.left )
				this.elScrollArea.style.left = '0px';

			this.rgImages = args.rgImages || this.elClusterArea.select( 'img.cluster_capsule_image' );
			this.rgImageURLs = args.rgImageURLs || {};
			
			this.elSlider = args.elSlider;
			var elHandle = args.elHandle || this.elSlider.down('.handle');
			
			this.elScrollLeftBtn.observe( 'click', this.scrollLeft.bindAsEventListener( this ) );
			this.elScrollRightBtn.observe( 'click', this.scrollRight.bindAsEventListener( this, false ) );

			this.elClusterArea.observe( 'mouseover', this.mouseOver.bindAsEventListener( this ) );
			this.elClusterArea.observe( 'mouseout', this.mouseOut.bindAsEventListener( this ) );

			// put this in a closure
			var obj = this;
			//Event.observe( window, 'focus', function() { obj.bSuppressScrolling = false; } );
			//Event.observe( window, 'blur', function() { obj.bSuppressScrolling = true; }  );

			this.slider = new Control.Slider( elHandle, this.elSlider, {
		        range: $R(0, this.nCapWidth * this.cCapCount ),
		        sliderValue: 0,
		        onSlide: this.sliderOnSlide.bind( this ),
		        onChange: this.sliderOnChange.bind( this )
	     	});
	     	
	     	Event.observe( window, 'load', this.startTimer.bind( this ) );
		},

		startTimer: function()
		{
			this.clearInterval();
			this.interval = window.setInterval( this.scrollRight.bindAsEventListener( this, true ), 5000 );
		},

		clearInterval: function()
		{
			if ( this.interval )
			{
				window.clearInterval( this.interval );
				this.interval = false;
			}
		},

		mouseOver: function()
		{
			this.clearInterval();

			if ( this.bUseActiveClass )
			{
				var strLeftBtnId = this.elScrollLeftBtn.id;
				var strRightBtnId = this.elScrollRightBtn.id;
				var bInDeadZone = false;

				if ( window.event )
				{
					var ancestors = $( window.event.toElement ).ancestors();

					if ( $( window.event.toElement ).hasClassName( 'main_cap_content' ) )
					{
						bInDeadZone = true;
					}
				}
				else
				{
					var ancestors = [];
				}

				if ( !bInDeadZone && !ancestors.any( function( n ) { return n.id === strLeftBtnId || n.hasClassName( 'main_cap_content' ) } ) )
				{
					this.elScrollRightBtn.addClassName('active');
				}
				else
				{
					this.elScrollRightBtn.removeClassName('active');
				}

				if ( !bInDeadZone && !ancestors.any( function( n ) { return n.id === strRightBtnId || n.hasClassName( 'main_cap_content' ) } ) )
				{
					this.elScrollLeftBtn.addClassName('active');
				}
				else
				{
					this.elScrollLeftBtn.removeClassName('active');
				}
			}
			else
			{
				ShowWithFade( this.elScrollLeftBtn );
				ShowWithFade( this.elScrollRightBtn );
			}


		},

		mouseOut: function( event )
		{
	    	var reltarget = (event.relatedTarget) ? event.relatedTarget : event.toElement;
	    	if ( reltarget && $(reltarget).up( '#' + this.elClusterArea.id ) )
	    		return;

			if ( this.bUseActiveClass )
			{
				this.elScrollLeftBtn.removeClassName('active');
				this.elScrollRightBtn.removeClassName('active');
			}
			else
			{
				HideWithFade( this.elScrollLeftBtn );
				HideWithFade( this.elScrollRightBtn );
			}

    		this.startTimer();
		},
		
		scrollRight: function( event, bAutoScroll )
		{
			if ( this.bSuppressScrolling && bAutoScroll )
				return;
			this.nCurCap++;
			this.bInScroll = true;
			var nDuration = bAutoScroll ? 0.4 : 0.4;
			if ( this.nCurCap <= this.cCapCount )
			{
				if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();
				this.elScrollArea.effect = new Effect.Morph( this.elScrollArea, { style: 'left: -' + (this.nCurCap * this.nCapWidth) + 'px;', duration: nDuration, fps: 60 } );
			}
			else
			{							
				this.nCurCap = 0;
				if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();
				var elScrollArea = this.elScrollArea;
				this.elScrollArea.effect = new Effect.Morph( this.elScrollArea, { style: 'left: -' + ( (this.cCapCount + 1 ) * this.nCapWidth) + 'px;', duration: nDuration, fps: 60, afterFinish: function() { elScrollArea.style.left = '0px'; } } );
			}
			this.slider.setValue( this.nCurCap * this.nCapWidth );
			this.ensureImagesLoaded();
			this.bInScroll = false;
		},
		
		scrollLeft: function()
		{
			this.nCurCap--;
			this.bInScroll = true;
			if ( this.nCurCap >= 0 )
			{
				if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();
				this.elScrollArea.effect = new Effect.Morph( this.elScrollArea, { style: 'left: -' + (this.nCurCap * this.nCapWidth) + 'px;', duration: 0.4 } );
			}
			else
			{							
				this.nCurCap = this.cCapCount;
				if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();
				this.elScrollArea.style.left = '-' + ( ( this.cCapCount + 1 ) * this.nCapWidth ) + 'px';
				this.elScrollArea.effect = new Effect.Morph( this.elScrollArea, { style: 'left: -' + ( this.cCapCount * this.nCapWidth) + 'px;', duration: 0.4 } );
			}
			this.slider.setValue( this.nCurCap * this.nCapWidth );
			this.ensureImagesLoaded();
			this.bInScroll = false;
		},
		
		sliderOnSlide: function( value )
		{
			this.nCurCap = Math.round( value / this.nCapWidth );
			this.ensureImagesLoaded();
			
        	if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();
        	this.elScrollArea.style.left = '-' + Math.round( value ) + 'px';
		},
		
		sliderOnChange: function( value )
		{
			if ( !this.bInScroll )
			{
				this.nCurCap = Math.round( value / this.nCapWidth );
		        var nSnapValue = this.nCurCap * this.nCapWidth;
		        if ( nSnapValue != value )
		        {
		        	this.slider.setValue( nSnapValue );
				}

				var nTravelDist = Math.abs( nSnapValue + parseInt( this.elScrollArea.style.left ) );
				if ( nTravelDist )
				{
					this.ensureImagesLoaded();
		        	this.elScrollArea.effect = new Effect.Morph( this.elScrollArea, {style: 'left: -' + nSnapValue + 'px;', duration: Math.min( 0.8, Math.max( 0.2, nTravelDist / 2500 ) ) } );
		        }
			}
		},

		ensureImagesLoaded: function()
		{
			for ( var i = 0; i <= this.nCurCap + this.nCapsulesToPreload &&  i < this.rgImages.length; i++ )
			{
				var img = this.rgImages[ i ];
				if ( this.rgImageURLs[ img.id ] && img.src != this.rgImageURLs[ img.id ] )
					img.src = this.rgImageURLs[ img.id ];
			}
		}
	} );

var ButtonClusterControl = Class.create({

	nButtons: 0,
	nIndex: 0,
	nCapWidth: 0,

	elContainer: null,
	Parent: null,

	initialize: function( args )
	{
		this.elContainer = args.elContainer;
		this.nCapWidth = args.nCapWidth;
	},

	setValue: function( value )
	{
		value /= this.nCapWidth;
		this.elContainer.childElements().each(function(el, i) {
			if(i == value)
			{
				el.addClassName('active');
			} else {
				el.removeClassName('active');
			}
		});
	},

	getValue: function( )
	{
		this.elContainer.childElements().each(function(el, i) {
			if(el.hasClassName('active'))
				return i;
		});
	}


});

var ButtonCluster = Class.create(Cluster, {

	slider: null,

	initialize: function( args )
	{
		this.cCapCount = args.cCapCount;
		this.nCapWidth = args.nCapWidth;
		this.nCapsulesToPreload = args.nCapsulesToPreload || 1;

		this.elClusterArea = args.elClusterArea;
		this.elScrollArea = args.elScrollArea || this.elClusterArea.down('.cluster_scroll_area');
		this.elScrollLeftBtn = args.elScrollLeftBtn || this.elClusterArea.down('.cluster_control_left');
		this.elScrollRightBtn = args.elScrollRightBtn  || this.elClusterArea.down('.cluster_control_right');

		this.elClusterArea.observe( 'mouseover', this.mouseOver.bindAsEventListener( this ) );
		this.elClusterArea.observe( 'mouseout', this.mouseOut.bindAsEventListener( this ) );

		this.rgImages = args.rgImages || this.elClusterArea.select( 'img.cluster_capsule_image' );
		this.rgImageURLs = args.rgImageURLs || {};

		var elHandle = args.elHandle;

		args.elButtonContainer.childElements().each(
			(function(that) {
				return	(function(el, i) {

					var callback = function(cluster, i)
					{
						return (function(){
							cluster.nCurCap = i;
							cluster.scroll();
						});
					};

					el.observe('click', callback(that, i));
				});
			})(this)
		);


		var obj = this;

		this.slider = new ButtonClusterControl( {
			elContainer: args.elButtonContainer,
			nCapWidth: args.nCapWidth
		});

		Event.observe( window, 'load', this.startTimer.bind( this ) );
	},

	scrollRight: function( event, bAutoScroll )
	{
		this.nCurCap++;
		this.scroll( event, bAutoScroll );
	},

	scrollLeft: function()
	{
		this.nCurCap--;
		this.scroll(null, false);
	},

	scroll: function( event, bAutoScroll )
	{
		if ( this.bSuppressScrolling && bAutoScroll )
			return;

		this.bInScroll = true;
		var nDuration = bAutoScroll ? 0.2 : 0.2;

		if ( this.nCurCap > this.cCapCount )
			this.nCurCap = 0;

		if(this.nCurCap < 0)
			this.nCurCap = this.cCapCount;

		if ( this.elScrollArea.effect ) this.elScrollArea.effect.cancel();

		this.elScrollArea.newPosition = '-' + (this.nCurCap * this.nCapWidth) + 'px';

		this.elScrollArea.effect = new Effect.Fade(
			this.elScrollArea, {
				duration: nDuration,
				fps: 60,
				afterFinish: function( obj ) {
					obj.element.setStyle( { left: obj.element.newPosition } );
					obj.element.effect = new Effect.Appear(
						obj.element, {
							duration: nDuration,
							fps: 60
						}
					);
				}
			}
		);

		this.slider.setValue( this.nCurCap * this.nCapWidth );
		this.ensureImagesLoaded();
		this.bInScroll = false;
		this.startTimer();
	},

	mouseOver: function()
	{
		this.clearInterval();
	},

	mouseOut: function( event )
	{
		var reltarget = (event.relatedTarget) ? event.relatedTarget : event.toElement;
		if ( reltarget && $(reltarget).up( '#' + this.elClusterArea.id ) )
			return;

		this.startTimer();
	}
});




}
/*
     FILE ARCHIVED ON 00:48:46 Jun 01, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:29:28 Nov 21, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 133.024
  exclusion.robots: 0.199
  exclusion.robots.policy: 0.191
  cdx.remote: 0.09
  esindex: 0.009
  LoadShardBlock: 46.272 (3)
  PetaboxLoader3.datanode: 69.35 (5)
  CDXLines.iter: 26.058 (3)
  load_resource: 92.629 (2)
  PetaboxLoader3.resolve: 52.524 (2)
*/