// PASSWORD
function checkPassword(){
  const correctPassword = "2408"; // change this
  const input = document.getElementById("passwordInput").value;

  if(input === correctPassword){
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");
    document.getElementById("bgMusic").play();
  } else {
    document.getElementById("wrongPass").innerText = "Wrong secret 😏";
  }
}

// QUESTION TRANSITION
let currentQuestion = 0;
const questions = document.querySelectorAll(".question");

function nextQuestion(){
  questions[currentQuestion].classList.remove("active");
  currentQuestion++;
  questions[currentQuestion].classList.add("active");
}

// EMAIL JS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("loveForm").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("service_g0dlcvk","template_i6xwb23", this)
  .then(function(){
    document.getElementById("message").innerText = "Sent To Her 💖";
    fireworks();
  }, function(){
    alert("Sending failed 😢");
  });
});

// FIREWORKS
function fireworks(){
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
}

// THREE JS COSMIC BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

// STARS
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 6000; i++) {
  vertices.push(
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000)
  );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0xff69b4 });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

// HEART
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -1, -1, -2, 0);
heartShape.bezierCurveTo(-3, 2, 0, 3, 0, 5);
heartShape.bezierCurveTo(0, 3, 3, 2, 2, 0);
heartShape.bezierCurveTo(1, -1, 0, 0, 0, 0);

const extrudeSettings = { depth: 1, bevelEnabled: false };
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
scene.add(heart);

camera.position.z = 20;

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0005;
  heart.rotation.y += 0.01;
  heart.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();
