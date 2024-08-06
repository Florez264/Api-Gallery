const Photo = require('../models/Photo');

exports.uploadPhoto = async (req, res) => {
  try {
    const { filename } = req.file;
    const { description, date, lat, lng } = req.body;
    
    const photo = new Photo({
      filename,
      description,
      date: new Date(date),
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    await photo.save();
    res.json({ message: 'Foto subida con éxito', photo });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la foto', error: error.message });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    // Asegúrate de que las URLs de las imágenes sean correctas
    const photosWithUrls = photos.map(photo => ({
      ...photo._doc,
      url: `${req.protocol}://${req.get('host')}/uploads/${photo.filename}`
    }));
    res.json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las fotos', error: error.message });
  }
};

exports.getPhotosByLocation = async (req, res) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    const photos = await Photo.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    // Asegúrate de que las URLs de las imágenes sean correctas
    const photosWithUrls = photos.map(photo => ({
      ...photo._doc,
      url: `${req.protocol}://${req.get('host')}/uploads/${photo.filename}`
    }));
    res.json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las fotos por ubicación', error: error.message });
  }
};
