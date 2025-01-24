import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

function destruct(apiObject) {
  const movie = {
    id: apiObject.id,
    ...apiObject.attributes,
  };
  return movie;
}

export async function retrieveMovies() {
  const response = await fetch(API_BASE + "/movies");
  const apiData = await response.json();
  return apiData.data.map(destruct);
}

export async function retrieveMovie(id) {
  const response = await fetch(API_BASE + "/movies/" + id);
  const apiData = await response.json();
  return destruct(apiData.data);
}
