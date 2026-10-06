import { Car } from '../services/car.js';

export const getAllCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const params = { status: req.query.status };

        const cars = await Car.getAllCars(page, limit, params);
        return res.status(200).json({ success: true, data: cars });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.getCarById(id);

        if (!car) {
            return res.status(404).json({ success: false, message: 'Carro não encontrado.' });
        }

        return res.status(200).json({ success: true, data: car });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const insertCar = async (req, res) => {
    try {
        const { model, licensePlate } = req.body;
        
        if (!model) {
            return res.status(400).json({ success: false, message: 'O modelo do carro é obrigatório.' });
        }

        const result = await Car.insertCar(model, licensePlate);
        return res.status(201).json({ success: true, message: 'Carro cadastrado com sucesso!', data: result });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};