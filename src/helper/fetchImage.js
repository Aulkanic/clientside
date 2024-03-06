// imageUtils.js
import axios from 'axios';

export const fetchImageFromProxy = async (imageUrl) => {
  try {
    const response = await axios.get('https://be-mydo.vercel.app/image-proxy', {
      params: {
        imageUrl: imageUrl,
      },
      responseType: 'blob',
    });
    return URL.createObjectURL(new Blob([response.data]));
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
