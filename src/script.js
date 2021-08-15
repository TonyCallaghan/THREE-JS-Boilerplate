import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.SphereGeometry(.5, 64, 32);
const material = new THREE.MeshBasicMaterial ({color: 0x0011ff});
const mesh = new THREE.Mesh(geometry, material);
scene.add( mesh );

// Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add( axesHelper );

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera
// Pick one

 // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,400)
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100)

camera.position.z = 3
camera.position.y = 2
camera.position.x = 2
camera.lookAt(mesh.position)

scene.add(camera)

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// clock
const clock = new THREE.Clock()

// Animations

const tick = () => {

    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Rotate around z axis
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)
    
    // render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
