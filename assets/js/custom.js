jQuery(function(){
	jQuery('#menu').slicknav({
		label: '',
		openedSymbol:"",
		closedSymbol:"",
		prependTo:'#menu_holder'
	});
});

(function($){
	jQuery(function(){
		jQuery('.scroll_me_down').click(function () {
			var Lochref = jQuery(this).attr('href');
			jQuery("html, body").stop().animate({ 
			scrollTop: jQuery(Lochref).offset().top 
			}, 1500); 
			return false;
		});
	});
	jQuery(function (){
		jQuery('.simple-marquee-container').SimpleMarquee(
		);
	});

})(jQuery);
jQuery(function () {
	jQuery('.jobs_feature_carousel').owlCarousel({
		loop:false,
		nav:true,
		margin:0,
		items:1,
		dots:true,
		mouseDrag: false,
		responsiveClass:true,
		onInitialized: counter,
        onTranslated: counter,
		responsive:{
			0:{
				items:1,
				dots:true,
			}
		}
	});
	jQuery('.services_area_mb').owlCarousel({
		loop:false,
		nav:true,
		margin:0,
		items:2,
		dots:true,
		mouseDrag: false,
		responsiveClass:true,
		onInitialized: counter,
        onTranslated: counter,
		responsive:{
			0:{
				items:2,
				dots:true,
			}
		}
	});
	
	function counter(event) {
        var element = event.target;
        var items = event.item.count;
        var item = event.item.index + 1;
        var sldtxt = jQuery(".active .ivySlideTxt").html();
        var sldWidth = 100;
        var sldPercent = (sldWidth * item) / items;
        jQuery("#counter").html("0" + item + " / 0" + items);
        jQuery(".slTxt").html(sldtxt);
        jQuery(".slideState span").css("width", sldPercent + "%");
        jQuery(".slideState span").html(sldPercent + "%");
      };
	  jQuery('.request_testimonial_box').owlCarousel({
		loop:true,
		nav:true,
		margin:0,
		items:1,
		dots:true,
		mouseDrag: true,
		responsiveClass:true,
		onInitialized: counter,
        onTranslated: counter,
		responsive:{
			0:{
				items:1,
				dots:true,
			}
		}
	});
	
});
		
jQuery(".menu_bar").click(function() { 
	jQuery('.mobile_menu').addClass('mobile_menu_open'); 
	jQuery('.mobile_menu').slideDown('slow'); 
});
jQuery(".menu_close").click(function() { 
	jQuery('.mobile_menu').removeClass('mobile_menu_open'); 
	jQuery('.mobile_menu').slideUp('slow'); 
});

jQuery(function () {	
	jQuery(".thanks_pop_on").click(function() {
		jQuery('.form_thank_you').fadeIn('slow');
	});
});


jQuery(function() {
	new WOW().init();
});



(function($){
   jQuery(document).ready(function(){
		jQuery.noConflict() 
		(function($){ 
			var removeClass = true;
			  $(".banner_form").click(function() {
				 $("body").addClass("form-active");
				 $(".banner_form").addClass("focus-active");
				 $(".focus-active-none").addClass("focus-active-1");
				removeClass = false;
			  });
			  $("html").click(function() {
				if (removeClass) {
				   $("body").removeClass("form-active");
				   $(".banner_form").removeClass("focus-active");
				   $(".focus-active-none").removeClass("focus-active-1");
				}
				removeClass = true; 
			  });
	
		});
	});
})(jQuery);


jQuery( ".toggle_view_item h4" ).click(function(e) {
	if(jQuery(this).hasClass('active')) {
	} else {
		jQuery( ".toggle_view_item h4" ).each(function() {
		if(jQuery(this).hasClass('active')) {
		jQuery(this).toggleClass('active');
		jQuery(this).next('.show_details').slideToggle('hide');
		}
		});
	}
	jQuery(this).toggleClass('active');
	jQuery(this).next('.show_details').slideToggle('slow');
	e.preventDefault();
});
jQuery(function () {
	jQuery(".tab_content").hide();
	jQuery("ul.tabs li:first").addClass("active").show(); 
	jQuery(".tab_content:first").show();
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); 
		jQuery(this).addClass("active"); 
		jQuery(".tab_content").hide(); 
		var activeTab = jQuery(this).find("a").attr("href"); 
		jQuery(activeTab).fadeIn(); 
		return false;
	});
});
