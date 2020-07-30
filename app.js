//do utworzenia animacji w three.js potrzebne są elementy: scena, kamera i renderer
const scene = new THREE.Scene();

//jest kilka rodzajów kamer - w dokumentacji jest ich więcej. Perspective Camera przjmuje 4 parametry - kąt widzenia,
//wymiary kadru, odległośc w jakiej obiekt może się znajdowac najbliżej kamery i najdalej
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);

//musze ustawić kamerę bo domyślnie jest na środku, tak jak sam obiekt
camera.position.set(3, 0, 15);

//antialias wygładza powierzchnie bryły
const renderer = new THREE.WebGL1Renderer({ antialias: true });

//razu ustawiony renderer nie zmieni dynamicznie swojego wymiaru bez przeładowania strony
renderer.setSize(window.innerWidth, window.innerHeight);

//żeby renderer został osadzony w htmlu musze go najpierw "złapać" za pomoca body i metody udostepnianej przez renderer
document.body.appendChild(renderer.domElement);

//dzięki tej funkcji okno a właściwie sam canvas będzie się dopasowywał do zmian wielkości okna, np prz otwarciu
//narzędzie developerskich, a jednocześnie camera będzie zmieniała swoje ratio po każdej takiej zmianie -
//bryła nie zmieni swojego kształtu
const handleResize = () => {
    const { innerWidth, innerHeight} = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}

//mogę sam stworzyc sobie kolor
const blueColor = new THREE.Color('hsl(240,100%,55%)');
const whiteColor = new THREE.Color('hsl(30, 100%, 100%)');
const yellowColor = new THREE.Color('hsl(40, 100%, 50%)');
const greyColor = new THREE.Color('hsl(197,10%,54%)');
const purpleColor = new THREE.Color('hsl(268,50%,34%)');

const createObject = (r = 1, color) => {
    //rodzajów geometrii jest mnóstwo - są w dokumentacji
    const planetGeometry = new THREE.SphereGeometry(r, 32, 32);
    const planetMaterial = new THREE.MeshLambertMaterial({
        color: color
    });
    //żeby stworzyc jakiś kształt w three.js trzeba stworzyć go popzez Mesha, który przyjmuje parametry
    // o kształcie i materiale tej bryły
    return new THREE.Mesh(planetGeometry, planetMaterial);
}

const planet = createObject(2, blueColor);

const moon1 = createObject(0.5, greyColor);
moon1.position.set(5, 2, -5);
const moon2 = createObject(0.3, purpleColor);
moon2.position.set(7, -1, 3);

// x = 100  // center
// y = 50   // center
// r = 50   // radius
// a = 0    // angle (from 0 to Math.PI * 2)
//
// function rotate(a) {
//
//     var px = x + r * Math.cos(a); // <-- that's the maths you need
//     var py = y + r * Math.sin(a);
//
//     document.querySelector('#point').style.left = px + "px";
//     document.querySelector('#point').style.top = py + "px";
// }
//
//
// setInterval(function() {
//     a = (a + Math.PI / 360) % (Math.PI * 2);
//     rotate(a);
// }, 5);

//tworzę sobie oświetlenie sceny
const light = new THREE.PointLight(yellowColor, 2.5);
const light2 = new THREE.PointLight(whiteColor, 2);

//ustawiam położenie światła
light.position.set(-20, -10, 10);
light2.position.set(40, 0, 20);

// const ctx = moon1.getContext('2d');

//muszę dodać bryłę i światło do sceny
scene.add(planet, moon1, moon2, light, light2);

const loop = () => {
    //obejrzeć odcinek romana o canvasie
    //po każdym wywołaniu funkcji animate animacja się zapętli, bo mam tu callback i po kazdym odświeżeniu ramki
    //ta funkcja będzie wywoływana na nowo
    requestAnimationFrame(loop);
    planet.rotation.x += 0.05;
    planet.rotation.y += 0.01;
    renderer.render(scene, camera);
}

loop();
window.addEventListener('resize', handleResize);