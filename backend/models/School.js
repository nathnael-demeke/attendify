import { query } from '../config/mysql-connection.js';

class School {
    static async getAllStudentsCount(schoolID) {
        const result = await query(
            'select count(id) as total_students from students where school_id = ?',
            [schoolID]
        );
        return result[0]['total_students'];
    }
}

export default School;
