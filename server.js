// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./taskRoutes');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect('mongodb://localhost:27017/task-management', {
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Error connecting to MongoDB:', err));
