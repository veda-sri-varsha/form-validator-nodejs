const express = require('express');
const app = express();

const {
    validateName,
    validateEmail,
    validatePhone,
    validatePassword
} = require('./validators');

app.use(express.json());

app.use('/', (req, res, next) => {
    // res.send("Hello");
    console.log("Hello From the Server!")
    next();
}, (req, res) => {
    res.set('Content-Type', 'text/html'); // tells the client the type of response
    res.send('<h1>Welcome to the Programming World!</h1>');
});

// app.use('/user',(req,res) => {
//   res.set('Content-Type', 'text/html'); // tells the client the type of response
//   res.send('<h1>Welcome to the Programming World!</h1>');   // sending HTML content
// });

app.post('/user', (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate all fields
    if (!validateName(name)) {
        return res.status(400).json({ error: 'Invalid name. Only letters and spaces allowed.' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid phone number. Must be a 10-digit Indian number starting with 6-9.' });
    }
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password. Must be 8+ characters with uppercase, lowercase, digit, and special character.' });
    }

    //  All valid
   const newUser = { name, email, phone };
    users.push(newUser);

    res.status(200).json({
        message: `Welcome, ${name}! Your data has been saved.`,
        user: newUser
    });
});
// Output
//Method: POST URL: http://localhost:3000/user Body → Raw → JSON:
//{
//     "message": "Welcome, Vedasri! All your data is valid.",
//     "data": {
//         "name": "Vedasri",
//         "email": "vedasri@example.com",
//         "phone": "9876543210"
//     }
// }

app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'List of all users:',
        users
    });
});
//Output:Get Method
// {
//     "message": "List of all users:",
//     "users": [
//         {
//             "name": "Vedasri",
//             "email": "vedasri@example.com",
//             "phone": "9876543210"
//         }
//     ]
// }

app.listen(3000, () => {
    console.log("Server is running on port 3000...")
});