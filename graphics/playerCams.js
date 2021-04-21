
const p1L = document.getElementById("cam1");
const p2L = document.getElementById("cam2");
const p3L = document.getElementById("cam3");
const p4L = document.getElementById("cam4");
const p5L = document.getElementById("cam5");


nodecg.listenFor('team1Names', (data) => {

    console.log(data);

    p1L.innerText = data.p1;
    p2L.innerText = data.p2;
    p3L.innerText = data.p3;
    p4L.innerText = data.p4;
    p5L.innerText = data.p5;

})


nodecg.listenFor('updateLogos', (data) => {

    $("#teamLogo").html(`<img src="${data.team1Logo}">`)

})