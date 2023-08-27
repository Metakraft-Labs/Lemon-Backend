const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const path = require("path");

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

  return res?.data;
};