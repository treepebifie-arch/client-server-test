import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import db from './src/config/db.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    db()
    console.log(`Server is running on http://localhost:${port}`);
});