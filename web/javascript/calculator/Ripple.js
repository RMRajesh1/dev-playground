class Ripple {

    constructor(){
        this.rippleLifeTime = 1000;     // unit : ms
    }

    makeRipple(target){
        let e = target;

        let currentRipple = e.target.querySelector('span[data-type=\'ripple\']');
        if (currentRipple) { currentRipple.remove(); }

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.setAttribute('data-type', 'ripple');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        e.target.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, this.rippleLifeTime);

    }

}