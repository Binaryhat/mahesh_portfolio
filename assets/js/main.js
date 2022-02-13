/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');
		$portfolio_container = $('#one');

		//portfolio object
		var portfolioJson = [
			{
				"id":"1",
				"name":"Music Player",
				"desc":"Music Player",
				"img":"images/pic01.jpg",
				"link":"./music-player/index.html"
			},
			{
				"id":"2",
				"name":"Video Player",
				"desc":"player with Standard controls",
				"img":"images/pic02.jpg",
				"link":"./video-player/index.html"
			},
			{
				"id":"3",
				"name":"Joke Teller",
				"desc":"Text to audio joke teller",
				"img":"images/pic03.jpg",
				"link":"./joke-teller/index.html"
			},
			{
				"id":"4",
				"name":"Infinite Scroll",
				"desc":"Unsplash API - Infinite Scroll",
				"img":"images/pic04.jpg",
				"link":"./infinite-scroll/index.html"
			},
			{
				"id":"5",
				"name":"Picture in Picture",
				"desc":"Picture in Picture window",
				"img":"images/pic05.jpg",
				"link":"./picture-in-picture/index.html"
			},
			{
				"id":"6",
				"name":"spock rock game",
				"desc":"Rock-paper-scissors-lizard-Spock",
				"img":"images/pic06.jpg",
				"link":"./spock-rock-game/index.html"
			},
			{
				"id":"7",
				"name":"Quote Generator",
				"desc":"Quote Generator",
				"img":"images/pic07.jpg",
				"link":"./quote_generator/index.html"
			},
			{
				"id":"8",
				"name":"Theme Modes",
				"desc":"light-dark-mode theme toggle",
				"img":"images/pic08.jpg",
				"link":"./light-dark-mode/index.html"
			},
			{
				"id":"9",
				"name":"Kanban Board",
				"desc":"Drag and Drop fuctionality",
				"img":"images/pic09.jpg",
				"link":"./drag-and-drop/index.html"
			},
			{
				"id":"10",
				"name":"Custom Countdown",
				"desc":"light-dark-mode theme toggle",
				"img":"images/pic10.jpg",
				"link":"./custom-countdown/index.html"
			},
			{
				"id":"11",
				"name":"Book Keeper",
				"desc":"Bookmark system for wen urls",
				"img":"images/pic11.jpg",
				"link":"./book-keeper/index.html"
			},
			{
				"id":"12",
				"name":"Animated Template",
				"desc":"AOS - Animate on scroll library",
				"img":"images/pic12.jpg",
				"link":"./animated-template/index.html"
			},
			{
				"id":"13",
				"name":"Animated navigation",
				"desc":"Animated menu and navigaton",
				"img":"images/pic13.jpg",
				"link":"./animated-navigation/index.html"
			},
			{
				"id":"14",
				"name":"Form Validator",
				"desc":"Form validations",
				"img":"images/pic14.jpg",
				"link":"./form-validator/index.html"
			},
			
		];
	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		//portfolio dynamic 
		function loadPortfolio(){

			$.each(portfolioJson, function(idx, obj) {
				$portfolio_container.append(`
				<article>
					<span class="image">
						<img src="${obj.img}" alt="" />
					</span>
					<header class="major">
						<h3><a href="${obj.link}" class="link">${obj.name}</a></h3>
						<p>${obj.desc}</p>
					</header>
				</article>
			`);
			});

		}
	// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function() {
			window.setTimeout(function() {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

		//to load portfolio
		loadPortfolio();

	// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('href');

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}

						// Otherwise ...
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										location.href = href;
									}, 500);

							}

					});

				}

		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);