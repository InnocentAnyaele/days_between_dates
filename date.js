// day-month-year

console.log(parseInt(9.02));
var commonYear = {
	1: 31,
	2: 28,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,
};

var leapYear = {
	1: 31,
	2: 29,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,
};

const sort_date = (firstDate, secondDate) => {
	let highestDate;
	let lowestDate;

	let firstDateSplit = firstDate.split('-');
	let secondDateSplit = secondDate.split('-');

	if (parseInt(firstDateSplit[2]) > parseInt(secondDateSplit[2])) {
		highestDate = firstDate;
		lowestDate = secondDate;
	} else if (parseInt(firstDateSplit[2]) < parseInt(secondDateSplit[2])) {
		highestDate = secondDate;
		lowestDate = firstDate;
	} else {
		if (parseInt(firstDateSplit[1]) > parseInt(secondDateSplit[1])) {
			highestDate = firstDate;
			lowestDate = secondDate;
		} else if (parseInt(firstDateSplit[1]) < parseInt(secondDateSplit[1])) {
			highestDate = secondDate;
			lowestDate = firstDate;
		} else {
			if (parseInt(firstDateSplit[0]) > parseInt(secondDateSplit[0])) {
				highestDate = firstDate;
				lowestDate = secondDate;
			} else if (parseInt(firstDateSplit[0]) < parseInt(secondDateSplit[0])) {
				highestDate = secondDate;
				lowestDate = firstDate;
			}
		}
	}
	return { highestDate: highestDate, lowestDate: lowestDate };
};

const is_leap_year = (year) => {
	 return true ? ((year % 400 === 0) || (year % 100 !== 0)) && ((year % 4) == 0) : false; 
	}

const calculate_days_after = (date) => {
	let newDate = date.split('-');
	let day = parseInt(newDate[0]);
	let month = parseInt(newDate[1]);
	let year = parseInt(newDate[2]);
	let remainingMonth = 12 - month;
	let is_leap_year = is_leap_year(year);

	let totalDays = 0;

	if (is_leap_year) {
		totalDays += leapYear[month] - day;
	} else {
		totalDays += commonYear[month] - day;
	}

	if (remainingMonth == 0) {
		return totalDays;
	}

	for (let i = month + 1; i <= 12; i++) {
		if (is_leap_year) {
			totalDays += leapYear[i];
		} else {
			totalDays += commonYear[i];
		}
	}

	return totalDays;
};

const calculate_days_before = (date) => {
	let newDate = date.split('-');
	let day = parseInt(newDate[0]);
	let month = parseInt(newDate[1]);
	let year = parseInt(newDate[2]);
	// let remainingMonth = 12 - month;
	let is_leap_year = year % 4 == 0 ? true : false;

	let totalDays = 0;

	totalDays += day;

	if (month < 2) {
		return totalDays;
	}

	for (let i = month - 1; i >= 1; i--) {
		if (is_leap_year) {
			totalDays += leapYear[i];
		} else {
			totalDays += commonYear[i];
		}
	}

	return totalDays;
};

const get_days = (firstDate, secondDate) => {
	if (firstDate == secondDate) {
		return 0;
	}

	let sortedDate = sort_date(firstDate, secondDate);
	let highestDate = sortedDate.highestDate;
	let lowestDate = sortedDate.lowestDate;

	let highestDateSplit = highestDate.split('-');
	let lowestDateSplit = lowestDate.split('-');

	// console.log(highestDate[2]);

	if (parseInt(highestDateSplit[2]) - parseInt(lowestDateSplit[2]) > 0) {
		let numberDays = 0;
		let daysAfter = calculate_days_after(lowestDate);
		let daysBefore = calculate_days_before(highestDate);
		for (
			let i = parseInt(lowestDateSplit[2]) + 1;
			i <= parseInt(highestDateSplit[2]) - 1;
			i++
		) {
			i % 4 == 0 ? (numberDays += 366) : (numberDays += 365);
		}
		return numberDays + daysAfter + daysBefore;
	} else {
		daysBefore = calculate_days_before(lowestDate);
		daysAfter = calculate_days_after(highestDate);
		daysExcluded = daysBefore + daysAfter;
		let numberDays = 0;
		parseInt(
			highestDateSplit[2] % 4 == 0
				? (numberDays = 366 - daysExcluded)
				: (numberDays = 365 - daysExcluded),
		);
		return numberDays;
	}
};

const get_hours = (firstDate, secondDate) => {
	return get_days(firstDate, secondDate) * 24;
};

const get_minutes = (firstDate, secondDate) => {
	return get_hours(firstDate, secondDate) * 60;
};

const get_seconds = (firstDate, secondDate) => {
	return get_minutes(firstDate, secondDate) * 60;
};

get_seconds('9-3-2022', '20-4-2022');

module.exports = { get_days, get_hours, get_minutes, get_seconds };
