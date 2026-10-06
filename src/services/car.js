import db from '../config/db.js';

const STATUS_AVAILABLE = 1;
const STATUS_UNAVAILABLE = 0;

export const Car = {
    getAllCars: (page = 1, limit = 10, params = null) => {
        if (page < 1) page = 1;
        if (limit <= 0) limit = 10;
        else if (limit > 100) limit = 100;

        let status = STATUS_AVAILABLE;
        if (params && params.status) {
            status = params.status === 'available' ? STATUS_AVAILABLE : STATUS_UNAVAILABLE;
        }

        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;
            
            // CORREÇÃO: O 'WHERE status = ?' deve vir ANTES do LIMIT e OFFSET
            const query = 'SELECT * FROM cars WHERE status = ? LIMIT ? OFFSET ?';
            
            db.query(query, [status, limit, offset], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getCarById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cars WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    insertCar: (model, licensePlate = null) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cars (model, license_plate) VALUES (?, ?)', [model, licensePlate], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    updateCar: (id, model, licensePlate) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE cars SET model = ?, license_plate = ? WHERE id = ?', [model, licensePlate, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    },
    deleteCar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE cars SET status = ? WHERE id = ?', [STATUS_UNAVAILABLE, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}