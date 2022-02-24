//becarefull .. we dont need any require here in case it pops in automatically
mapboxgl.accessToken = mapToken;  // mapToken is name of variable on show.ejs
const map = new mapboxgl.Map ({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL.... can be /mapbox/streets-v11 on change map's style
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
   
});
//add a pin to the map
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    //add marker/popup using https://docs.mapbox.com/mapbox-gl-js/api/markers/
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3> <p>${campground.location} </p>`
        )
    )
    .addTo(map) // map is the same variable above