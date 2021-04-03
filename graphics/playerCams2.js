
const p1R = document.getElementById("cam6");
const p2R = document.getElementById("cam7");
const p3R = document.getElementById("cam8");
const p4R = document.getElementById("cam9");
const p5R = document.getElementById("cam10");


nodecg.listenFor('team2Names', (data) => {

    p1R.innerText = data.p1;
    p2R.innerText = data.p2;
    p3R.innerText = data.p3;
    p4R.innerText = data.p4;
    p5R.innerText = data.p5;

})