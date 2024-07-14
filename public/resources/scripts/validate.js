const form = document.getElementById('form');

const name_id = document.getElementById('name');
const compnay = document.getElementById('company');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message-box');




form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    let messages = [];
    event.preventDefault();
    console.log("handling data");

    checkInputs();
}

function checkInputs() {
    const enteredName = name_id.value.trim();
    const enteredCompany = compnay.value.trim();
    const enteredEmail = email.value.trim();
    const enteredPhone = phone.value.trim();
    const enteredMsg = message.value.trim();

    if(enteredName === '' || enteredName == null){
        const error_name = document.getElementById('forName');
        error_name.innerText = 'Name cannot be blank';

    } 

    if(enteredPhone === '' || enteredPhone === null){
        const error_phone = document.getElementById('forPhone');
        error_phone.innerText = 'Phone cannot be blank';
    }

    if(enteredCompany === '' || enteredCompany === null){
        const error_company = document.getElementById('forCompany');
        error_company.innerText = 'Company name cannot be blank';
    }

    if(enteredEmail === '' || enteredEmail === null){
        const error_email = document.getElementById('forEmail');
        error_email.innerText = 'Company name cannot be blank';
    }

}