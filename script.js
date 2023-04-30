import keys from './keys.json' assert { type: 'json' };
import { setLocalStorage, getLocalStorage } from './modules/localStorage.js';

let lang = 'ru';
let isActiveCaps = false;
let isActiveShiftRight = false;
let isActiveShiftLeft = false;
let isActiveAltRight = false;
let isActiveCmd = false;
let isActiveAltLeft = false;
let isActiveCtrlLeft = false;

const [rowFirst, rowSecond, rowThird, rowFourth, rowFifth] = keys;
const ARRAY_OBJECTS = keys.flat();
const ARRAY_RU = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я'];
const ARRAY_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

window.addEventListener('beforeunload', () => {
  setLocalStorage(lang);
});

if (getLocalStorage()) {
  lang = getLocalStorage();
}

createPage();
createKeyboard();

document.body.focus();

const TEXT_AREA = document.querySelector('textarea');

function createPage() {
  const BODY = document.querySelector('body');
  BODY.classList.add('body', 'container');

  const TITLE = document.createElement('h1');
  TITLE.classList.add('body__title');
  TITLE.textContent = 'Virtual Keyboard';
  BODY.appendChild(TITLE);

  const BODY_CONTAINER = document.createElement('div');
  BODY_CONTAINER.classList.add('body__input', 'input');
  BODY.appendChild(BODY_CONTAINER);

  const TEXT_FIELD = document.createElement('textarea');
  TEXT_FIELD.classList.add('input__text');
  BODY_CONTAINER.appendChild(TEXT_FIELD);
  document.querySelector('textarea').focus();
}

function createRowButtons(arrayButtons) {
  const KEYBOARD_WRAPPER = document.querySelector('.keyboard');

  const ROW_KEYS = document.createElement('div');
  ROW_KEYS.classList.add('row');
  KEYBOARD_WRAPPER.appendChild(ROW_KEYS);

  arrayButtons.forEach(el => {
    let char;
    let charSecond;
    const SPAN_SYMBOL = document.createElement('span');

    if (el.default[lang] === undefined) {
      char = el.default;
    } else {
      char = el.default[lang];
    }

    if (el.shift !== undefined && el.shift[lang] !== undefined) {
      charSecond = el.shift[lang];
      SPAN_SYMBOL.textContent = charSecond;
      SPAN_SYMBOL.classList.add('key__second-char');
    }

    const KEY = document.createElement('button');
    KEY.classList.add('key');
    KEY.textContent = char;

    if (SPAN_SYMBOL != undefined) {
      KEY.appendChild(SPAN_SYMBOL);
    }

    KEY.dataset.code = el.code;
    KEY.id = el.code;

    //щелчки мышью по кнопкам виртуальной клавиатуры вводят символы в поле ввода
    KEY.addEventListener('click', function () {
      let code = el.code;
      let newSymbol = '';
      let start = TEXT_AREA.selectionStart;
      let end = TEXT_AREA.selectionEnd;

      if (code == 'CapsLock') {
        isActiveCaps = !isActiveCaps;
        document.getElementById('CapsLock').classList.toggle('active');
        setCase();
      } else if (code === 'Tab') {
        newSymbol = '    ';
      } else if (code === 'Enter') {
        newSymbol = '\n';
      } else if (code === 'AltLeft' || code === 'AltRight' || code === 'ControlRight' || code === 'ControlLeft' || code === 'MetaLeft' || code === 'ShiftRight' || code === 'ShiftLeft') {
        newSymbol = '';
      } else if (code === 'Delete') {
        if (start === end) {
          TEXT_AREA.setRangeText('', start, end + 1);
        } else {
          TEXT_AREA.setRangeText('', start, end);
        }

        TEXT_AREA.focus();
        TEXT_AREA.selectionStart = start;
        TEXT_AREA.selectionEnd = start;
      } else if (code === 'Backspace') {
        if (start === end && start != 0) {
          start = start - 1;
        }

        TEXT_AREA.setRangeText('', start, end);

        TEXT_AREA.focus();
        TEXT_AREA.selectionStart = start;
        TEXT_AREA.selectionEnd = start;
      } else if (code === 'ArrowRight') {
        newSymbol = '⇨';
      } else if (code === 'ArrowLeft') {
        newSymbol = '⇦';
      } else if (code === 'ArrowDown') {
        newSymbol = '⇩';
      } else if (code === 'ArrowUp') {
        newSymbol = '⇧';
      } else if (code === 'Space') {
        newSymbol = ' ';
      } else {
        ARRAY_OBJECTS.forEach(e => {
          if (code === e.code) {
            if (isActiveShiftRight || isActiveShiftLeft) {
              if (e.shift == undefined || e.shift[lang] == undefined) {
                newSymbol = e.default[lang].toUpperCase();
              } else {
                newSymbol = e.shift[lang];
              }
            } else if (isActiveCaps) {
              if (e.shift == undefined || e.shift[lang] == undefined) {
                newSymbol = e.default[lang].toUpperCase();
              } else {
                newSymbol = e.default[lang]
              }
            } else {
              newSymbol = e.default[lang];
            }
            TEXT_AREA.focus();
          }
        })
      }

      if (newSymbol != '') {
        let start = TEXT_AREA.selectionStart;
        let end = TEXT_AREA.selectionEnd;
        TEXT_AREA.setRangeText(newSymbol, start, end)
        TEXT_AREA.focus();
        TEXT_AREA.selectionStart = start + newSymbol.length;
        TEXT_AREA.selectionEnd = end + newSymbol.length;
      }
    })

    let shiftLeft = document.getElementById('ShiftLeft');
    let shiftRight = document.getElementById('ShiftRight');

    if (shiftLeft) {
      shiftLeft.addEventListener('mousedown', function () {
        isActiveShiftLeft = true;
        setCase();
        TEXT_AREA.focus();
      })

      shiftLeft.addEventListener('mouseup', function () {
        isActiveShiftLeft = false;
        setCase();
        TEXT_AREA.focus();
        shiftLeft.classList.remove('active');
      })
    }

    if (shiftRight) {
      shiftRight.addEventListener('mousedown', function () {
        isActiveShiftRight = true;
        setCase();
        TEXT_AREA.focus();
      })

      shiftRight.addEventListener('mouseup', function () {
        isActiveShiftRight = false;
        setCase();
        TEXT_AREA.focus();
        shiftRight.classList.remove('active');
      })
    }

    ROW_KEYS.appendChild(KEY);
  })
}

function createKeyboard() {
  const BODY = document.querySelector('body');
  const KEYBOARD_WRAPPER = document.createElement('div');
  KEYBOARD_WRAPPER.classList.add('body__keyboard', 'keyboard');
  BODY.appendChild(KEYBOARD_WRAPPER);

  const DESCRIPTION = document.createElement('div');
  DESCRIPTION.classList.add('body__description', 'description');

  const DESCRIPTION_SYSTEM = document.createElement('p');
  DESCRIPTION_SYSTEM.classList.add('description__system');
  DESCRIPTION_SYSTEM.textContent = 'Клавиатура разрабатывалась на MacOS';
  DESCRIPTION.appendChild(DESCRIPTION_SYSTEM);

  const DESCRIPTION_LANGUAGE = document.createElement('p');
  DESCRIPTION_LANGUAGE.classList.add('description__language');
  DESCRIPTION_LANGUAGE.textContent = 'Для смены языка нажмите левый Ctrl + левый Alt (Option)';
  DESCRIPTION.appendChild(DESCRIPTION_LANGUAGE);

  BODY.appendChild(DESCRIPTION);

  createRowButtons(rowFirst);
  createRowButtons(rowSecond);
  createRowButtons(rowThird);
  createRowButtons(rowFourth);
  createRowButtons(rowFifth);
  changeKeyСharacteristics();
  setCase();
}

function changeKeyСharacteristics() {
  let arrayKeys = [...document.querySelectorAll('.key')];

  for (let key of arrayKeys) {
    if (key.textContent === 'Backspace') {
      key.style.width = '170px';
    } else if (key.textContent === 'Del') {
      key.style.width = '93px';
    } else if (key.textContent === 'CapsLock') {
      key.style.width = '150px';
    } else if (key.textContent === 'Enter') {
      key.style.width = '170px';
    } else if (key.textContent === 'Shift') {
      key.style.width = '170px';
    } else if (key.textContent === '') {
      key.style.width = '510px';
    } else if (key.textContent === 'Ctrl') {
      key.style.width = '90px';
    } else if (key.textContent === '⇧') {
      key.style.fontSize = '20px';
    } else if (key.textContent === '⇩') {
      key.style.fontSize = '20px';
    } else if (key.textContent === '⇦') {
      key.style.fontSize = '20px';
    } else if (key.textContent === '⇨') {
      key.style.fontSize = '20px';
    }
  }
}

// Изменение размера букв
function setCase() {
  [...document.querySelectorAll('.key')].forEach(el => {
    if (ARRAY_RU.includes(el.textContent.toLowerCase()) || ARRAY_EN.includes(el.textContent.toLowerCase())) {
      el.textContent = isActiveCaps || isActiveShiftLeft || isActiveShiftRight ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
    }
  })
}

// Поиск символа для вставки в зависимости от caps или shift
function getCorrectSymbol(e) {
  e.preventDefault();
  let symbol = ARRAY_OBJECTS.find(el => el.code == e.code).default[lang];

  if (isActiveCaps || isActiveShiftLeft || isActiveShiftRight) {
    return symbol.toUpperCase();
  } else {
    return symbol.toLowerCase();
  }
}

document.addEventListener('keyup', (e) => {
  document.getElementById(e.code).classList.remove('active');

  if (e.code === 'ShiftLeft') {
    isActiveShiftLeft = false;
  } else if (e.code === 'ShiftRight') {
    isActiveShiftRight = false;
  } else if (e.code == 'AltLeft') {
    isActiveAltLeft = false;
  } else if (e.code == 'AltRight') {
    isActiveAltRight = false;
  } else if (e.code === 'ControlLeft') {
    isActiveCtrlLeft = false;
  } else if (e.code === 'MetaLeft') {
    isActiveCmd = false;
  } else if (isActiveCaps && e.code === 'CapsLock') {
    isActiveCaps = !isActiveCaps;
  }

  setCase();
});

document.addEventListener('keydown', (e) => {
  let newSymbol = '';

  if (e.code == 'ShiftLeft') {
    isActiveShiftLeft = true;
  } else if (e.code == 'ShiftRight') {
    isActiveShiftRight = true;
  } else if (e.code == 'AltLeft') {
    isActiveAltLeft = true;
  } else if (e.code == 'AltRight') {
    isActiveAltRight = true;
  } else if (e.code === 'CapsLock') {
    isActiveCaps = !isActiveCaps;
  } else if (e.code === 'ControlLeft') {
    isActiveCtrlLeft = true;
  } else if (e.code === 'Tab') {
    e.preventDefault();
    newSymbol = '    ';
  } else if (e.code === 'MetaLeft') {
    isActiveCmd = true;
  }

  setCase();

  if (['Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Backslash', 'Comma', 'Period', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Slash', 'Minus', 'Equal'].includes(e.code)) {
    e.preventDefault();
    if (isActiveShiftRight || isActiveShiftLeft) {
      let symbol = ARRAY_OBJECTS.find(el => el.code == e.code)
      if (symbol.shift[lang] != undefined) {
        newSymbol = symbol.shift[lang];
      } else {
        newSymbol = symbol.default[lang].toUpperCase();
      }
    } else {
      newSymbol = ARRAY_OBJECTS.find(el => el.code == e.code).default[lang];
    }
  }

  //смена языка
  if (isActiveCtrlLeft && isActiveAltLeft) {
    lang = lang === 'en' ? 'ru' : 'en';
    document.querySelector('.keyboard').remove();
    document.querySelector('.description').remove();
    createKeyboard();
  }

  if (ARRAY_RU.includes(e.key.toLowerCase()) || ARRAY_EN.includes(e.key.toLowerCase())) {
    newSymbol = getCorrectSymbol(e);
  }

  if (newSymbol != '') {
    let start = TEXT_AREA.selectionStart;
    let end = TEXT_AREA.selectionEnd;
    TEXT_AREA.setRangeText(newSymbol, start, end)
    TEXT_AREA.focus();
    TEXT_AREA.selectionStart = start + newSymbol.length;
    TEXT_AREA.selectionEnd = end + newSymbol.length;
  }

  document.getElementById(e.code).classList.add('active');
  if (isActiveCtrlLeft) {
    document.getElementById('ControlLeft').classList.add('active');
  }
  if (isActiveAltLeft) {
    document.getElementById('AltLeft').classList.add('active');
  }
  if (isActiveShiftLeft) {
    document.getElementById('ShiftLeft').classList.add('active');
  }
  if (isActiveCmd) {
    document.getElementById('MetaLeft').classList.add('active');
  }

  if (isActiveAltRight) {
    document.getElementById('AltRight').classList.add('active');
  }
  if (isActiveShiftRight) {
    document.getElementById('ShiftRight').classList.add('active');
  }
});
