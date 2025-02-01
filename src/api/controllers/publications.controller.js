import {
    _getAllPublications,
    _getAllPublicationsByCategory,
    _getPublicationById,
    _getAllPublicationByIdUser,
    _createPublication,
    _updatePublication,
    _deletePublication
}  from '../../services/publicationsServices.js';

// Get all publications
const getAllPublications = async (res) => {
    try {
        const publications = await _getAllPublications();
        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get publication by categoryID
const getAllPublicationsByCategory = async (req, res) => {
    try {
        const publications = await _getAllPublicationsByCategory();
        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get publication by ID
const getPublicationById = async (req, res) => {
    try {
        const publication = await _getPublicationById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all publication by ID
const getAllPublicationByIdUser = async (req, res) => {
    try {
        const publication = await _getAllPublicationByIdUser(req.params.userId);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new publication
const createPublication = async (req, res) => {
    try {
        const newPublication = await _createPublication(req.body, req.file.path);
        res.status(201).json(newPublication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update publication
const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPublication = await _updatePublication(id, req.body, req.file.path);
        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete publication
const deletePublication = async (req, res) => {
    try {
        await _deletePublication(req.params.id);
        res.status(200).json({ message: 'Publication deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllPublications,
    getAllPublicationsByCategory,
    getPublicationById,
    getAllPublicationByIdUser,
    createPublication,
    updatePublication,
    deletePublication
};