document.addEventListener("DOMContentLoaded", () => {
  const resultContainer = document.querySelector(".result");
  const BucharestLatitude = 44.4361414;
  const BucharestLongitude = 26.1027202;

  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2NhbXBlYW4iLCJhIjoiY2szNDV4b3J2MDV1ODNjcGV3aTZqZjI4NCJ9.ujCY3iPtmffDnzpnqnBzGg";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [BucharestLongitude, BucharestLatitude], // default coordinates
    zoom: 2
  });

  const marker = new mapboxgl.Marker({ draggable: true })
    .setLngLat([BucharestLongitude, BucharestLatitude])
    .addTo(map);

  function dayOrNightTime(sunrise, sunset) {
    const nowUTC = new Date().toUTCString();

    if (moment(sunrise).isBefore(nowUTC) && moment(nowUTC).isBefore(sunset)) {
      return "daytime 🌞";
    }

    return "nighttime 🌙";
  }

  function onDragEnd() {
    const lngAndLat = marker.getLngLat();
    sunriseSunset(lngAndLat.lat, lngAndLat.lng, "today", 0);
  }

  async function sunriseSunset(lat, lng, date, formatted) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=${formatted}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      switch (data.status) {
        case "OK":
          const { sunrise, sunset } = data.results;

          resultContainer.innerHTML = `At the location with coordinates: longitude=<em>${lng}</em> and latitude=<em>${lat}</em> is ${dayOrNightTime(
            sunrise,
            sunset
          )}.`;

          break;
        case "INVALID_REQUEST":
          resultContainer.innerHTML =
            "Latitude or longitude parameters are missing or invalid.";
          break;
        case "INVALID_DATE":
          resultContainer.innerHTML =
            "The date parameter is missing or invalid.";
          break;
        case "UNKNOWN_ERROR":
          resultContainer.innerHTML =
            "The request could not be processed due to a server error. The request may succeed if you try again";
          break;
        default:
          break;
      }
    } catch (error) {
      resultContainer.innerHTML = `Woops!! Open the browser console to see the problem.`;
      console.error(error);
    }
  }

  sunriseSunset(BucharestLatitude, BucharestLongitude, "today", 0);

  marker.on("dragend", onDragEnd);
});
