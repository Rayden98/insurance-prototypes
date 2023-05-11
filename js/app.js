
// Constructors
function Security(mark, year, type){
    this.mark = mark;
    this.year = year;
    this.type = type;
};

function UI(){}             // user interface

// Make the quoting with the data
Security.prototype.quotingSecurity = function(){
    /*
        1 = American 1.15
        2 = Asian 1.05
        3 = European 1.35
    */
   let amount;
   const base = 2000;

   console.log(this.mark);
   switch(this.mark){

    case '1':
        amount = base * 1.15;
        break;
    case '2':
        amount = base * 1.05
        break;
    case '3':
        amount = base * 1.35;
        break;
    default: 
        break;
   }; 
   // Reading the year 
   const difference = new Date().getFullYear() - this.year;

   // for year times that the difference is greater, the cost will to reduce a three percent  
   amount -=((difference*3)*amount)/100;
   /*
        If the security if basic it multiplied for a thirty percent more 
        If the security if complete it multiplied for a fifty percent more

   */
  if(this.type === 'basico'){
    amount *= 1.30;
  }else{
    amount *= 1.50;
  }
  console.log(amount);
  return amount;
   
};

//Fill the option of the year
UI.prototype.FillOptions = () => {
    const max = new Date().getFullYear(),
          min = max-20;
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    };
};

// Show alets in display
UI.prototype.showMessage = (message, type) => {
    const div = document.createElement('div');
    
    if(type === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    };
    div.classList.add('message', 'mt-10');
    div.textContent = message;

    // Insert in the HTML 
    const formulary = document.querySelector('#cotizar-seguro');
    formulary.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(()=>{
        div.remove();
    },3000);
};

UI.prototype.showResult = (total, security)=>{
    const {mark, year, type} = security;
    switch(mark){
        case'1':
            textMark = 'American';
            break;
        case'2':
            textMark = 'Asian';
            break;
        case'3':
            textMark = 'Europeo';
            break;
        default:
            break;
    };

    // Create the result
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Your summary<p>
        <p class="font-bold">Mark: <span class="font-normal"> ${textMark} </span></p>
        <p class="font-bold">Year: <span class="font-normal"> ${year} </span></p>
        <p class="font-bold">Type: <span class="font-normal capitalize"> ${type} </span></p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span></p>
    `;

    const resultDiv = document.querySelector('#resultado');
    
    // Show the spinner 
    const spinner =document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(()=>{
        spinner.style.display = 'none';       //Eliminated the spinner
        resultDiv.appendChild(div); // but showing the result
    }, 3000);
};

// instantiate it
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.FillOptions();   //Fill the select with the year....
});

eventListener();
function eventListener(){
    const formulary = document.querySelector('#cotizar-seguro');
    formulary.addEventListener('submit', quotingSecurity);
};


function quotingSecurity(e){
    e.preventDefault();

    // Reading the mark selected
    const mark = document.querySelector('#marca').value;

    // Reding the year selected 
    const year = document.querySelector('#year').value;

    // Reding the type of coverage
    const type = document.querySelector('input[name="tipo"]:checked').value;
    console.log(type);

    if(mark === '' || year ==='' || type ===''){
        ui.showMessage('All the fields are required', 'error');
        return;
    };
    ui.showMessage('Quoting...', 'success');

    // Hidden the previously quotes
    const result = document.querySelector('#resultado div');
    if(result != null){
        result.remove();
    };

    // Instantiate of the Security
    const security = new Security(mark, year, type);
    const total = security.quotingSecurity();

    // Use the prototype that go to quoting. 
    ui.showResult(total,security);
};