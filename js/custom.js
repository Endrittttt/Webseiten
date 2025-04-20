/* Author:WebThemez
 * Author URI:http://webthemez.com
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 */

(function ($) {
	$(document).ready(function () {

		$(".banner-image").backstretch('images/banner.jpg');

		// Fixed header
		//-----------------------------------------------
		$(window).scroll(function () {
			if (($(".header.fixed").length > 0)) {
				if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		$(window).load(function () {
			if (($(".header.fixed").length > 0)) {
				if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		// Hilfsfunktionen zum Umgang mit Cookies
		function setCookie(name, value, days) {
			let expires = "";
			if (days) {
				const date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
		}
		function getCookie(name) {
			const nameEQ = name + "=";
			const ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i].trim();
				if (c.indexOf(nameEQ) === 0) {
					return decodeURIComponent(c.substring(nameEQ.length));
				}
			}
			return "";
		}

		// Elemente referenzieren
		const banner = document.getElementById('cookie-banner');
		const initialPane = document.getElementById('cookie-message');
		const settingsPane = document.getElementById('cookie-settings');
		const toggleMaps = document.getElementById('toggle-maps');
		const toggleForm = document.getElementById('toggle-form');
		const mapPlaceholder = document.getElementById('map-placeholder');
		const formPlaceholder = document.getElementById('form-placeholder');
		const contactForm = document.getElementById('contact-form');

		// Funktion, um Inhalte gemäß Consent zu aktualisieren
		function applyPreferences(allowMaps, allowForm) {
			// === GOOGLE MAPS ===
			if (allowMaps) {
				// Wenn Map erlaubt ist → einfügen (nur einmal)
				if (!document.getElementById('google-map')) {
					const iframe = document.createElement('iframe');
					iframe.id = 'google-map';
					iframe.style.width = "100%";
					iframe.style.minHeight = "200px";
					iframe.style.height = "100%";
					iframe.style.border = "1px solid #444";
					iframe.loading = "lazy";
					iframe.allowFullscreen = true;
					iframe.referrerPolicy = "no-referrer-when-downgrade";
					iframe.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
					iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.8030521459787!2d8.709228115650264!3d48.555293979259955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479758021e3eb7ad%3A0x7b6df9c0b0205486!2sGottlieb-Daimler-Stra%C3%9Fe%209%2C%2072202%20Nagold!5e0!3m2!1sde!2sde!4v1712405790123!5m2!1sde!2sde";
					document.getElementById('map-container').appendChild(iframe);
				}
				mapPlaceholder.style.display = 'none';
				mapPlaceholder.classList.remove('deaktiviert');
			} else {
				// Wenn Map abgelehnt ist → entfernen
				const mapFrame = document.getElementById('google-map');
				if (mapFrame) {
					mapFrame.parentNode.removeChild(mapFrame);
				}
				mapPlaceholder.style.display = 'flex';
				mapPlaceholder.classList.add('deaktiviert');
			}
		
			// === KONTAKTFORMULAR ===
			const formWrapper = document.getElementById('form-wrapper');
		
			if (allowForm) {
				formPlaceholder.style.display = 'none';
				contactForm.style.display = 'flex';
				formWrapper.classList.remove('deaktiviert');
				formPlaceholder.classList.remove('deaktiviert');
			} else {
				contactForm.style.display = 'none';
				formPlaceholder.style.display = 'flex';
				formWrapper.classList.add('deaktiviert');
				formPlaceholder.classList.add('deaktiviert');
			}
		}

		// Funktion, um Einstellungen-Panel anzuzeigen (und Werte zu laden)
		function openSettings() {
			// Falls Banner gerade ausgeblendet ist (nach vorheriger Entscheidung), wieder einblenden
			banner.style.display = 'block';
			initialPane.style.display = 'none';
			settingsPane.style.display = 'block';
			// Aktuelle Einstellungen in Checkboxen anzeigen
			toggleMaps.checked = getCookie('allowMaps') === 'true';
			toggleForm.checked = getCookie('allowForm') === 'true';
		}

		// Event-Listener für Banner-Buttons
		document.getElementById('accept-all-btn').addEventListener('click', function () {
			// Alle akzeptieren: Cookies setzen und Inhalte einblenden
			setCookie('allowMaps', 'true', 180);
			setCookie('allowForm', 'true', 180);
			applyPreferences(true, true);
			banner.style.display = 'none';
		});
		
		document.getElementById('settings-btn').addEventListener('click', function () {
			openSettings();
		});
		document.getElementById('save-settings-btn').addEventListener('click', function () {
			// Einstellungen speichern (aus Checkbox-Werten lesen)
			const allowMaps = toggleMaps.checked;
			const allowForm = toggleForm.checked;
			setCookie('allowMaps', allowMaps ? 'true' : 'false', 180);
			setCookie('allowForm', allowForm ? 'true' : 'false', 180);
			applyPreferences(allowMaps, allowForm);
			banner.style.display = 'none';
		});
		document.getElementById('accept-all-settings-btn').addEventListener('click', function () {
			// "Alle akzeptieren" im Einstellungs-Panel
			setCookie('allowMaps', 'true', 180);
			setCookie('allowForm', 'true', 180);
			applyPreferences(true, true);
			banner.style.display = 'none';
		});

		// Event-Listener für Platzhalter-Links ("Einstellungen anpassen")
		document.getElementById('enable-maps').addEventListener('click', function (e) {
			e.preventDefault();
			openSettings();
		});
		document.getElementById('enable-form').addEventListener('click', function (e) {
			e.preventDefault();
			openSettings();
		});

		// Beim Laden der Seite: prüfen, ob bereits eine Entscheidung vorliegt
		(function () {
			const savedMaps = getCookie('allowMaps');
			const savedForm = getCookie('allowForm');
			if (savedMaps !== "" && savedForm !== "") {
				// Es existieren Einstellungen - entsprechend anwenden und Banner verstecken
				const allowMaps = (savedMaps === 'true');
				const allowForm = (savedForm === 'true');
				applyPreferences(allowMaps, allowForm);
				// Banner nicht anzeigen, da schon zugestimmt/abgelehnt wurde
				banner.style.display = 'none';
			} else {
				// Noch keine Entscheidung: Banner anzeigen und externe Inhalte blockieren
				applyPreferences(false, false);
				banner.style.display = 'block';
			}
		})();


		$('#quote-carousel').carousel({
			pause: true,
			interval: 4000,
		});
		//Scroll Spy
		//-----------------------------------------------
		if ($(".scrollspy").length > 0) {
			$("body").addClass("scroll-spy");
			$('body').scrollspy({
				target: '.scrollspy',
				offset: 152
			});
		}

		//Smooth Scroll
		//-----------------------------------------------
		if ($(".smooth-scroll").length > 0) {
			$('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top - 151
						}, 1000);
						return false;
					}
				}
			});
		}

		// Animations
		//-----------------------------------------------
		if (($("[data-animation-effect]").length > 0) && !Modernizr.touch) {
			$("[data-animation-effect]").each(function () {
				var $this = $(this),
					animationEffect = $this.attr("data-animation-effect");
				if (Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					$this.appear(function () {
						setTimeout(function () {
							$this.addClass('animated object-visible ' + animationEffect);
						}, 400);
					}, { accX: 0, accY: -130 });
				} else {
					$this.addClass('object-visible');
				}
			});
		};

		// Isotope filters
		//-----------------------------------------------
		if ($('.isotope-container').length > 0) {
			$(window).load(function () {
				$('.isotope-container').fadeIn();
				var $container = $('.isotope-container').isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.6s',
					filter: "*"
				});
				// filter items on button click
				$('.filters').on('click', 'ul.nav li a', function () {
					var filterValue = $(this).attr('data-filter');
					$(".filters").find("li.active").removeClass("active");
					$(this).parent().addClass("active");
					$container.isotope({ filter: filterValue });
					return false;
				});
			});
		};

		//Modal
		//-----------------------------------------------
		if ($(".modal").length > 0) {
			$(".modal").each(function () {
				$(".modal").prependTo("body");
			});
		}


		// Zufällige Testimonials ins Karussell einsetzen:
		var testimonials = [
			{ quote: "Schneller, freundlicher Service und faire Preise – ich bringe mein Auto nur noch hierher!", name: "Martina L.", role: "Privatkundin" },
			{ quote: "Top Werkstatt! Terminvergabe war unkompliziert, alles lief reibungslos und transparent.", name: "Andreas M.", role: "Firmenkunde" },
			{ quote: "Die Beratung war ehrlich, der Service professionell – man merkt, dass hier Profis am Werk sind.", name: "Kerstin F.", role: "Privatkundin" },
			{ quote: "Immer freundliche Mitarbeiter und schnelle Hilfe – absolute Empfehlung!", name: "Sebastian R.", role: "Privatkunde" },
			{ quote: "Ich bin schon seit Jahren zufriedener Stammkunde. Top Team!", name: "Ute B.", role: "Privatkundin" },
			{ quote: "Professionelle Abwicklung und transparente Preise. Hier wird ehrlich gearbeitet.", name: "Lars T.", role: "Firmenkunde" },
			{ quote: "Das beste Werkstatt-Erlebnis, das ich je hatte – sehr zuvorkommend!", name: "Nina K.", role: "Privatkundin" },
			{ quote: "Schnelle Diagnose und Reparatur. So muss Kundenservice sein.", name: "Frank W.", role: "Privatkunde" },
			{ quote: "Der Rundum-Service ist wirklich klasse. Ich fühle mich gut aufgehoben.", name: "Claudia S.", role: "Privatkundin" },
			{ quote: "Faire Preise, keine versteckten Kosten. Sehr vertrauenswürdig.", name: "Mehmet D.", role: "Privatkunde" },
			{ quote: "Zuverlässig, pünktlich, freundlich – besser geht’s nicht.", name: "Sabine E.", role: "Privatkundin" },
			{ quote: "Ich wurde gut beraten und mein Anliegen wurde sofort verstanden.", name: "Ali C.", role: "Firmenkunde" },
			{ quote: "Sehr zuverlässiger Service – ich wurde nie enttäuscht.", name: "Ahmet Y.", role: "Privatkunde" },
			{ quote: "Freundlich, schnell und kompetent. Vielen Dank!", name: "Elena S.", role: "Privatkundin" },
			{ quote: "Unsere Flotte ist hier gut aufgehoben, alles läuft effizient.", name: "Vladimir P.", role: "Firmenkunde" },
			{ quote: "Transparente Preise und ehrliche Beratung – top!", name: "Mevlüde A.", role: "Privatkundin" },
			{ quote: "Bei Problemen wird hier nicht lange gefackelt – es wird gehandelt.", name: "Ivan K.", role: "Privatkunde" },
			{ quote: "Ein Werkstattbesuch ohne Stress. So muss das sein.", name: "Fatmir H.", role: "Privatkunde" },
			{ quote: "Immer ein Lächeln am Empfang – das merkt man sich.", name: "Leyla C.", role: "Privatkundin" },
			{ quote: "Für Geschäftskunden absolut empfehlenswert.", name: "Kemal D.", role: "Firmenkunde" },
			{ quote: "Ich bringe mein Auto nur noch hierher – sehr zuverlässig!", name: "Natalia Z.", role: "Privatkundin" },
			{ quote: "Termine bekommt man schnell und ohne Umstände.", name: "Dragan M.", role: "Privatkunde" },
			{ quote: "Ich bin wirklich begeistert vom Servicelevel.", name: "Anja W.", role: "Privatkundin" },
			{ quote: "Toller Ablauf von der Terminvergabe bis zur Abholung.", name: "Manuel K.", role: "Privatkunde" },
			{ quote: "Die telefonische Beratung war sehr freundlich und kompetent.", name: "Helene T.", role: "Privatkundin" },
			{ quote: "Hier arbeiten echte Profis, die wissen, was sie tun.", name: "Ralf S.", role: "Privatkunde" },
			{ quote: "Unsere Firmenfahrzeuge sind hier in besten Händen.", name: "Christian J.", role: "Firmenkunde" },
			{ quote: "Sehr moderne Werkstatt mit einem angenehmen Wartebereich.", name: "Isabell H.", role: "Privatkundin" },
			{ quote: "Ich wurde gut beraten und es wurde nichts aufgeschwatzt – sehr angenehm.", name: "Thomas B.", role: "Privatkunde" },
			{ quote: "Schneller Service und klare Kommunikation – so wünscht man sich das.", name: "Melanie S.", role: "Privatkundin" },
			{ quote: "Die Reparatur wurde sogar früher fertig als geplant. Top!", name: "Sven K.", role: "Privatkunde" },
			{ quote: "Sehr freundliche Mitarbeiter, vom Empfang bis zur Werkstatt.", name: "Jana H.", role: "Privatkundin" },
			{ quote: "Unsere Lieferfahrzeuge sind hier regelmäßig in guten Händen.", name: "Serkan A.", role: "Firmenkunde" },
			{ quote: "Transparente Abwicklung und keine bösen Überraschungen beim Preis.", name: "Petra M.", role: "Privatkundin" },
			{ quote: "Ich wurde sofort ernst genommen und alles lief reibungslos.", name: "Denis R.", role: "Privatkunde" },
			{ quote: "Ich bin einfach zufrieden – so soll’s sein.", name: "Irina L.", role: "Privatkundin" },
			{ quote: "Professionell und ehrlich – kann ich nur weiterempfehlen.", name: "Marko D.", role: "Privatkunde" },
			{ quote: "Ich hatte ein komplexeres Anliegen und wurde kompetent begleitet.", name: "Aleksandra N.", role: "Privatkundin" },
			{ quote: "Die Terminvergabe ging schnell und unkompliziert – sehr effizient.", name: "Jan T.", role: "Privatkunde" },
			{ quote: "Endlich mal eine Werkstatt, bei der ich mich als Frau ernst genommen fühle.", name: "Zeynep E.", role: "Privatkundin" },
			{ quote: "Alle Absprachen wurden eingehalten, sehr professionell.", name: "Oleg M.", role: "Privatkunde" },
			{ quote: "Ich wurde sogar angerufen, als ein besseres Ersatzteil verfügbar war – das nenn ich Service.", name: "Katarina V.", role: "Privatkundin" },
			{ quote: "Seit Jahren bringe ich unsere Firmenflotte hierher – zuverlässig und schnell.", name: "Heiko F.", role: "Firmenkunde" },
			{ quote: "Alles lief ohne Stress ab. Ich habe mich sehr gut aufgehoben gefühlt.", name: "Aylin G.", role: "Privatkundin" },
			{ quote: "Der Techniker hat sich wirklich Zeit für meine Fragen genommen.", name: "Tobias N.", role: "Privatkunde" },
			{ quote: "Auch kurzfristig wurde ich eingeschoben – das nenn ich kundenorientiert.", name: "Sanja K.", role: "Privatkundin" },
			{ quote: "Preis-Leistung absolut fair. Keine unnötigen Reparaturen.", name: "Dominik Z.", role: "Privatkunde" },
			{ quote: "Für unsere Geschäftspartner suchen wir immer Zuverlässigkeit – hier haben wir sie gefunden.", name: "Diana R.", role: "Firmenkundin" }

		];

		var usedIndices = [];
		var usedQuotes = new Set();

		while (usedIndices.length < 3) {
			var randIndex = Math.floor(Math.random() * testimonials.length);
			var quote = testimonials[randIndex].quote;

			if (!usedIndices.includes(randIndex) && !usedQuotes.has(quote)) {
				usedIndices.push(randIndex);
				usedQuotes.add(quote);
			}
		}

		// Inhalte in die Slides einfügen
		var slides = document.querySelectorAll('#quote-carousel .carousel-inner .item');

		for (var i = 0; i < usedIndices.length; i++) {
			var t = testimonials[usedIndices[i]];
			var quotePara = slides[i].querySelector('p');
			var authorSmall = slides[i].querySelector('small');
			var avatarImg = slides[i].querySelector('img');
			var nameForUrl = t.name.replace(/ /g, "+");

			quotePara.textContent = "„" + t.quote + "“";
			authorSmall.textContent = t.name + ", " + t.role;
			avatarImg.src = "https://ui-avatars.com/api/?name=" + nameForUrl + "&background=020202&color=fff&size=100";
			avatarImg.alt = t.name;
		}

	}); // End document ready
})(this.jQuery);





