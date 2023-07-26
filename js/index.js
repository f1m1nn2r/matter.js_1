var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create();

var canvasSize = {
    width : 360,
    height : window.innerHeight
}

var render = Render.create({
    element : document.querySelector('.matter_wrap'),
    engine : engine,
    options : {
        ...canvasSize,
        wireframes : false,
        background : 'black',
    }
});

function rectangle(width, height){
    width = 100;
    height = 50;

    const loadImage = (url, onSuccess) => {
        const image = new Image();
        image.src = url; 
        image.onload = () => {
            onSuccess(image.src);
        }
    }

    var BgColor = ['gray', 'blue', 'lightgreen', 'white'];
    for(let i=0; i<10; i++){
        let x = Math.random() * 180 ;
        let y = Math.random() * canvasSize.width / 2 ;
        setTimeout(() => {
            loadImage(
                // https://www.flaticon.com/packs/mothers-day-241
                `/assets/img/test${i + 1}.png`,
                url => {
                    var square = Bodies.rectangle(
                        x, y, width, height,
                        {
                            //chamfer : {radius : 25},
                            render : {
                                fillStyle : BgColor[i],
                                sprite : {
                                    texture : url,
                                }
                            },
                        }
                    );
                    World.add(engine.world, [square]);
                }
            );
        }, i * 200);
    }

    var leftWall = Bodies.rectangle(
        -60, window.innerHeight - 200, 30, canvasSize.height, 
        {
            isStatic : true,
            render : {
                fillStyle : 'black'
            }
        }
    )
    var rightWall = Bodies.rectangle(
        420, window.innerHeight - 200, 30, canvasSize.height, 
        {
            isStatic : true,
            render : {
                fillStyle : 'black'
            }
        }
    )
    var bottomWall = Bodies.rectangle(
        0, window.innerHeight - 200, window.innerWidth * 2, 50,
        {
            isStatic : true,
            render : {
                fillStyle : 'black',
            }
        }    
    )

    World.add(engine.world, [bottomWall, leftWall, rightWall]);
    Engine.run(engine);
    Render.run(render);
}
rectangle();

function windowOnResize(){
    document.querySelector('canvas').width = 360;
    document.querySelector('canvas').height = window.innerHeight;
}

window.addEventListener('resize', windowOnResize, false);

