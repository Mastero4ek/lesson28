/*  создаем функцию filterByType
	с двумя параметрами type и ...values-который может принять любое кол-во значений в виде массива
	и у этого массива вызываем метод filter, в котором сравниваем каждый элемент массива с параметром type
*/
const filterByType = (type, ...values) => values.filter(value => typeof value === type),


	/*  создаем функцию hideAllResponseBlocks в которой
		создаем константу = новому массиву, который состоит из всех элементов div с классом dialog__response-block
		методом forEach перебираем этот массив и скрываем каждый элемент на странице
	*/
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},


	/*  создаем функцию showResponseBlock c 3мя параметрами
		1. в этой функции вызываем функцию hideAllResponseBlocks которая скрывает каждый элемент на странице
		2. находим элемент на странице = 1му параметру blockSelector и показываем его на странице
		3. условие, если существует элемент на странице = 3ему параметру spanSelector,
		тогда записываем в него строку = 2му параметру msgText
	*/
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},


	/*  создаем функцию showError с 1им параметром msgText
		в которой вызываем функцию showResponseBlock с 3мя аргументами
		'.dialog__response-block_error', параметр msgText функции showError, '#error'
	*/
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),


	/*  создаем функцию showResults с 1им параметром msgText
		в которой вызываем функцию showResponseBlock с 3мя аргументами
		'.dialog__response-block_ok', параметр msgText функции showError, '#ok'
	*/
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),


	/*  создаем функцию showNoResults
		в которой вызываем функцию showResponseBlock с аргументом '.dialog__response-block_no-results'
	*/
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),


	/*  создаем функцию tryFilterByType с 2мя параметрами в которой
		создаем конструкцию try catch
			1. в блоке try создаем константу valuesArray = выполнению строки кода, с помощью встроенной функции eval,
			в строке кода вызываем функцию filterByType, в которую передаем 2 аргумента:
					type = 1й параментр функции tryFilterByType,
					values = 2й параментр функции tryFilterByType
				функция tryFilterByType вернет массив из строк, методом join(', ') объединяем все элементы массива в один через запятую
			2. создаем константу alertMsg = решению тернарного оператора
					если длина массива valuesArray не равно 0,
					тогда alertMsg = Данные с типом (1й параметр функции): (valuesArray-массив состоящий из строки),
					в противном случае alertMsg = Отсутствуют данные типа (1й параметр функции)
			3. вызываем функцию showResults в которую передаем в качестве аргумента alertMsg - строку
			4. в блоке catch вызываем функцию showError в которую передаем в качестве аргумента Ошибка: (error-параметр catch)
	*/
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};


//  создаем константу filterButton = элементу со страницы с id filter-btn
const filterButton = document.querySelector('#filter-btn');


/*  1. вешаем слушатель на filterButton по событию click
	2. создаем константу typeInput = элементу со страницы с id type
	3. создаем константу dataInput = элементу со страницы с id data
	4. условие, если при клике на filterButton значение dataInput строго равняется пустой строке,

	   тогда на dataInput вызываем метод setCustomValidity в который передаем строку,
	   которая появится в виде ошибки под dataInput и вызываем функцию showNoResults.

	   в противном случае на dataInput вызываем метод setCustomValidity в который передаем пустую строку,
	   вызываем на событии click метод preventDefault, который отменяет поведение браузера по умолчанию, которое происходит при обработке клика
	5. вызываем функцию tryFilterByType в которую передаем 2 аргумента:
	   значение typeInput обработанное методом trim, который убирает символы пробела в начале значения и в конце
	   значение dataInput обработанное методом trim
*/
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

