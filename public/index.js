const getAllButton = document.getElementById("getAllButton");
const updateOneButton = document.getElementById("updateOneButton");
const makeNewButton= document.getElementById("makeNewButton");
const deleteOneButton= document.getElementById("deleteOneButton");
const targetEnvelopeName = document.getElementById("targetEnvelopeName");
const targetEnvelopeBudget = document.getElementById("targetEnvelopeBudget");
const displayArea = document.getElementById("displayArea");
const errorDisplayArea = document.getElementById("errorDisplay");
let envelopes = [];

//refactor out a function to Display envelope data to displayArea's innerHTML
function displayAllEnvelopes(){
    let displayEnvelopes = "";
    displayArea.innerHTML = "";
    envelopes.forEach(envelope => {
        displayEnvelopes = displayEnvelopes + ` ${envelope.name}   |   ${envelope.currentValue}/${envelope.maxCapacity} <br>`;
    });
    displayArea.innerHTML=displayEnvelopes;
}

//Make a "get paid" button that adds a numerical value to each envelope based on factors

getAllButton.addEventListener('click', async () =>{
    const response = await fetch('/envelopes');
    if(response.ok){
        envelopes = await response.json();
        displayAllEnvelopes();
        errorDisplayArea.innerHTML = "Got";
    }
});

updateOneButton.addEventListener('click', async () =>{
    //Using input data from input fields, make a PUT request to update an envelope
    const updateEnvelope = targetEnvelopeName.value;
    const updateMoney = targetEnvelopeBudget.value;
    const response = await fetch(`/envelopes?name=${updateEnvelope}&value=${updateMoney}`, {method: 'PUT'});
    if(response.ok){
        envelopes = await response.json();
        errorDisplayArea.innerHTML = "Updated";
        displayAllEnvelopes();
    }
});

makeNewButton.addEventListener('click', async () =>{
    const newEnvelope = targetEnvelopeName.value;
    const newBudget = targetEnvelopeBudget.value;
    const response = await fetch(`/envelopes?name=${newEnvelope}&value=${newBudget}`, {method: 'POST'});
    if(response.ok){
        errorDisplayArea.innerHTML = "Added!"
        envelopes = await response.json();
        displayAllEnvelopes();
    }
    //Using input data from targetEnvelopeName and targetEnvelopeBudget, make a POST request
    //to create a new envelope object and add it to the array.
});

deleteOneButton.addEventListener('click', async () =>{
    const targetEnvelope = targetEnvelopeName.value;
    const targetBudget = targetEnvelopeBudget.value;
    const response = await fetch(`/envelopes?name=${targetEnvelope}&value=${targetBudget}`, {method: 'DELETE'});
    console.log(response.ok);
    if(response.ok){
        errorDisplayArea.innerHTML = "Deleted!"
        envelopes = await response.json();
        console.log(envelopes);
        displayAllEnvelopes();     
    }
   
});
