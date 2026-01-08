import ImageKit from '@imagekit/nodejs';

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Optional debug
console.log("IMAGEKIT keys loaded:", !!process.env.IMAGEKIT_PUBLIC_KEY, !!process.env.IMAGEKIT_PRIVATE_KEY);

export default imageKit;
