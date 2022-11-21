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

function popup( url, x, y, s, r ) 
{
	day = new Date();
	id = day.getTime();
	window.open(url, id, 'scrollbars=' + s + 'resizable=' + r + ',width=' + x + ',height=' + y);
}

function popup_id( url, x, y, id, s, r ) 
{
	day = new Date();
	window.open(url, id, 'scrollbars=' + s + 'resizable=' + r + ',width=' + x + ',height=' + y);
}

function HiLiteRow( id, color )
{
	document.getElementById(id).bgColor = color;
}

function clearSelect( select_id )
{
	var selected = document.getElementById( select_id );
	selected.selectedIndex = -1;
}

function getBestAvailNavData()
{
    var navData = jQuery.data( document, 'x_oldref' );
    if ( navData === undefined )
    {
        // try to get what we need from the URL !

        var rg = window.location.href.match( /[\?&]snr=([^\?&]*)($|&)/ );
        if ( rg )
        {
            navData = rg[1];
        }
    }
    return  navData;
}

// Function to add a package to a cart, assumes form setup on the page
function addToCart( subid, dedupe )
{
    try
    {
        // Find all of the add to cart buttons displayed on the page
        var filterAllButtons='a.btn_addtocart_content';
        // the filterString can be used to find the element that invoked us, since the subid appears within it
        // note that href*= specifies that href contains the string
        var filterString = 'a[href*=' + subid + ']';
        // within the set of all buttons, get the index of the one that we are dealing with!
        // To do that, we find the anchor that invoked us within the larger set of add to cart buttons!
        var allButtons = jQuery( filterAllButtons );
        // do we have anything to examine?
        if ( allButtons.length > 0 )
        {

            var navData = getBestAvailNavData();
            var button;
            var buttonOffset = { top : 0, left : 0 };
            var buttonIndex = allButtons.index( jQuery( filterString ) );
            //
            //  Subscription pages have ambiguous add to cart buttons - we will try to 'dedupe' it !
            //
            if ( buttonIndex === -1 )
            {
                if ( dedupe !== undefined )
                {
                    buttonIndex = dedupe;
                }
                else
                {
                    //  There is a chance this we're mistaken if the .php generation of the page
                    //  didn't generate the addToCart() calls as we expect !
                    buttonIndex = 0;
                }
            }
                        button = allButtons.eq(buttonIndex);

            //
            //  If we are certain we know what button was clicked, then we'll provide info on the form!
            //
            if ( button != null &&  button.length === 1 && typeof button.offset == 'function' )
            {
                buttonOffset = button.offset();
                var height = jQuery(window).height();
                var width = jQuery(window).width();
                //
                //  We have all the components we want the standard button to submit to the server!
                //  we will now add input fields to the form we intend to submit.
                //
                var filterStringForm = 'form[name=add_to_cart_'+subid+']';
                var formSelector = jQuery( filterStringForm );
                var begintime = jQuery.data(document, 'x_readytime');
                var selecttime = 0.0;
                if ( begintime !== undefined )
                {
                    selecttime = new Date().getTime() - begintime;
                }
                if ( formSelector.length === 1 )
                {
                    //  We include the 'hidden' attribute at this point, because of a believe compatibility issue with Internet Explorer!
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_selection', 'value' : buttonIndex } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_choices', 'value' : allButtons.length } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_top', 'value' : buttonOffset.top } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_left', 'value' : buttonOffset.left } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_height', 'value' : height } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_width', 'value' : width } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_select_time', 'value' : selecttime } ).appendTo( formSelector );
                    if ( navData )
                    {
                        var pipeSplit = new RegExp( /\|/ );
                        var resultString = navData.split( pipeSplit )[0];
                        jQuery( '<input type="hidden">' ).attr( { name: 'x_oldnav', 'value' : resultString } ).appendTo( formSelector );
                    }
                }
            }
        }
    }
    catch( e )
    {
        //console.log( e );
            }
    // Regardless of instrumentation failures, try to submit the form for the user.
    try
    {
        document.forms['add_to_cart_'+subid].submit();
    }
    catch( e )
    {
        // swallow exceptions !
    }

}

function addAllDlcToCart()
{
    try
    {
        // Find all of the add to cart buttons displayed on the page
        var filterAllButtons='a.btn_addtocart_content';
        // the filterString can be used to find the element that invoked us, since the subid appears within it
        // note that href*= specifies that href contains the string
        var filterString = 'a[href*=addAllDlcToCart]';
        // within the set of all buttons, get the index of the one that we are dealing with!
        // To do that, we find the anchor that invoked us within the larger set of add to cart buttons!
        var allButtons = jQuery( filterAllButtons );
        // do we have anything to examine?
        if ( allButtons.length > 0 )
        {

            var navData = getBestAvailNavData();
            var button = null;
            var buttonOffset = { top : 0, left : 0 };
            var buttonIndex = allButtons.index( jQuery( filterString ) );
            if ( buttonIndex !== -1 )
            {
                button = allButtons.eq(buttonIndex);
            }
            //
            //  If we are certain we know what button was clicked, then we'll provide info on the form!
            //
            if ( button != null &&  button.length === 1 && typeof button.offset == 'function' )
            {
                buttonOffset = button.offset();
                var height = jQuery(window).height();
                var width = jQuery(window).width();
                //
                //  We have all the components we want the standard button to submit to the server!
                //  we will now add input fields to the form we intend to submit.
                //
                var filterStringForm = 'form[name=add_all_dlc_to_cart]';
                var formSelector = jQuery( filterStringForm );
                var begintime = jQuery.data(document, 'x_readytime');
                var selecttime = 0.0;
                if ( begintime !== undefined )
                {
                    selecttime = new Date().getTime() - begintime;
                }
                if ( formSelector.length === 1 )
                {
                    //  We include the 'hidden' attribute at this point, because of a believe compatibility issue with Internet Explorer!
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_selection', 'value' : buttonIndex } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_choices', 'value' : allButtons.length } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_top', 'value' : buttonOffset.top } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_left', 'value' : buttonOffset.left } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_height', 'value' : height } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_width', 'value' : width } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_select_time', 'value' : selecttime } ).appendTo( formSelector );
                    if ( navData )
                    {
                        var pipeSplit = new RegExp( /\|/ );
                        var resultString = navData.split( pipeSplit )[0];
                        jQuery( '<input type="hidden">' ).attr( { name: 'x_oldnav', 'value' : resultString } ).appendTo( formSelector );
                    }
                }
            }
        }
    }
    catch( e )
    {
        //console.log( e );
            }

	try
	{
		document.forms['add_all_dlc_to_cart'].submit();
	}
	catch( e )
	{
	}
}

function removeFromCart( gid )
{
	try
	{
        // Find all of the add to cart buttons displayed on the page
        var filterAllButtons='a.remove_link';
        // the filterString can be used to find the element that invoked us, since the subid appears within it
        // note that href*= specifies that href contains the string
        var filterString = 'a[href*=' + gid + ']';
        // within the set of all buttons, get the index of the one that we are dealing with!
        // To do that, we find the anchor that invoked us within the larger set of add to cart buttons!
        var allButtons = jQuery( filterAllButtons );
        // do we have anything to examine?

        // do we have anything to examine?
        if ( allButtons.length > 0 )
        {
            var navData = getBestAvailNavData();
            var buttonIndex = allButtons.index( jQuery( filterString ) );
            //
            var button = allButtons.filter( jQuery( filterString ) );
            var buttonOffset = { top : 0, left : 0 };
            if ( button != null &&  button.length === 1 && typeof button.offset == 'function' )
            {
                buttonOffset = button.offset();
                var height = jQuery(window).height();
                var width = jQuery(window).width();
                //
                //  We have all the components we want the standard button to submit to the server!
                //  we will now add input fields to the form we intend to submit.
                //
                var filterStringForm = 'form[name=remove_line_item]';
                var formSelector = jQuery( filterStringForm );
                var begintime = jQuery.data(document, 'x_readytime');
                var selecttime = 0.0;
                if ( begintime !== undefined )
                {
                    selecttime = new Date().getTime() - begintime;
                }
                if ( formSelector.length === 1 )
                {
                    //  We include the 'hidden' attribute at this point, because of a believe compatibility issue with Internet Explorer!
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_selection', 'value' : buttonIndex } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_choices', 'value' : allButtons.length } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_top', 'value' : buttonOffset.top } ).appendTo( formSelector  );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_left', 'value' : buttonOffset.left } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_height', 'value' : height } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_window_width', 'value' : width } ).appendTo( formSelector );
                    jQuery( '<input type="hidden">' ).attr( { name: 'x_select_time', 'value' : selecttime } ).appendTo( formSelector );
                    if ( navData )
                    {
                        var pipeSplit = new RegExp( /\|/ );
                        var resultString = navData.split( pipeSplit )[0];
                        jQuery( '<input type="hidden">' ).attr( { name: 'x_oldnav', 'value' : resultString } ).appendTo( formSelector );
                    }
                }
            }
        }
    }
    catch( e )
    {
            }
    try
    {
		document.getElementById('line_item_to_remove_gid').value = gid;
		document.forms['remove_line_item'].submit();
	} 
	catch( e )
	{
			}
}

function dropdownSelectOption( dropdownName, subId, inCart )
{
	try
	{
				$('add_to_cart_' + dropdownName + '_value').value = subId;
		$('add_to_cart_' + dropdownName + '_selected_text').innerHTML = $('add_to_cart_' + dropdownName + '_menu_option_' + subId).innerHTML;
		$('add_to_cart_' + dropdownName + '_description_text').innerHTML = $('add_to_cart_' + dropdownName + '_menu_option_description_' + subId).innerHTML;
		$('add_to_cart_' + dropdownName + '_add_button').style.display = inCart ? 'none' : 'block';
		$('add_to_cart_' + dropdownName + '_in_cart_button').style.display = inCart ? 'block' : 'none';
		HideMenu('add_to_cart_' + dropdownName + '_pulldown', 'add_to_cart_' + dropdownName + '_menu');
	}
	catch( e)
	{
			}
}

function dropdownAddToCart( dropdownName )
{
	try
	{
				if ($('add_to_cart_' + dropdownName + '_value').value == '')
		{
			 ShowMenu( $('add_to_cart_' + dropdownName + '_pulldown'), 'add_to_cart_' + dropdownName + '_menu' );
		}
		else
		{
			addToCart( dropdownName );
		}
	}
	catch( e)
	{
			}
}



}
/*
     FILE ARCHIVED ON 00:48:40 Jun 01, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:29:18 Nov 21, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 262.097
  exclusion.robots: 0.23
  exclusion.robots.policy: 0.221
  RedisCDXSource: 10.249
  esindex: 0.009
  LoadShardBlock: 225.936 (3)
  PetaboxLoader3.datanode: 210.284 (5)
  CDXLines.iter: 19.607 (3)
  PetaboxLoader3.resolve: 97.973 (3)
  load_resource: 106.695 (2)
*/