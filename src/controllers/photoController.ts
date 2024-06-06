import { Request, Response } from 'express';
import { myDataSource } from '../datasource';
import { Photo } from '../entity/photoEntity';
import { User } from '../entity/UserEntity';

async function uploadPhoto(req: Request, res: Response) {
    try {
        console.log("AA")
        const { caption } = req.body;
        const user = (req as any).user;
        // console.log(user);

        const userRepository = myDataSource.getRepository(User);
        const userEntity = await userRepository.findOne({ where: { id: user.id } });

        if (!userEntity) {
            return res.status(404).json({ message: 'User not found' });
        }

        let imageUrl: string | undefined;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newPhoto = new Photo();
        newPhoto.caption = caption;
        // newPhoto.url = `/uploads/${req.file.filename}`; // Store the image URL
        newPhoto.url = imageUrl;
        console.log(newPhoto.url);

      newPhoto.user = userEntity;
      console.log(newPhoto)

        const photoRepository = myDataSource.getRepository(Photo);
        await photoRepository.save(newPhoto);

        res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ message: 'An error occurred while uploading the photo' });
    }
};

//Function to fetch all photos for the current user

async function getAllUserPhotos(req: Request, res: Response) {

    try {
      const user = (req as any).user;

      if (!user || !user.id) {
          return res.status(400).json({ message: 'User not found in request' });
      }

      const photoRepository = myDataSource.getRepository(Photo);
      const photos = await photoRepository.find({
          where: { user: { id: user.id } },
        //   relations: ['user'],
      });

      res.status(200).json({ photos });
  } catch (error) {
      console.error('Error fetching user photos:', error);
      res.status(500).json({ message: 'An error occurred while fetching user photos' });
  }

  }

//   //for delete 

  async function deletePhoto(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const { photoId } = req.params;

      if (!user || !user.id) {
          return res.status(400).json({ message: 'User not found in request' });
      }

      const photoRepository = myDataSource.getRepository(Photo);
      const photo = await photoRepository.findOne({ where: { id: Number(photoId), user: { id: user.id } } });

      if (!photo) {
          return res.status(404).json({ message: 'Photo not found or not authorized to delete this photo' });
      }

      await photoRepository.remove(photo);

      res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
      console.error('Error deleting photo:', error);
      res.status(500).json({ message: 'An error occurred while deleting the photo' });
  }
};

// for Edit 

async function editPhoto(req: Request, res: Response) {
  try {
      const { caption } = req.body;
      const user = (req as any).user;
      const { photoId } = req.params;

      const photoRepository = myDataSource.getRepository(Photo);
      const photo = await photoRepository.findOne({ where: { id: Number(photoId), user: { id: user.id }}, relations: ['user'] });

      if (!photo) {
          return res.status(404).json({ message: 'Photo not found or not authorized to edit this photo' });
      }

      photo.caption = caption || photo.caption;

      console.log(req.file)
      if (req.file) {
        // const imagepath = await Imagepath.findOne
          photo.url = `/uploads/${req.file.filename}`;
      }

      await photoRepository.save(photo);

      res.status(200).json({ message: 'Photo updated successfully', photo });
  } catch (error) {
      console.error('Error updating photo:', error);
      res.status(500).json({ message: 'An error occurred while updating the photo' });
  }
}


//for explore
async function exploreAllPhotos(req: Request, res: Response) {
  try {
      const photoRepository = myDataSource.getRepository(Photo);
      const photos = await photoRepository.find({ relations: ['user'] });

      res.status(200).json(photos);
  } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ message: 'An error occurred while fetching all photos' });
  }
}

export { uploadPhoto, getAllUserPhotos, deletePhoto, editPhoto, exploreAllPhotos};

