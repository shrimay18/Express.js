const express = require('express');
const app = express();

app.use(express.json());
// app.use(middleware);
app.use(loggerMiddleware);
let courses = [
    { id: 1, name: 'java' },
    { id: 2, name: 'javascript' },
    { id: 3, name: 'python' }
];

app.get('/courses',(req,res)=>{
    res.json(courses);
});

app.post('/courses',(req,res)=>{
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(singleCourse);
    res.send(courses);
});

app.put('/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id is not found');
    course.name = req.body.name;
    res.send(course);
});

app.delete('/courses/:id',(req,res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = courses.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        courses.splice(userIndex, 1);
        res.status(200).send({ message: 'User deleted successfully' });
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});


function middleware(req,res,next){
    console.log('Middleware function is called');
    next();
}

function loggerMiddleware(req,res,next){
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} request from ${ip} to ${hostname}`);
    next();
}
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

