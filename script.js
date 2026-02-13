const START_DATE = new Date("2024-11-15T20:54:00");

function pad(n) {
	return String(n).padStart(2, "0");
}

function updateElapsed() {
	const now = new Date();

	let years = now.getFullYear() - START_DATE.getFullYear();
	let months = now.getMonth() - START_DATE.getMonth();
	let days = now.getDate() - START_DATE.getDate();
	let hours = now.getHours() - START_DATE.getHours();
	let minutes = now.getMinutes() - START_DATE.getMinutes();
	let seconds = now.getSeconds() - START_DATE.getSeconds();

	if (seconds < 0) { seconds += 60; minutes -= 1; }
	if (minutes < 0) { minutes += 60; hours -= 1; }
	if (hours < 0) { hours += 24; days -= 1; }
	if (days < 0) {
		const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
		days += prevMonthLastDay;
		months -= 1;
	}
	if (months < 0) { months += 12; years -= 1; }

	const elYears = document.getElementById("years");
	const elMonths = document.getElementById("months");
	const elDays = document.getElementById("days");
	const elHours = document.getElementById("hours");
	const elMinutes = document.getElementById("minutes");
	const elSeconds = document.getElementById("seconds");

	if (elYears) elYears.textContent = years + (years === 1 ? " year" : " years");
	if (elMonths) elMonths.textContent = months + (months === 1 ? " month" : " months");
	if (elDays) elDays.textContent = days + (days === 1 ? " day" : " days");
	if (elHours) elHours.textContent = pad(hours) + (hours === 1 ? " hour" : " hours");
	if (elMinutes) elMinutes.textContent = pad(minutes) + (minutes === 1 ? " minute" : " minutes");
	if (elSeconds) elSeconds.textContent = pad(seconds) + (seconds === 1 ? " second" : " seconds");

}

updateElapsed();
setInterval(updateElapsed, 1000);



// Mobile: click a grid item to enlarge/center with overlay; click outside or press Escape to close
(function() {
	const items = Array.from(document.querySelectorAll('.grid-item'));
	if (!items.length) return;

	let overlay = null;

	function createOverlay() {
		overlay = document.createElement('div');
		overlay.className = 'overlay';
		overlay.addEventListener('click', closeActive);
		document.body.appendChild(overlay);
		document.body.classList.add('has-active');
		document.addEventListener('keydown', onKey);
	}

	function removeOverlay() {
		if (overlay) {
			overlay.removeEventListener('click', closeActive);
			overlay.remove();
			overlay = null;
		}
		document.body.classList.remove('has-active');
		document.removeEventListener('keydown', onKey);
	}

	function closeActive() {
		const active = document.querySelector('.grid-item.active');
		if (active) active.classList.remove('active');
		removeOverlay();
	}

	function onKey(e) {
		if (e.key === 'Escape') closeActive();
	}

	items.forEach(item => {
		item.addEventListener('click', (e) => {
			// Only enable this behavior on smaller screens (mobile)
			if (window.innerWidth > 768) return;

			const isActive = item.classList.contains('active');
			if (isActive) { closeActive(); return; }

			// open
			closeActive();
			item.classList.add('active');
			createOverlay();
		});
	});
})();

