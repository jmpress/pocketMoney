const express = require('express');
const envRouter = express.Router();

const envelopes = [
    {
        id: 0,
        name: 'Rent',
        maxCapacity: 1500,
        currentValue: 0
    },
    {
        id: 1,
        name: 'Food',
        maxCapacity: 200,
        currentValue: 0
    },
    {
        id: 2,
        name: 'Utilities',
        maxCapacity: 300,
        currentValue: 0
    }

];
/* Envelope object definition:
{
    id: number,
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

envRouter.post('/', (req, res, next) => {
    const newLabel = req.query.name;
    const newBudget = req.query.value;
    if(newLabel && newBudget){
        const newEnvelope = {
            id: envelopes.length,
            name: newLabel,
            maxCapacity: newBudget,
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
        res.status(404).send()
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
    const targetLabel = req.query.name;
    //Find index of record with targetLabel is the Name
    //if -1, it does not exist, return 404
    //otherwise, remove it from the array (splice)
    res.status(204).send(envelopes);
});

envRouter.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
})

module.exports = envRouter;