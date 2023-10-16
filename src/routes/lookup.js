import express from 'express';
import { findRowInSheet } from '../handlers/googleSheetsHandler.js';

const router = express.Router();

router.get('/lookup', async (req, res) => {
    try {
        const { Name, Subject, CourseName, AppName } = req.query;
        /*
        console.log(Name, Subject, CourseName, AppName); //Debug Option
        */

        const row = await findRowInSheet(Name, Subject, CourseName, AppName);
        if (row) {
            res.json(row);
        } else {
            res.status(404).send('Not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
