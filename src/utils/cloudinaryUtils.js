import cloudinary from '../config/cloudinary.js';

// Función para subir una imagen a Cloudinary
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'recetario'
        });
        return result;
    } catch (error) {
        throw new Error('Error uploading image :', error);
    }
};

// Función para obtener la URL de una imagen en Cloudinary
const getImageUrl = (publicId) => {
    return cloudinary.url(publicId);
};

const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error('Error deleting image:', error);
    }
};

const updateImage = async (publicId, filePath) => {
    try {
        await deleteImage(publicId);
        const result = await uploadImage(filePath);
        return result;
    } catch (error) {
        throw new Error('Error updating image:', error);
    }
}

// Función para optimizar una imagen en Cloudinary
const optimizeImage = (publicId) => {
    return cloudinary.url(publicId, {
        transformation: [
            { width: 500, height: 500, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
        ],
    });
};

export {
    uploadImage,
    getImageUrl,
    optimizeImage,
    deleteImage,
    updateImage,
};