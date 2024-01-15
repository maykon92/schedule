import { api, requestConfig } from "../utils/config";

// Publish an user's archive
const publishArchive = async (data, token) => {
  const config = requestConfig("POST", data, token, true);
  
  try {
    const res = await fetch(api + "/archives", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user archives
const getUserArchives = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/archives/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Archive
const getArchive = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/archives/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete an archive
const deleteArchive = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/archives/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update an archive
const updateArchive = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/archives/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all archives
const getArchives = async () => {
  const config = requestConfig("GET");
  const url = api+"/archives";
  
  try {
    const res = await fetch(url, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Search archives by title
const searchArchives = async (query) => {
  const config = requestConfig("GET");
  
  try {
    const res = await fetch(api + "/archives/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
    
    return res;
  } catch (error) {
    console.log(error);
  }
};

const archiveService = {
  publishArchive,
  getUserArchives,
  getArchive,
  deleteArchive,
  updateArchive,
  getArchives,
  searchArchives,
};

export default archiveService;
