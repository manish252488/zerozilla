import Client from "../models/client"
import Agency from "../models/agency";

export const addClient = async (req, res) => {
    try {
        const payload = req.body;
        const agency = await Agency.find({ _id: payload.agencyId });
        if (!agency) {
            res.status(400).json({ message: `Agency id not present: ${payload.agencyId}` })
        }
        const data = await Client.create(payload);
        await agency.update({ $addToSet: { clients: clientdata._id } });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateClient = async (req, res) => {
    try {
        const payload = req.body;
        const clientId = req.params.id;
        if (payload.hasOwnProperty("agencyId") && !payload.agencyId) {
            delete payload.agencyId;
        }
        const agency = await Agency.findOne({ _id: payload.agencyId });
        if(!agency || Object.keys(agency).length <= 0) {
            res.status(400).json({ message: `Agency not present: ${payload.agencyId}`});
        }
        const client = await Client.updateOne({ _id: clientId }, payload);
        res.status(200).json({ message: `Updated Client: ${clientId}`});
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const data = await Client.deleteOne({ _id: clientId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const data = await Client.findOne({ _id: clientId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAllClient = async (req, res) => {
    try {
        const data = await Client.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}