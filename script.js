import keys from '/keys.json' assert { type: "json" };

// Создание страницы

let [rowFirst, rowSecond, rowThird, rowFourth, rowFifth] = keys;

createPage();
createKeyboard();

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
	descriptionLanguage.textContent = 'Для смены языка нажмите Shift + Alt или Shift + Option';
	description.appendChild(descriptionLanguage);

	body.appendChild(description);
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

		if (el.default.en === undefined) {
			char = el.default;
		} else {
			char = el.default.en;
		}

		if (el.shift !== undefined && el.shift.en !== undefined) {
			charSecond = el.shift.en;
			span.textContent = charSecond;
			span.classList.add('key__second-char');
		}

		const key = document.createElement('button');
		key.classList.add('key');
		key.textContent = char;
		if (span != undefined) {
			key.appendChild(span);
		}
		rowKeys.appendChild(key);

	})
}

function createKeyboard() {
	createRowButtons(rowFirst);
	createRowButtons(rowSecond);
	createRowButtons(rowThird);
	createRowButtons(rowFourth);
	createRowButtons(rowFifth);
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
			el.style.background = '#fcb42a';
			el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇩') {
			el.style.background = '#fcb42a';
			el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇦') {
			el.style.background = '#fcb42a';
			el.style.color = '#363636';
			el.style.fontSize = '20px';
		} else if (el.textContent === '⇨') {
			el.style.background = '#fcb42a';
			el.style.color = '#363636';
			el.style.fontSize = '20px';
		}
	})
}
changeKeyСharacteristics() 