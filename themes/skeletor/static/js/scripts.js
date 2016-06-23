function initializeJS() {

    //sidebar dropdown menu
    jQuery('#sidebar .sub-menu > a').click(function () {
        // Close previous open submenu
        var last = jQuery('.sub.open', jQuery('#sidebar'));
        jQuery(last).slideUp(200);
        jQuery(last).removeClass("open");
        jQuery(last).parent().removeClass("open");

        // Toggle current submenu
        var sub = jQuery(this).next();
        var parent = jQuery(this).parent();
        if (sub.is(":visible")) {
            parent.removeClass("open")
            sub.slideUp(200);
            jQuery(sub).removeClass("open")
        } else {
            parent.addClass("open")
            sub.slideDown(200);
            jQuery(sub).addClass("open")
        }
    });

}
initializeJS();