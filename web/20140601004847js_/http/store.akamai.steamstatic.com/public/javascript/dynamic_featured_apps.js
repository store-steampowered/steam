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


var gFeaturedApps = {};
var gLargeCapApps = {};
var gLargeCapImgURLs = {};

var gDynamicLargeCapApps = [];
var gDynamicLargeCapAppURLs = {};
var gDynamicFeaturedApps = {};
var gDynamicUpdatedApps = [];

var gNumDynamicMainCapApps = 0;

function ReplaceDynamicMainCapsule()
{
		var mainCapsule = $J( "#main_cluster_scroll" );
	var children = mainCapsule.children( 'a' );
	if ( gDynamicLargeCapApps.length > 0 )
	{
		var prevChild = children.length > 0 ? $J( children[0] ) : null;
		for ( var i = 0; i < gDynamicLargeCapApps.length; ++i )
		{
			var appid = gDynamicLargeCapApps[i];
			if( gLargeCapApps[appid] === true )
			{
				continue;
			}
			++gNumDynamicMainCapApps;

			gLargeCapApps[appid] = true;
			var dynamicApp = $J( "#main_cluster_dynamic_app_" + appid );
			if ( prevChild )
			{
				prevChild.after( dynamicApp );
				prevChild = dynamicApp;
			}
			else
			{
								prevChild = dynamicApp;
				mainCapsule.append( dynamicApp );
				var lastDynamicApp = dynamicApp.clone();
				lastDynamicApp.attr( "id", "main_cluster_cap_last" );
				mainCapsule.append( lastDynamicApp );
			}
		}

		$J.extend( gLargeCapImgURLs, gDynamicLargeCapAppURLs );

				$J( "#dynamic_main_capsule" ).remove();

				children = mainCapsule.children( 'a' );
		var idx = 0;
		for ( var i = 0; i < children.length; ++i )
		{
			var child = $J( children[i] );
			if ( child.attr( "id" ) != "main_cluster_cap_last" )
			{
				child.attr( "id", "main_cluster_cap_" + idx );
				++idx;
			}
		}

				$J( "#main_cluster_scroll").width( ( ( 616 + 4 ) * ( idx + 1 ) ) + 'px' );
	}
}

function ReplaceDynamicFeaturedApps( platform )
{
	var count = 0;
	var dynamicItems = gDynamicFeaturedApps[platform];
	if ( typeof dynamicItems == 'undefined' )
	{
		return;
	}

	for ( var i = 0; i < dynamicItems.length; ++i )
	{
		var appid = dynamicItems[i];
		if ( gFeaturedApps[platform][appid] !== true &&
		     gLargeCapApps[appid] !== true )
		{
			var originalID = '#small_cap_' + platform + '_' + count;
			var dynamicID = '#small_cap_dynamic_' + platform + '_' + count;
			$J( '#small_cap_' + platform + '_' + count ).replaceWith( $J( dynamicID ) );
			$J( dynamicID ).attr( "id", originalID );
		}
		++count;
	}
	$J( "#dynamic_featured_apps_" + platform ).remove();
}

function ReplaceDynamicUpdatedApps()
{
	// remove any dupes from the fallback
	for ( var i = 0; i < gDynamicUpdatedApps.length; ++i )
	{
		var appid = gDynamicUpdatedApps[i];
		$J( "#featured_updated_app_" + appid ).remove();
	}

	var numDynamicUpdatedApps = gDynamicUpdatedApps.length;
	var container = $J( "#updated_apps_container" );
	while ( container.children().length > 0 &&
		    ( container.children().length + numDynamicUpdatedApps ) > 3 )
	{
		var children = container.children();
		var firstChild = children[0];
		firstChild.remove();
	}

	// copy over dynamic apps
	var dynamicApps = $J( "#dynamic_updated_apps" );
	dynamicApps.children().each( function() { container.append( this ); } );
	$J( "#dynamic_updated_apps" ).remove();

	if ( container.children().length > 0 )
	{
		$J( "#dynamic_updated_apps").show();
		$J( "#updated_apps_block" ).show();
		$J( "#updated_apps_container" ).append( '<div style="clear: left"></div>' );
	}
}

}
/*
     FILE ARCHIVED ON 00:48:47 Jun 01, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:29:30 Nov 21, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 84.596
  exclusion.robots: 0.404
  exclusion.robots.policy: 0.385
  RedisCDXSource: 14.186
  esindex: 0.009
  LoadShardBlock: 41.424 (3)
  PetaboxLoader3.datanode: 62.244 (5)
  CDXLines.iter: 23.674 (3)
  load_resource: 165.465 (2)
  PetaboxLoader3.resolve: 64.26 (2)
*/