console.log('test');

const p1L = document.getElementById("cam1");
const p2L = document.getElementById("cam2");
const p3L = document.getElementById("cam3");
const p4L = document.getElementById("cam4");
const p5L = document.getElementById("cam5");

const p1R = document.getElementById("cam6");
const p2R = document.getElementById("cam7");
const p3R = document.getElementById("cam8");
const p4R = document.getElementById("cam9");
const p5R = document.getElementById("cam10");

nodecg.listenFor('team1Names', (data) => {

    console.log(data);

    p1L.innerText = data.p1;
    p2L.innerText = data.p2;
    p3L.innerText = data.p3;
    p4L.innerText = data.p4;
    p5L.innerText = data.p5;

})

nodecg.listenFor('team2Names', (data) => {

    p1R.innerText = data.p1;
    p2R.innerText = data.p2;
    p3R.innerText = data.p3;
    p4R.innerText = data.p4;
    p5R.innerText = data.p5;

})