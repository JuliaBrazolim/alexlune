
class Astro {
	constructor(id, time_factor) {
		this.svg = document.getElementById(id);
		this.time_factor = time_factor;
	}
	get angle () {
		return Math.round((min/this.time_factor)%360);
	}
	update () {
		var x = parseFloat(this.svg.getAttributeNS(null, 'x'));
		var y = parseFloat(this.svg.getAttributeNS(null, 'y'));
		this.svg.setAttributeNS(null,'x',Calcs.calc_x(this.angle));
		this.svg.setAttributeNS(null,'y',Calcs.calc_y(this.angle));
	}
}

class Calcs {
	static pureMin (mm) { return mm % 60 };
	static hoursFromMin (mm) { return Math.abs(Math.round((mm/60)%24)) };
	static daysFromMin (mm) { return Math.abs(Math.round(mm/1440)) };
	static calc_x (angle) { return (Math.cos(toRadians(angle))*200)+260 };
	static calc_y (angle) { return (Math.sin(toRadians(angle))*200)+260 };
}

var min = 0;
var factor = 360000;

lua = new Astro('lua1',119);

class Wheel {
	stop = true;
	speed = document.getElementById('speed');
	static runcheck () { 
		if (stop == 0) { min += (speed.value*2) } 
		requestAnimationFrame (Wheel.runcheck);
	}
	static changeTime (fac) { min += fac }; // acessed by 'Increment' menu (min,hours,days controls)
}

var posang = document.getElementById('posang');
var terra = document.getElementById('terrain');
var terraang = 0;

function toRadians (angle) {return angle * (Math.PI / 180)}
const get_angs = function () {
	terraang = Math.round((min/4)%360);
}  

const ciclomaior = function () {
	get_angs();
	posang.innerHTML = lua.angle;
	terra.style.transform = 'rotate(' + terraang + 'deg)';
	requestAnimationFrame (ciclomaior);
}
ciclomaior();
var showluz = document.getElementById('lumus');
var sombra = document.getElementById('sombra');
var nmLabel = document.getElementById('newmoon');
var mare = 0;


const sombrapos = () => (lua.angle/1.8)-25;
const NewMoon = () => (min + 21262) % 42524;

const sec_calc = function (alfa) {
	let beta = Math.round( Math.abs(lua.angle) % 180/1.8);
	if (alfa >= 180) { 
		mare=0; 
		return beta;
	} 
	else if (alfa < 180) { 
		mare=1
		return 100-beta;
	}
	else {alert('error')}
};

const moon = function () {
	var lumus = sec_calc(lua.angle);
	var mooncx = parseFloat(sombra.getAttributeNS(null, 'cx'));
	showluz.innerHTML=lumus;
	sombra.setAttributeNS(null, 'cx', sombrapos());
	nmLabel.innerHTML = Calcs.daysFromMin(NewMoon()) + ' days,' + Calcs.hoursFromMin(NewMoon()) + ' hours';
	requestAnimationFrame (moon);
	lua.update();
}
moon();



// Animation Controller
// Controller for animation (play/pause)

animationController.innerHTML = '&#x23EF';
animationController.onclick = function () {
	stop=!stop;
	if (stop == true) {
		this.innerHTML = '&#x23EF';
	}
	else {
		this.innerHTML = '&#x23F8';
	}
}



const indispo = function () { window.alert('BRPT: Recurso ainda nao disponivel! \r\nEN: Not avaliable!')};

Wheel.runcheck();



TiDi = document.getElementById('localtime');

const displayTime = function () {
	var horario = new Date(Date.UTC(96, 1, 2, Calcs.hoursFromMin(min)+18, Calcs.pureMin(min) ));
	TiDi.innerHTML = horario.toLocaleString('sv');
	requestAnimationFrame(displayTime);
}
displayTime();

