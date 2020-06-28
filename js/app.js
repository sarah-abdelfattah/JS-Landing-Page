
//Define Global Variables
const startingTime = performance.now();
const myNavBar = document.getElementById('navbar__list');
const myMain = document.getElementById('main');

let sectionCount = 4;

//START build the nav
const buildNavBar = function () {
    const sections = document.querySelectorAll('section');
    const fragment = document.createDocumentFragment();

    const addSectionLi = document.createElement('li');
    addSectionLi.classList.add('add__section', 'menu__link');
    addSectionLi.innerText = 'Add section';

    fragment.appendChild(addSectionLi);

    for (let i = 1; i <= sections.length; i++) {
        let sectionId = i;

        //create li element
        const newSectionLi = document.createElement('li');

        //add id and classes
        newSectionLi.id = sectionId;
        newSectionLi.classList.add('menu__link');

        //create link
        const link = document.createElement('a');
        link.href = '#section' + sectionId;
        link.innerText = 'Section ' + sectionId;

        //append link to li and li to frag .. which later to be appended to navbar
        newSectionLi.appendChild(link);

        fragment.appendChild(newSectionLi);
    }
    myNavBar.appendChild(fragment);
}
//FINISHED building the NavBar


/*clicking on already existing section 
--> scroll to that section 
--> activate that section 
--> highlight in NavBar 
--> deactivate rest */

//removes active class and active links
const removeAll = function () {
    //remove active section selection
    const activeSec = document.querySelector('.your-active-class');
    if (!(activeSec === null)) {
        activeSec.classList.remove('your-active-class');
    }

    //remove active section in navBar
    const activeSecLi = document.querySelector('.your-active-link');
    if (!(activeSecLi === null)) {
        activeSecLi.classList.remove('your-active-link');
    }
}

//START "activate section selection and section navbar" part
const activeSection = function (section) {
    removeAll();

    //section selection
    section.classList.add('your-active-class');

    //section navbar
    const id = section.id.slice(-1);
    const sectionLi = document.getElementById(id);
    sectionLi.classList.add('your-active-link');
    // console.log(sectionLi);

}

//scrolling
const scrollToSection = function (clickedSection) {
    const sectionId = clickedSection.slice(-1);
    const section = document.querySelector(('#section' + sectionId));
    const height = section.offsetTop - myNavBar.offsetHeight;

    scrollTo({
        top: height,
        behavior: 'smooth'
    });

    activeSection(section);
}
// FINISHED "clicking on already existing section" part

//START adding new section

const buildBody = function (sectionId) {
    //create section element
    const newSection = document.createElement('section');
    newSection.id = 'section' + sectionId;
    newSection.setAttribute('data-nav', ('Section ' + sectionId));

    //create div
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'landing__container')

    //create h2
    const newh2 = document.createElement('h2');
    newh2.innerText = 'Section ' + sectionId;

    //p
    const newp = document.createElement('p');
    newp.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus' +
        'pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget' +
        'lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac' +
        'tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam' +
        'nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis,' +
        'aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus' +
        'vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et' +
        'odio sed euismod.'

    const newp2 = document.createElement('p');
    newp2.innerText = 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit,' +
        'vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum' +
        'consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.' +

        //appending .. h2/p/p to div - div to section - section to main
        newDiv.appendChild(newh2);
    newDiv.appendChild(newp);
    newDiv.appendChild(newp2);
    newSection.appendChild(newDiv);
    myMain.appendChild(newSection);
}


const addNewSection = function () {
    sectionCount++;

    let sectionId = sectionCount;
    //create li element
    const newSectionLi = document.createElement('li');

    //add id and classes
    newSectionLi.id = sectionId;
    newSectionLi.classList.add('menu__link');

    //create link
    const link = document.createElement('a');
    link.href = '#section' + sectionId;
    link.innerText = 'Section ' + sectionId;

    newSectionLi.appendChild(link);
    myNavBar.appendChild(newSectionLi);

    buildBody(sectionId);
}

//action listener to NAV Li
myNavBar.addEventListener('click', function (evt) {
    event.preventDefault();

    //a-link was clicked
    if (evt.target.nodeName.toLowerCase() === 'a') {
        scrollToSection(evt.target.getAttribute('href'));
        return;
    }

    if (evt.target.nodeName.toLowerCase() === 'li') {
        if (evt.target.classList.contains('add__section')) {
            addNewSection();
        } else {
            //the li item itself was clicked
            scrollToSection(evt.target.querySelector('a').getAttribute('href'));
        }
    }
});

//START while scrolling
window.addEventListener('scroll', function () {
    // let fromTop = window.scrollY;
    let position = window.pageYOffset;

    const allLinks = document.querySelectorAll('.navbar__menu li a');
    allLinks.forEach((link) => {
        sectionId = link.hash;
        let sections = document.querySelector(sectionId);

        // did not reach to any yet
        if (!sections) {
            return;
        }

        // Add active class
        if (sections.offsetTop <= position + 200) {
            activeSection(sections);
        }
    });
});

buildNavBar();