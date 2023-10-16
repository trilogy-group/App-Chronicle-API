import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const sheets = google.sheets('v4');
const SPREADSHEET_ID = '1A99BZ7G8YoUp866ueBvWisEHipzg6VBzhTLLv-q_rws';
const SHEET_NAME = "AppChronicle API Lookup";
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');



// Authenticate and set up the Google Sheets API client.
const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
);

/**
 * Finds a row in the Google Sheet based on the provided parameters.
 * 
 * @param {string} Name 
 * @param {string} Subject 
 * @param {string} CourseName 
 * @param {string} AppName 
 * @returns {Object|null} Returns the row as an object if found, otherwise null.
 */
export const findRowInSheet = async (Name, Subject, CourseName, AppName) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A2:I`, 
        });

        const rows = response.data.values;
        //console.log("Rows ", rows[0]); Debug option
        if (!rows || rows.length === 0) {
            return null;
        }

        // Check for matching row.
        for (let i = 0; i < rows.length; i++) { 
            const row = rows[i];
            if (
                row[1] === Name &&          // "Name" column
                row[5] === Subject &&       // "Subject" column
                row[6] === CourseName &&    // "Course Name" column
                row[7] === AppName       
            ) {
                // Convert row array to a well-formatted JSON object.
                const formattedRow = {
                    'Student & Campus ID': row[0],
                    'Name': row[1],
                    'LVL': row[2],
                    'Username': row[3],
                    'Subject': row[5],
                    'Course Name': row[6],
                    'App Name': row[7],
                    'Start': row[8],
                };
                return formattedRow;
            }
        }

        return null;
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
        throw error;
    }
};
