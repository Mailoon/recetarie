import Publication from '../models/publicationsModel.js';
import { uploadImage, deleteImage, updateImage } from '../utils/cloudinaryUtils.js';

// Get all publications
const _getAllPublications = async () => {
  return await Publication.find();
};

// Get all publications by category
const _getAllPublicationsByCategory = async () => {
    return await Publication.find().populate('category');
};

// Get publication by ID
const _getPublicationById = async (id) => {
  return await Publication.findById(id);
};

// Get all publication by ID User
const _getAllPublicationByIdUser = async (userId) => {
  return await Publication.find(userId);
};

// Create new publication
const _createPublication = async (data, filePath) => {
  const { title, content, userId, category } = data;
  const result = await uploadImage(filePath);
  const newPublication = new Publication({
    title,
    content,
    userId,
    category,
    imageUrl: result.secure_url,
    cloudinaryId: result.public_id,
  });
  await newPublication.save();
  return newPublication;
};

// Update publication
const _updatePublication = async (id, data, filePath) => {
  const { title, content, user, category } = data;
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new Error('Publication not found');
  }

  let result;
  if (filePath) {
    result = await updateImage(publication.cloudinaryId, filePath);
    publication.imageUrl = result.secure_url;
    publication.cloudinaryId = result.public_id;
  }

  publication.title = title || publication.title;
  publication.content = content || publication.content;
  publication.user = user || publication.user;
  publication.category = category || publication.category;

  await publication.save();
  return publication;
};

// Delete publication
const _deletePublication = async (id) => {
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new Error('Publication not found');
  }

  await deleteImage(publication.cloudinaryId);
  await publication.remove();
};

export {
    _getAllPublications,
    _getAllPublicationsByCategory,
    _getPublicationById,
    _getAllPublicationByIdUser,
    _createPublication,
    _updatePublication,
    _deletePublication,
};