import { findRowInSheet } from '../handlers/googleSheetsHandler.js';

export const handler = async (event) => {
    const { Name, Subject, CourseName, AppName } = event.queryStringParameters;
    const row = await findRowInSheet(Name, Subject, CourseName, AppName);
    if (row) {
        return {
            statusCode: 200,
            body: JSON.stringify(row)
        };
    } else {
        return {
            statusCode: 404,
            body: 'Not found'
        };
    }
};
