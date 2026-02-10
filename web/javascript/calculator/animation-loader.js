class AnimationLoader{

    constructor(){
        this.noOfSpans = 6;
    }

    init(){
        let section = document.createElement('section');
        section.setAttribute('class', 'loaderSection');

        let loader = document.createElement('div');
        loader.setAttribute('class', 'loader');

        let spans = this.createSpanFragment(this.noOfSpans);
        loader.appendChild(spans);

        section.appendChild(loader);

        let body = document.querySelector('body');
        body.appendChild(section);
    }

    createSpanFragment(count){
        let fragment = document.createDocumentFragment();
        for (let n = 0; n < count; n++){
            let span = document.createElement('span');
            fragment.appendChild(span);
        }
        return fragment;
    }

}

let setLoader = () => {
    let loader = new AnimationLoader();
    loader.init();   
}