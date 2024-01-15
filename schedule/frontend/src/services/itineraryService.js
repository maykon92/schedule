import { api, requestConfig } from "../utils/config";

// Publish an user's itinerary
const publishItinerary = async (data, token) => {
  const config = requestConfig("POST", data, token);
  
  try {
    const res = await fetch(api + "/itinerarys", config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user itinerarys
const getUserItinerarys = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/itinerarys/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Itinerary
const getItinerary = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/itinerarys/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete an itinerary
const deleteItinerary = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/itinerarys/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update an itinerary
const updateItinerary = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/itinerarys/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all itinerarys
const getItinerarys = async () => {
  const config = requestConfig("GET");
  const url = api+"/itinerarys";
  
  try {
    const res = await fetch(url, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Search itinerarys by userAuth
const searchItinerarys = async (query) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/itinerarys/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
    
    return res;
  } catch (error) {
    console.log(error);
  }
};

const itineraryService = {
  publishItinerary,
  getUserItinerarys,
  getItinerary,
  deleteItinerary,
  updateItinerary,
  getItinerarys,
  searchItinerarys,
};

export default itineraryService;
