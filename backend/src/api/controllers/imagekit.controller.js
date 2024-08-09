const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

exports.authenticateImagekit = (req, resp) => {
  var result = imagekit.getAuthenticationParameters();
  resp.send(result);
};
