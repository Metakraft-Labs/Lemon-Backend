const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const unzipper = require("unzipper");
const mime = require('mime-types');

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
});

exports.upload = async (file) => {
  await new Promise((res, rej) => {
    return file.mv(path.join(__dirname, `/uploads/${file.name}`), (err) => {
      if (err) return rej(err);
      else return res();
    })
  })
  const formData = new FormData();
  formData.append("file", fs.createReadStream(path.join(__dirname, `/uploads/${file.name}`)));
  const res = await axios.post(
    `${process.env.NEO_FS_URL}/upload/${process.env.NEO_FS_CONTAINER}`,
    formData,
    {
      headers: formData.getHeaders()
    }
  );

  fs.unlinkSync(path.join(__dirname, `/uploads/${file.name}`));

  return res?.data;
};

exports.s3 = async (file, slug) => {
  await new Promise((res, rej) => {
    return file.mv(path.join(__dirname, `/uploads/${file.name}`), (err) => {
      if (err) return rej(err);
      else return res();
    })
  })

  const zip = fs.createReadStream(path.join(__dirname, `/uploads/${file.name}`)).pipe(unzipper.Parse({ forceStream: true }));

  const promises = await uploadS3(zip, slug, []);

  await Promise.all(promises);

  await fs.unlinkSync(path.join(__dirname, `/uploads/${file.name}`));

  return true;
};

const uploadS3 = async (zip, key, promises) => {
  for await (const e of zip) {
    const entry = e;
    const fileName = entry.path;
    const type = entry.type;
    if (type === 'File') {
      const entryMimeType = mime.lookup(entryName);
      const uploadParams = {
        Bucket: "games-meta",
        Key: `games/${key}/${fileName}`,
        Body: entry,
        ContentType: entryMimeType,
      };

      promises.push(s3.send(new PutObjectCommand(uploadParams)));
    } else {
      await uploadS3(e, key + "/" + fileName)
    }
  }

  return promises;
}