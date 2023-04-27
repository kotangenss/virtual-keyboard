import keys from '/keys.json' assert { type: "json" };

// Создание страницы

let [rowFirst, rowSecond, rowThird, rowFourth, rowFifth] = keys;
let lang = 'ru';
let arrayObjects = keys.flat();
let isActiveCaps = false;
let isActiveShift = false;
let isActiveAlt = false;
let isActiveCtrlLeft = false;

let arrayRus = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я'];
let arrayEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

window.addEventListener('beforeunload', setLocalStorage)
getLocalStorage()

createPage();
createKeyboard();

let textArea = document.querySelector('textarea');

// localeStorage
function setLocalStorage() {
	localStorage.setItem('lang', lang);
}

function getLocalStorage() {
	if (localStorage.getItem('lang')) {
		lang = localStorage.getItem('lang');
	}
}

function createPage() {
	const body = document.querySelector('body');
	body.classList.add('body', 'container');

	const title = document.createElement('h1');
	title.classList.add('body__title');
	title.textContent = 'Virtual Keyboard';
	body.appendChild(title);

	const bodyContainer = document.createElement('div');
	bodyContainer.classList.add('body__input', 'input');
	body.appendChild(bodyContainer);

	const textArea = document.createElement('textarea');
	textArea.classList.add('input__text');
	bodyContainer.appendChild(textArea);
	document.querySelector('textarea').focus();
}

function createRowButtons(arrayButtons) {
	const keyboardWrapper = document.querySelector('.keyboard');

	const rowKeys = document.createElement('div');
	rowKeys.classList.add('row');
	keyboardWrapper.appendChild(rowKeys);

	arrayButtons.forEach(el => {
		let char;
		let charSecond;
		const span = document.createElement('span');

		if (el.default[lang] === undefined) {
			char = el.default;
		} else {
			char = el.default[lang];
		}

		if (el.shift !== undefined && el.shift[lang] !== undefined) {
			charSecond = el.shift[lang];
			span.textContent = charSecond;
			span.classList.add('key__second-char');
		}

		const key = document.createElement('button');
		key.classList.add('key');
		key.textContent = char;
		if (span != undefined) {
			key.appendChild(span);
		}
		key.dataset.code = el.code;
		if (el.code === 'CapsLock') {
			key.id = 'capslock'
		}

		//щелчки мышью по кнопкам виртуальной клавиатуры или нажатия кнопок на физической клавиатуре вводят символы в поле ввода (текстовое поле)
		key.addEventListener('click', function () {
			let code = el.code;

			if (code == 'CapsLock') {
				isActiveCaps = !isActiveCaps;
				setCase()
			} else {
				arrayObjects.forEach(e => {
					if (code === e.code) {
						if (isActiveCaps) {
							textArea.value += e.default[lang].toUpperCase();
						} else {
							textArea.value += e.default[lang];
						}
						textArea.focus();
					}
				})
			}
		})

		rowKeys.appendChild(key);
	})
}

function createKeyboard() {
	const body = document.querySelector('body');
	const keyboardWrapper = document.createElement('div');
	keyboardWrapper.classList.add('body__keyboard', 'keyboard');
	body.appendChild(keyboardWrapper);

	const description = document.createElement('div');
	description.classList.add('body__description', 'description');

	const descriptionSystem = document.createElement('p');
	descriptionSystem.classList.add('description__system');
	descriptionSystem.textContent = 'Клавиатура разрабатывалась на MacOS';
	description.appendChild(descriptionSystem);

	const descriptionLanguage = document.createElement('p');
	descriptionLanguage.classList.add('description__language');
	descriptionLanguage.textContent = 'Для смены языка нажмите левый Ctrl + левый Alt (Option)';
	description.appendChild(descriptionLanguage);

	body.appendChild(description);

	createRowButtons(rowFirst);
	createRowButtons(rowSecond);
	createRowButtons(rowThird);
	createRowButtons(rowFourth);
	createRowButtons(rowFifth);
	changeKeyСharacteristics();
	setCase();
}

function changeKeyСharacteristics() {
	let keyArray = [...document.querySelectorAll('.key')];

	keyArray.forEach(el => {
		if (el.textContent === 'Backspace') {
			el.style.width = '170px';
		} else if (el.textContent === 'Del') {
			el.style.width = '93px';
		} else if (el.textContent === 'CapsLock') {
			el.style.width = '150px';
		} else if (el.textContent === 'Enter') {
			el.style.width = '170px';
		} else if (el.textContent === 'Shift') {
			el.style.width = '170px';
		} else if (el.textContent === '') {
			el.style.width = '510px';
		} else if (el.textContent === 'Ctrl') {
			el.style.width = '90px';
		} else if (el.textContent === '⇧') {
			// el.style.background = '#fcb42a';
			// el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇩') {
			// el.style.background = '#fcb42a';
			// el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇦') {
			// el.style.background = '#fcb42a';
			// el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇨') {
			// el.style.background = '#fcb42a';
			// el.style.color = '#363636';
			el.style.fontSize = '20px';
		}
	})
}

//Нажатие клавиши на физической клавиатуре выделяет клавишу на виртуальной клавиатуре
function showPressedButton(elem) {
	let arrayKeys = [...document.querySelectorAll('.key')]

	arrayObjects.forEach(el => {
		if (elem.code === el.code) {
			let keyCode = el.code;

			arrayKeys.forEach(e => {
				if (e.dataset.code == keyCode) {
					e.classList.add('active');
					setTimeout(() => {
						e.classList.remove('active');
					}, 150)
				}
			})
		}
	})
}

// Изменение размера букв
function setCase() {
	let arrayKeys = [...document.querySelectorAll('.key')]

	arrayKeys.forEach(el => {
		if (arrayRus.includes(el.textContent.toLowerCase()) || arrayEn.includes(el.textContent.toLowerCase())) {
			el.textContent = isActiveCaps || isActiveShift ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
		}
	})
}
// Размер символа в зависимости от caps или shift
function convertSymbol(e) {
	e.preventDefault();
	let symbol = arrayObjects.find(el => el.code == e.code).default[lang];

	if (isActiveCaps || isActiveShift) {
		return symbol.toUpperCase();
	} else {
		return symbol.toLowerCase();
	}
}

document.body.focus();

document.addEventListener("keyup", (e) => {
	if (["ShiftRight", "ShiftLeft"].includes(e.code)) {
		isActiveShift = false;
	}
	isActiveCtrlLeft = false;
	isActiveAlt = false;
	showPressedButton(e)

	if (e.code == 'CapsLock') {
		isActiveCaps = !isActiveCaps;
	}

	setCase();
});

document.addEventListener("keydown", (e) => {
	let newSymbol = '';
	showPressedButton(e)

	if (["ShiftRight", "ShiftLeft"].includes(e.code)) {
		isActiveShift = true;
	} else if (e.code == 'AltLeft') {
		isActiveAlt = true;
	} else if (e.code === 'CapsLock') {
		isActiveCaps = !isActiveCaps;
	} else if (e.code === "ControlLeft") {
		isActiveCtrlLeft = true;
	} else if (e.code === 'Tab') {
		e.preventDefault();
		newSymbol = '    ';
	}

	setCase();

	if (["Backquote", "BracketLeft", "BracketRight", "Semicolon", "Quote", "Backslash", "Comma", "Period", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Slash"].includes(e.code)) {
		e.preventDefault();
		if (isActiveShift) {
			newSymbol = arrayObjects.find(el => el.code == e.code).shift[lang];
		} else {
			newSymbol = arrayObjects.find(el => el.code == e.code).default[lang];
		}
	}

	//смена языка
	if (isActiveCtrlLeft && isActiveAlt) {
		lang = lang === 'en' ? 'ru' : 'en';
		document.querySelector('.keyboard').remove();
		document.querySelector('.description').remove();
		createKeyboard();
	}

	if (arrayRus.includes(e.key.toLowerCase()) || arrayEn.includes(e.key.toLowerCase())) {
		newSymbol = convertSymbol(e);
	}

if (newSymbol != '') {
		let start = textArea.selectionStart;
		let end = textArea.selectionEnd;
		textArea.setRangeText(newSymbol, start, end)
		textArea.focus();
		textArea.selectionStart = start + newSymbol.length;
		textArea.selectionEnd = end + newSymbol.length;
	}
});


