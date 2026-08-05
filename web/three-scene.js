// ==========================================
// three-scene.js
//
// A real WebGL 3D scene, separate from the
// 2D skyfield canvas (which is left untouched).
// The camera physically flies forward through
// a nebula-filled starfield as the page is
// scrolled, passing a glowing STAR and arriving
// at a large, detailed spiral GALAXY.
//
// Loaded as a classic script (not type="module")
// on purpose: module scripts are blocked by CORS
// when the page is opened directly via file://,
// which breaks it on a plain double-click open.
// THREE is available as a global here because
// three.min.js is loaded via a normal <script> tag
// right before this file in index.html.
// ==========================================



(function(){


    if(typeof THREE === "undefined"){

        console.warn(

            "[three-scene] THREE is not defined — " +
            "the three.js CDN script did not load " +
            "(check your internet connection or the " +
            "script tag in index.html). The 3D scene " +
            "will not render, but the rest of the site " +
            "is unaffected."

        );

        return;

    }



    const canvas =
    document.getElementById("scene3d");


    if(!canvas) return;



    const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;




    // How far (in 3D world units) the camera
    // travels for a full page scroll

    const FLIGHT_DISTANCE = 2500;



    // Where each showcase object sits along the flight
    // (only two stops now — the star, then the galaxy
    // at the very end of the journey)

    const STAR_Z   = -900;
    const GALAXY_Z = -2300;







    // =========================
    // Renderer / Scene / Camera
    // =========================


    const renderer = new THREE.WebGLRenderer({

        canvas,
        alpha:true,
        antialias:true

    });



    renderer.setPixelRatio(

        Math.min(window.devicePixelRatio || 1, 2)

    );



    const scene =
    new THREE.Scene();



    scene.fog =
    new THREE.FogExp2(0x030512, 0.00048);



    const camera =
    new THREE.PerspectiveCamera(

        60,

        window.innerWidth / window.innerHeight,

        0.1,

        7000

    );



    camera.position.set(0, 0, 0);







    // =========================
    // Soft radial texture, generated on
    // an offscreen canvas — used for the
    // nebula dust and every glow/bloom sprite
    // =========================


    function makeGlowTexture(r, g, b){


        const size = 256;


        const c =
        document.createElement("canvas");


        c.width = c.height = size;



        const ctx =
        c.getContext("2d");



        const grad =
        ctx.createRadialGradient(

            size/2, size/2, 0,
            size/2, size/2, size/2

        );



        grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(.35, `rgba(${r},${g},${b},.55)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);



        ctx.fillStyle = grad;


        ctx.fillRect(0, 0, size, size);



        const tex =
        new THREE.CanvasTexture(c);


        tex.needsUpdate = true;


        return tex;


    }




    const glowTex = {

        white:  makeGlowTexture(255, 250, 240),
        cyan:   makeGlowTexture(120, 225, 255),
        violet: makeGlowTexture(190, 130, 255),
        gold:   makeGlowTexture(255, 190, 90)

    };







    // =========================
    // Starfield (real 3D points)
    // =========================


    function buildStarfield(){


        const count = 4200;



        const positions =
        new Float32Array(count * 3);


        const colors =
        new Float32Array(count * 3);



        const palette = [

            [0.97, 0.98, 1.0],   // white
            [0.30, 0.85, 1.0],   // cyan
            [0.70, 0.42, 1.0],   // violet
            [1.0, 0.78, 0.34]    // gold

        ];



        for(let i=0; i<count; i++){


            const ix = i*3;



            positions[ix]   = (Math.random()-.5) * 1700;
            positions[ix+1] = (Math.random()-.5) * 1700;
            positions[ix+2] = -Math.random() * (FLIGHT_DISTANCE + 900);



            const c =
            palette[

                Math.floor(
                    Math.random() * palette.length
                )

            ];



            colors[ix]   = c[0];
            colors[ix+1] = c[1];
            colors[ix+2] = c[2];


        }




        const geometry =
        new THREE.BufferGeometry();



        geometry.setAttribute(

            "position",

            new THREE.BufferAttribute(positions, 3)

        );



        geometry.setAttribute(

            "color",

            new THREE.BufferAttribute(colors, 3)

        );




        const material =
        new THREE.PointsMaterial({

            size:3.4,

            sizeAttenuation:true,

            vertexColors:true,

            transparent:true,

            opacity:.95,

            blending:THREE.AdditiveBlending,

            depthWrite:false

        });



        return new THREE.Points(geometry, material);


    }




    const starfield =
    buildStarfield();


    scene.add(starfield);







    // =========================
    // Nebula dust — big soft sprites
    // drifting through the flight path
    // =========================


    function buildNebula(){


        const group =
        new THREE.Group();



        const colorKeys =
        ["cyan", "violet", "gold"];



        const count = 26;



        for(let i=0; i<count; i++){


            const key =
            colorKeys[i % colorKeys.length];



            const sprite =
            new THREE.Sprite(

                new THREE.SpriteMaterial({

                    map:glowTex[key],

                    transparent:true,

                    opacity:Math.random()*.16 + .07,

                    blending:THREE.AdditiveBlending,

                    depthWrite:false

                })

            );



            const scale =
            Math.random() * 900 + 500;



            sprite.scale.set(scale, scale, 1);



            sprite.position.set(

                (Math.random()-.5) * 2400,
                (Math.random()-.5) * 1400,
                -Math.random() * (FLIGHT_DISTANCE + 600)

            );



            sprite.userData.drift =
            (Math.random()-.5) * .04;



            sprite.userData.baseOpacity =
            sprite.material.opacity;



            group.add(sprite);


        }



        return group;


    }




    const nebula =
    buildNebula();


    scene.add(nebula);







    // =========================
    // Bloom helper — attaches a soft
    // additive glow sprite behind a mesh
    // =========================


    function attachGlow(target, key, scale){


        const sprite =
        new THREE.Sprite(

            new THREE.SpriteMaterial({

                map:glowTex[key],

                transparent:true,

                opacity:.85,

                blending:THREE.AdditiveBlending,

                depthWrite:false

            })

        );



        sprite.scale.set(scale, scale, 1);



        target.add(sprite);



        return sprite;


    }







    // =========================
    // STAR showcase — a single bright
    // sun with a pulsing corona
    // =========================


    function buildStarObject(){


        const group =
        new THREE.Group();



        const core =
        new THREE.Mesh(

            new THREE.SphereGeometry(58, 48, 48),

            new THREE.MeshBasicMaterial({ color:0xfff6e2 })

        );


        group.add(core);



        // Tight inner glow, right against the surface

        const innerGlow =
        attachGlow(group, "white", 260);



        // Big soft outer corona -- the main sun's halo

        const corona =
        attachGlow(group, "gold", 620);



        // Wide, faint atmosphere for extra depth

        const halo =
        attachGlow(group, "gold", 980);

        halo.material.opacity = .28;



        // A handful of flare sprites scattered near
        // the surface, for a solar-flare sparkle

        const flares = [];

        for(let i=0; i<5; i++){

            const flare =
            attachGlow(group, "white", 70 + Math.random()*40);

            flare.material.opacity = .5;

            const a = Math.random() * Math.PI * 2;
            const r = 60 + Math.random() * 20;

            flare.position.set(
                Math.cos(a) * r,
                Math.sin(a) * r,
                (Math.random()-.5) * 30
            );

            flares.push(flare);

        }



        group.position.set(260, 90, STAR_Z);


        return {group, corona, innerGlow, halo, flares};


    }




    const starObj =
    buildStarObject();


    scene.add(starObj.group);







    // =========================
    // GALAXY showcase — a rotating
    // spiral of particles
    // =========================


    function buildGalaxyObject(){


        const group =
        new THREE.Group();



        const arms = 4;

        const count = 4600;



        const positions =
        new Float32Array(count * 3);


        const colors =
        new Float32Array(count * 3);



        // Hot white-gold bulge at the core,
        // fading out to cool violet-blue at the rim

        const core   = [1.0, 0.92, 0.78];
        const mid    = [0.85, 0.55, 1.0];
        const outer  = [0.35, 0.55, 1.0];



        for(let i=0; i<count; i++){


            const ix = i*3;



            const arm =
            i % arms;



            const t =
            Math.random();



            const angle =

                (arm / arms) * Math.PI * 2 +
                t * Math.PI * 4.4 +
                (Math.random()-.5) * .4;



            const radius =
            t * 520;



            const spread =
            (Math.random()-.5) * 34 * (1 - t*.5);



            positions[ix]   = Math.cos(angle) * radius + spread;
            positions[ix+1] = (Math.random()-.5) * 18 * (1 - t*.6);
            positions[ix+2] = Math.sin(angle) * radius + spread;



            const mix =
            Math.min(1, radius / 520);


            if(mix < .3){

                const m = mix / .3;

                colors[ix]   = core[0] + (mid[0]-core[0]) * m;
                colors[ix+1] = core[1] + (mid[1]-core[1]) * m;
                colors[ix+2] = core[2] + (mid[2]-core[2]) * m;

            }

            else{

                const m = (mix - .3) / .7;

                colors[ix]   = mid[0] + (outer[0]-mid[0]) * m;
                colors[ix+1] = mid[1] + (outer[1]-mid[1]) * m;
                colors[ix+2] = mid[2] + (outer[2]-mid[2]) * m;

            }


        }




        const geometry =
        new THREE.BufferGeometry();


        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));




        const points =
        new THREE.Points(

            geometry,

            new THREE.PointsMaterial({

                size:6,

                sizeAttenuation:true,

                vertexColors:true,

                transparent:true,

                opacity:.92,

                blending:THREE.AdditiveBlending,

                depthWrite:false

            })

        );



        group.add(points);



        // Bright galactic bulge — a small dense core

        const bulge =
        new THREE.Mesh(

            new THREE.SphereGeometry(30, 32, 32),

            new THREE.MeshBasicMaterial({ color:0xfff2d0 })

        );


        group.add(bulge);



        // Layered glow: tight bulge light, then the
        // big violet halo that reads from a distance

        attachGlow(group, "gold", 240);

        attachGlow(group, "violet", 780);

        const outerHalo =
        attachGlow(group, "violet", 1300);

        outerHalo.material.opacity = .22;



        group.rotation.x =
        Math.PI * .18;



        group.position.set(-320, -50, GALAXY_Z);


        return {group, points, bulge};


    }




    const galaxyObj =
    buildGalaxyObject();


    scene.add(galaxyObj.group);








    // =========================
    // Resize
    // =========================


    function resize(){


        const w = window.innerWidth;
        const h = window.innerHeight;



        camera.aspect = w / h;


        camera.updateProjectionMatrix();



        renderer.setSize(w, h);


    }




    window.addEventListener("resize", resize);


    resize();







    // =========================
    // Scroll -> camera flight
    // =========================


    let scrollFraction = 0;



    function updateScrollFraction(){


        const max =
        document.documentElement.scrollHeight
        -
        window.innerHeight;



        scrollFraction =
        max > 0 ?

        Math.min(1, Math.max(0, window.scrollY / max)) :

        0;


    }




    if(!reduceMotion){


        window.addEventListener(

            "scroll",

            updateScrollFraction,

            {passive:true}

        );


    }




    updateScrollFraction();







    // =========================
    // Gentle mouse parallax
    // =========================


    let mouseX = 0;
    let mouseY = 0;



    if(!reduceMotion){


        window.addEventListener("pointermove", (e)=>{


            mouseX =
            (e.clientX / window.innerWidth - .5) * 2;



            mouseY =
            (e.clientY / window.innerHeight - .5) * 2;


        });


    }







    // =========================
    // Render loop
    // =========================


    let time = 0;



    function animate(){


        time += 0.01;




        const z =
        -scrollFraction * FLIGHT_DISTANCE;




        camera.position.z = z;



        camera.position.x =

            Math.sin(scrollFraction * Math.PI * 2) * 42
            +
            mouseX * 26;



        camera.position.y =

            Math.cos(scrollFraction * Math.PI * 3) * 20
            +
            mouseY * 16;



        camera.lookAt(

            mouseX * 12,

            mouseY * 8,

            z - 320

        );



        camera.rotation.z =
        Math.sin(scrollFraction * Math.PI * 2) * .035;




        starfield.rotation.y +=
        0.0006;


        starfield.rotation.x +=
        0.0002;




        nebula.children.forEach((sprite, i)=>{


            sprite.rotation.z +=
            sprite.userData.drift * .01;


            sprite.material.opacity =

                sprite.userData.baseOpacity +

                Math.sin(time * .2 + i) * .04;

        });




        starObj.group.rotation.y +=
        0.002;


        const starPulse =
        1 + Math.sin(time * 1.6) * .08;


        starObj.corona.scale.set(

            620 * starPulse,
            620 * starPulse,
            1

        );


        const haloPulse =
        1 + Math.sin(time * .9) * .05;


        starObj.halo.scale.set(

            980 * haloPulse,
            980 * haloPulse,
            1

        );


        starObj.flares.forEach((flare, i)=>{

            flare.material.opacity =

                .3 + Math.abs(Math.sin(time * 1.2 + i * 1.7)) * .35;

        });




        galaxyObj.group.rotation.y +=
        0.0015;


        galaxyObj.bulge.scale.set(

            1 + Math.sin(time * 1.1) * .06,
            1 + Math.sin(time * 1.1) * .06,
            1 + Math.sin(time * 1.1) * .06

        );




        renderer.render(scene, camera);




        if(!reduceMotion){


            requestAnimationFrame(animate);


        }


    }




    if(reduceMotion){


        // Single calm frame, camera parked
        // partway down the flight path so the
        // scene still reads, no motion at all

        scrollFraction = .35;


        animate();


    }


    else{


        requestAnimationFrame(animate);


    }



})();
