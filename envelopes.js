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

envRouter.get('/', (req, res, next) => {
    res.send(envelopes);
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
        res.send(envelopes);
    }
});

envRouter.put('/', (req, res, next) => {

});

envRouter.delete('/', (req, res, next) => {

});

envRouter.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status).send(err.message);
})

module.exports = envRouter;