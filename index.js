const express = require('express');
const app = express();

let courses = {
    1: { id: 1, name: 'java' },
    2: { id: 2, name: 'javascript' },
    3: { id: 3, name: 'python' }
};

app.get('/courses',(req,res)=>{
    res.json(courses);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});