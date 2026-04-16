import { api, requestConfig } from "../utils/config";

// Publish an user's agenda
const publishAgenda = async (data, token) => {
  const config = requestConfig("POST", data, token);
  
  try {
    const res = await fetch(api + "/agendas", config)
    .then((res) => res.json())
    .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user agendas
const getUserAgendas = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/agendas/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Agenda
const getAgenda = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/agendas/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete an agenda
const deleteAgenda = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/agendas/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update an agenda
const updateAgenda = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/agendas/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all agendas
const getAgendas = async () => {
  const config = requestConfig("GET");
  const url = api+"/agendas";
  
  try {
    const res = await fetch(url, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Search agendas by userAuth
const searchAgendas = async (query) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/agendas/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
    
    return res;
  } catch (error) {
    console.log(error);
  }
};

const agendaService = {
  publishAgenda,
  getUserAgendas,
  getAgenda,
  deleteAgenda,
  updateAgenda,
  getAgendas,
  searchAgendas,
};

export default agendaService;
