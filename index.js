document.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2NhbXBlYW4iLCJhIjoiY2szNDV4b3J2MDV1ODNjcGV3aTZqZjI4NCJ9.ujCY3iPtmffDnzpnqnBzGg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [26.1027202, 44.4361414], // Bucharest's default coordinates
    zoom: 2
  });

  const marker = new mapboxgl.Marker({ draggable: true })
    .setLngLat([26.1027202, 44.4361414])
    .addTo(map);

  function onDragEnd() {
    const lngAndLat = marker.getLngLat();
    alert(lngAndLat.lng + " " + lngAndLat.lat);
  }

  marker.on("dragend", onDragEnd);
});
