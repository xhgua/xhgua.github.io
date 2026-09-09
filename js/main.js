/**
 * Sets up Justified Gallery (re-runnable after a page transition).
 */
function initGallery() {
  if (!!$.prototype.justifiedGallery) {
    var options = {
      rowHeight: 140,
      margins: 4,
      lastRow: "justify"
    };
    $(".article-gallery").justifiedGallery(options);
  }
}

/**
 * Page initialization (responsive nav + menus + scroll behavior).
 *
 * This is re-runnable: it uses namespaced jQuery events so that calling it
 * again after a Swup page transition rebinds cleanly without stacking
 * duplicate handlers.
 */
function initMain() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").off("click.main").on("click.main", function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.off("click.main").on("click.main", function() {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu. Navigation links stay visible (no
     * auto-hide on scroll); on tablet the menu icon swaps for a scroll-to-top icon.
     */
    $(window).off("scroll.main");
    if (menu.length) {
      $(window).on("scroll.main", function() {
        var topDistance = menu.offset().top;

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll.main", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
}

$(document).ready(function() {
  initGallery();
  initMain();
});

// Expose the initializers so Swup can re-run them after each page transition.
window.initGallery = initGallery;
window.initMain = initMain;
