(function(){


    const canvas =
    document.getElementById("skyfield");


    if(!canvas) return;



    const ctx =
    canvas.getContext("2d");



    const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;





    let width;
    let height;
    let dpr;



    let stars = [];

    let meteors = [];







    // =========================
    // Resize Canvas
    // =========================


    function resize(){


        dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );



        width =
        window.innerWidth;



        height =
        window.innerHeight;



        canvas.width =
        width * dpr;


        canvas.height =
        height * dpr;



        canvas.style.width =
        width + "px";


        canvas.style.height =
        height + "px";



        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );



        createStars();


    }









    // =========================
    // Create Stars
    // =========================


    function createStars(){



        const count =
        Math.floor(
            (width * height) / 7000
        );



        stars =
        Array.from(
            {length:count},
            ()=>({


                x:
                Math.random()*width,


                y:
                Math.random()*height,


                radius:
                Math.random()*1.4 + .3,


                alpha:
                Math.random()*.7+.2,


                speed:
                Math.random()*.02+.005,


                phase:
                Math.random()*Math.PI*2,


                drift:
                Math.random()*.15-.075


            })

        );



    }








    // =========================
    // Create Meteor
    // =========================



    function createMeteor(){



        meteors.push({



            x:
            Math.random()*width,


            y:
            -50,



            length:
            Math.random()*130+80,



            speed:
            Math.random()*8+7,



            angle:
            Math.PI/4,



            opacity:
            1,


            size:
            Math.random()*2+1


        });


    }









    let lastMeteor = 0;







    // =========================
    // Animation Loop
    // =========================



    function animate(time){



        ctx.clearRect(
            0,
            0,
            width,
            height
        );






        // Stars


        stars.forEach(star=>{



            const twinkle =

            Math.sin(
                time *
                star.speed
                +
                star.phase
            )
            *
            .35;



            const alpha =
            Math.max(
                .1,
                star.alpha + twinkle
            );





            ctx.beginPath();



            ctx.arc(

                star.x,
                star.y,
                star.radius,
                0,
                Math.PI*2

            );



            ctx.fillStyle =

            `rgba(
                255,
                255,
                255,
                ${alpha}
            )`;



            ctx.fill();





            if(!reduceMotion){


                star.y += star.drift;



                if(star.y > height)
                    star.y = 0;


                if(star.y < 0)
                    star.y = height;


            }



        });









        // Meteors


        if(
            !reduceMotion &&
            time-lastMeteor >
            3000 + Math.random()*3000
        ){


            createMeteor();


            lastMeteor=time;


        }






        meteors.forEach((meteor,index)=>{



            meteor.x +=
            Math.cos(
                meteor.angle
            )
            *
            meteor.speed;



            meteor.y +=
            Math.sin(
                meteor.angle
            )
            *
            meteor.speed;



            meteor.opacity -= .012;






            const tailX =

            meteor.x -

            Math.cos(
                meteor.angle
            )
            *
            meteor.length;





            const tailY =

            meteor.y -

            Math.sin(
                meteor.angle
            )
            *
            meteor.length;








            const gradient =

            ctx.createLinearGradient(

                meteor.x,
                meteor.y,
                tailX,
                tailY

            );





            gradient.addColorStop(

                0,

                `rgba(
                150,
                220,
                255,
                ${meteor.opacity}
                )`

            );



            gradient.addColorStop(

                1,

                "rgba(150,220,255,0)"

            );








            ctx.strokeStyle =
            gradient;



            ctx.lineWidth =
            meteor.size;



            ctx.lineCap =
            "round";



            ctx.beginPath();



            ctx.moveTo(
                meteor.x,
                meteor.y
            );



            ctx.lineTo(
                tailX,
                tailY
            );



            ctx.stroke();






            if(

                meteor.opacity <=0 ||
                meteor.y > height+100

            ){


                meteors.splice(
                    index,
                    1
                );


            }



        });









        requestAnimationFrame(
            animate
        );



    }









    window.addEventListener(
        "resize",
        resize
    );



    resize();


    requestAnimationFrame(
        animate
    );



})();