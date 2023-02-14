import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

document.addEventListener('DOMContentLoaded', () => {
  const MIN = 1500000;
  const MAX = 10000000;
  const DEFAULT_AMOUNT = 3300000;
  const calculate = {
    price: 0,
    payment: 0, 
    term: 0
  };
  let percent = 13;

  const rangeSliderInit = (item, start, min, max, step, getPercent = null, setPercent = null) => { 
    const range = item.querySelector('.filter__line');

    const inputMin = item.querySelector('.min'); 

    if (!range || !inputMin) return 
  
    const inputs = [inputMin]; 
    
    noUiSlider.create(range, { 
        start: start, 
        behaviour: 'tap',
        connect: [true, false], 
        range: { 
          'min': min,
          'max': max
        },
        step: step, 
      }
    )
    
    range.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = new Intl.NumberFormat('ru-RU').format(parseInt(values[handle]));

      if(setPercent) setPercent(+values);

      if(document.querySelector('.filters__range:nth-child(3) .filter .noUi-handle.noUi-handle-lower')) {
        calculate.price = +document.querySelector('.filters__range:nth-child(1) .filter .noUi-handle.noUi-handle-lower').getAttribute('aria-valuetext');
        calculate.payment = +document.querySelector('.filters__range:nth-child(2) .filter .noUi-handle.noUi-handle-lower').getAttribute('aria-valuetext');
        calculate.term = +document.querySelector('.filters__range:nth-child(3) .filter .noUi-handle.noUi-handle-lower').getAttribute('aria-valuetext');
        calculate.month = Math.floor((calculate.price - calculate.payment) * (0.05 * Math.pow((1 + 0.05), calculate.term) / (Math.pow((1 + 0.05), calculate.term) - 1)));
        calculate.all = calculate.payment + calculate.term * +document.querySelector('.term').textContent.replace(/\s/g, '');
        
        document.querySelector('.term').textContent = new Intl.NumberFormat('ru-RU').format(calculate.month);
        document.querySelector('.sum').textContent = new Intl.NumberFormat('ru-RU').format(calculate.all);
      }
    });
    
    inputMin.addEventListener('change', function () {
      range.noUiSlider.set([this.value.replace(/\s/g, ''), null]);
    });

    if(getPercent) getPercent(range, item);
  }

  rangeSliderInit(document.querySelector('.filters__range:nth-child(1)'), DEFAULT_AMOUNT, MIN, MAX, 10000);
  rangeSliderInit(document.querySelector('.filters__range:nth-child(2)'), DEFAULT_AMOUNT / 100 * percent, DEFAULT_AMOUNT / 100 * 10, DEFAULT_AMOUNT / 100 * 60, 1000, getPercent, setPercent);
  rangeSliderInit(document.querySelector('.filters__range:nth-child(3)'), 60, 6, 120, 1);

  function getPercent(range) {
    const listenChange = document.querySelector('.filter .noUi-handle.noUi-handle-lower');

    const config = {
      attributes: true,
    };

    const observer = new MutationObserver(() => {
      range.noUiSlider.updateOptions({
        start: Number(listenChange.getAttribute('aria-valuetext')) / 100 * percent,
        range: {
            'min': Number(listenChange.getAttribute('aria-valuetext')) / 100 * 10,
            'max': Number(listenChange.getAttribute('aria-valuetext')) / 100 * 60
        }
      });
    });

    observer.observe(listenChange, config);
  }

  function setPercent(value) {
    const max =  +document.querySelector('.filter .noUi-handle.noUi-handle-lower').getAttribute('aria-valuetext');

    const output = document.querySelector('.filters__range:nth-child(2) .inp__icon');

    percent = Math.floo(value / max * 100);

    output.textContent = percent + '%';
  }

  const btn = document.querySelector('.btn');

  btn.addEventListener('click',() => {
    const json = JSON.stringify(calculate);

    btn.disabled = true;

    alert(json);
  })
});