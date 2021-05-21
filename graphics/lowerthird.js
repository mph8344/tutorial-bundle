import { gsap } from '../node_modules/gsap/index.js';

const nameplateEl = document.getElementById('nameplate');
const nameEl = document.getElementById('name');
const twitterEl = document.getElementById('twitter');
const orangeBar = document.getElementById('orangebar');

const tl = gsap.timeline();

nodecg.listenFor('showLowerthird', (newVal) => {
	nameEl.innerHTML = newVal.name;
	twitterEl.innerHTML = newVal.twitter;

	tl.set([nameplateEl, nameEl, twitterEl], { width: '' });

	tl.call(() => {
		nameEl.innerHTML = newVal.name;
		twitterEl.innerHTML = newVal.twitter;
	});

	//tl.set([nameEl], {borderBottom: "5px solid #FF5500" })
	tl.set([orangeBar], { backgroundColor: '#FF5500' });
	tl.set([nameplateEl, nameEl, twitterEl, orangeBar], { width: '' });

	tl.from(
		[nameplateEl, nameEl, twitterEl, orangeBar],
		1,
		{ width: 0, ease: 'power3.inOut', x: 0 },
		'>'
	);
});

nodecg.listenFor('hideLowerThird', () => {
	tl.to([nameplateEl, nameEl, twitterEl, orangeBar], 1, {
		width: 0,
		ease: 'power3.inOut',
		x: 0,
	});

	tl.call(() => {
		nameEl.innerHTML = '';
		twitterEl.innerHTML = '';
	});

	tl.set([nameEl, twitterEl], { borderBottom: '' });
	tl.set([nameplateEl, nameEl, twitterEl, orangeBar], { width: '0px' });
});
