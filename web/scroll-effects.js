// ==========================================
// Scroll Effects — Live 3D Scroll-Scrubbing
//
// Every animated element's depth/tilt/opacity
// is driven directly by scroll position every
// frame, like scrubbing a video, so the page
// feels like a real 3D scene you fly through
// rather than a one-time fade-in.
// ==========================================


(function(){


    const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



    if(reduceMotion) return;




    let panels = [];
    let cards = [];
    let hero = null;



    // =========================
    // Easing
    // =========================


    function easeOutCubic(t){

        return 1 - Math.pow(1 - t, 3);

    }




    function clamp01(v){

        return Math.max(0, Math.min(1, v));

    }








    // =========================
    // Collect targets
    // =========================


    function collectTargets(){


        hero =
        document.querySelector(".hero");



        panels =
        Array.from(
            document.querySelectorAll(".panel")
        );



        panels.forEach(panel=>{

            panel.classList.add("tilt");

        });




        const fields =
        Array.from(
            document.querySelectorAll(".grid .field")
        );



        const infoCards =
        Array.from(
            document.querySelectorAll(".info-grid > div")
        );



        cards =
        fields.concat(infoCards);



        cards.forEach(card=>{

            card.classList.add("tilt");

        });


    }









    // =========================
    // Progress for an element
    // entering from the bottom
    // of the viewport
    // =========================


    function depthProgress(el, vh){


        const rect =
        el.getBoundingClientRect();



        const start =
        vh * .92;



        const end =
        vh * .55;



        const raw =
        (start - rect.top) / (start - end);



        return easeOutCubic(
            clamp01(raw)
        );


    }









    // =========================
    // Main scroll/raf loop
    // =========================


    let ticking = false;



    function update(){


        const vh =
        window.innerHeight;



        const scrollY =
        window.scrollY;




        // Hero: tilts back into the distance
        // as you scroll away from the top

        if(hero){


            const heroProgress =
            1 - clamp01(
                scrollY / (vh * .8)
            );



            hero.style.setProperty(
                "--p",
                heroProgress.toFixed(3)
            );


        }






        // Panels: resolve into focus like a
        // telescope locking onto a target

        panels.forEach(panel=>{


            const p =
            depthProgress(panel, vh);



            panel.style.setProperty(
                "--p",
                p.toFixed(3)
            );


        });






        // Cards inside panels: same depth math,
        // but each card reacts to its own position
        // so they settle in a natural stagger

        cards.forEach(card=>{


            const p =
            depthProgress(card, vh);



            card.style.setProperty(
                "--p",
                p.toFixed(3)
            );


        });







        ticking = false;


    }









    function onScroll(){


        if(!ticking){


            requestAnimationFrame(update);


            ticking = true;


        }


    }









    // =========================
    // Init
    // =========================


    document.addEventListener(

        "DOMContentLoaded",

        ()=>{


            collectTargets();


            update();



            window.addEventListener(
                "scroll",
                onScroll,
                {passive:true}
            );



            window.addEventListener(
                "resize",
                onScroll
            );


        }

    );



})();
