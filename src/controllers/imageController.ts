// // src/controllers/imageController.ts
// import { Request, Response } from 'express';
// import { myDataSource } from '../datasource';
// import { Image } from '../entity/imageEntity';

// export const insertImageUrl = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { imageUrl } = req.body;

//     if (!imageUrl) {
//       res.status(400).send('Missing image URL');
//       return;
//     }

//     const imageRepository = getRepository(Image);
//     const image = new Image();
//     image.imageUrl = imageUrl;

//     await imageRepository.save(image);

//     res.status(201).json({ message: 'Image URL inserted successfully', image });
//   } catch (error) {
//     console.error('Error inserting image URL:', error);
//     res.status(500).json({ message: 'An error occurred while inserting the image URL' });
//   }
// };

