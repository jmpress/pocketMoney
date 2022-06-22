const express = require('express');
const envRouter = express.Router();

const envelopes = [
    {
        name: 'Rent',
        maxCapacity: 1500,
        currentValue: 0
    },
    {
        name: 'Food',
        maxCapacity: 200,
        currentValue: 0
    },
    {
        name: 'Utilities',
        maxCapacity: 300,
        currentValue: 0
    }

];
/* Envelope object definition:
{
    name: string,
    maxCapacity: number,  - represents the total dollar amount budgeted for this envelope
    currentValue: number  - represents how much money is actually in this envelope
}

*/

//Checks the validity of an envelope
function isValidEnvelope(req, res, next){
    req.targetLabel = req.query.name;
    req.targetBudget = req.query.value;
    let targetIndex = -1;
    for(let i = 0; i < envelopes.length; i++){
        if(envelopes[i].name === req.targetLabel){
            targetIndex = i;
        }
    }
    req.index = targetIndex;
    next();
}


envRouter.get('/', (req, res, next) => {
    res.status(200).send(envelopes);
});

envRouter.post('/', isValidEnvelope, (req, res, next) => {
    if(req.index !== -1 || req.targetBudget < 0){
        res.status(400).send();
    } else if(req.targetLabel && req.targetBudget){
        const newEnvelope = {
            name: req.targetLabel,
            maxCapacity: req.targetBudget,
            currentValue: 0
        }
        envelopes.push(newEnvelope);
        res.status(201).send(envelopes);
    } else {
        res.status().send();
    }
});

envRouter.put('/', isValidEnvelope, (req, res, next) => {
    if(req.index === -1){
        res.status(404).send();
    } else {
        envelopes[req.index].currentValue += Number(req.targetBudget);
        if(envelopes[req.index].currentValue > envelopes[req.index].maxCapacity){
            envelopes[req.index].currentValue = envelopes[req.index].maxCapacity;
        }
        if(envelopes[req.index].currentValue < 0){
            envelopes[req.index].currentValue = 0;
        }
        
        res.status(200).send(envelopes);
    }
});

envRouter.delete('/', isValidEnvelope, (req, res, next) => {
    if(req.index === -1){
        res.status(404).send();
    } else {
        //otherwise, remove it from the array (splice)
        envelopes.splice(req.index, 1);
        res.status(200).send(envelopes);    
    }
});

envRouter.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
})

module.exports = envRouter;