import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

document.addEventListener('DOMContentLoaded', () => {
  const rangeSliderInit = (item, start, min, max) => { // создаем функцию инициализации слайдера
    const range = item.querySelector('.filter__line'); // Ищем слайдер
    const inputMin = item.querySelector('.min'); // Ищем input с меньшим значнием
  
    if (!range || !inputMin) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок
  
    const inputs = [inputMin]; // создаем массив из меньшего и большего значения
    
    noUiSlider.create(range, { // инициализируем слайдер
        start: start, // устанавливаем начальные значения
        behaviour: 'tap',
        connect: [true, false], // указываем что нужно показывать выбранный диапазон
        range: { // устанавливаем минимальное и максимальное значения
          'min': min,
          'max': max
        },
        step: 1, // шаг изменения значений
      }
    )
    
    range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
      inputs[handle].value = parseInt(values[handle]);
    });
    
    inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
      range.noUiSlider.set([this.value, null]);
    });
  }

  rangeSliderInit(document.querySelector('.filters__range:nth-child(1)'), 3300000, 0, 4000000);
  rangeSliderInit(document.querySelector('.filters__range:nth-child(2)'), 420000, 0, 1200000);
  rangeSliderInit(document.querySelector('.filters__range:nth-child(3)'), 60, 0, 75);
});