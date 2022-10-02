const regresar = () => {
    location.href = '../views/menuJuegos.html';
}


/*
    Repositorio Original del creador: https://github.com/accesibleprogramacion/snake
*/

//Referencias HTML
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

//Configuración del juego
const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare : 2,
}

const directions = {
    ArrowUp    : -10,
    ArrowDown  : 10,
    ArrowRight : 1,
    ArrowLeft  : -1,
}

//Variables del juego
let snake;
let score;
let direction;
let boardSquares; //Aqui tengo mi arrego de 10x10 lleno de '0'
let emptySquares;
let moveInterval;


const drawSnake = () =>{
    snake.forEach( (square) => drawSquare (square, 'snakeSquare') );
}

const drawSquare = (square, type) => {
// square: posicion del cuadrado,
// type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
    const [ row, column ] = square.split(''); //La funcion split corta  el valor que asignamos del string y los valores restantes los asigna en un arreglo, para mayor entendimiento https://www.w3schools.com/jsref/jsref_split.asp   || y por otro lado la notación de la izquierda es para asignar directo los valores a una variable y no en un arreglo (myArray[0] = row , myArray[1] = column )
    boardSquares[row][column] = squareTypes[type]; //Accede a la posicion del board y lo actualiza y la parte derecha trae el nombre de la propiedad del objeto, por lo que devuelve su contenido osea, el numero (0empty,1snake,2food)

    //Ahora toca actualizar el html
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class',`square ${type}`);
    
    if(type === 'emptySquare'){
        emptySquares.push(square);
    }else{
        if(emptySquares.indexOf(square) !== -1){ //si lo contiene entonces hay que quitarlo
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}

const moveSnake = () =>{
    //Me va a obtener la posición de hacia donde se esta moviendo mi serpiente, saca la cabezita y le suma la ultima posicion a la que precionamos, en caso de que la posicion sea de 1 digitos le va a agregar un 0 al inicio para obtener bien el ID
    const newSquare = String(Number(snake[snake.length-1]) + directions[direction] ).padStart(2,'0');
    const [row,column] = newSquare.split('');

    if (newSquare < 0 ||
        newSquare > boardSize*boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9) ||
        boardSquares[row][column] === squareTypes.snakeSquare){
            //LO QUE ESTA DENTRO DE ESTE IF SON CONDICIONES POR SI PIERDO, SI EL NEWSQUARE ES MENOR A 0 ESTOY FUERA DEL TABLERO SI ES MAYOR A LA TALLA DEL TABLERO POR LA TALLA DEL TABLERO, IGUAL ME PASE, SI VOY HACIA LA DERECHA Y DERREPENTE MI COLUMNA ES CERRO ES QUE LLEGUE AL BORDE Y ASI Y SI EL SQUARE QUE ESTOY ES DE TIPO SNAKE PUES TERMINA EL JUEGO
        gameOver();
    }else{
        snake.push(newSquare); //si no perdi pasan dos cosas, comi algo o simplemente me movi
        if (boardSquares[row][column] === squareTypes.foodSquare){ // si el cuadrado en el que estoy es de comida
            addFood();
        }else{
            const emptySquare = snake.shift(); // caso contrario saco el primer elemento de mi arreglo con unshift y mando a llamar a drawSquare con el emptySquare para que borre ese
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake();
    }
}

const addFood = () =>{
    //me añado comida, subo mi score
    score++;
    updateScore(); // lo actualizo
    createRandomFood(); // y creo otra comida random
}

const gameOver = () =>{
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval)
    startButton.disabled = false;
}

const setDirection = (newDirection) => {
    direction = newDirection;
}

const directionEvent = (key) =>{
    switch(key.code){
        //AQUI TENGO PURO PINSHI ?: QUE ES EN JAVA, PURO ASIGNADOR NO ME ACUERDO XD TERNARIO 
        //Si la dirrecion es diferente a, entonces has tal
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
    }
}

const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length )]; //AQUI ME REGRESA UN NUMERO ENTRE 0 Y EL ULTIMO LUGAR DEL ARRAY
    drawSquare(randomEmptySquare,'foodSquare');
    
}

const updateScore = () => {
    scoreBoard.innerText = score;
}

const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => { //row es fila
        boardSquares.forEach( (column, columnIndex) => {
            //AQUI VOY A PASAR POR MI PRIMERA FILA Y VOY A PASAR POR TODAS MIS COLUMNAS Y VOY A CREAR UN DIV QUE VA A SER UN CUADRADO DEL TABLERO
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class','square emptySquare');
            squareElement.setAttribute('id',squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    } )
}


const setGame = () =>{
    snake = ['32','33'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from( Array (boardSize ), () => new Array(boardSize).fill(squareTypes.emptySquare) );
    // El Array.from, crea un arreglo de un objeto, en este caso,esta creando un arreglo de el tamaño del boardSize, el segundo parametro es basicamente un mapSet, que es lo que se desea que tenga adentro cada objeto del arreglo, en este caso queremos que tenga otro arreglo para crear el arreglo de dos dimensiones y con el fill, le estamos colocando el valor de 0 a todo
    console.log(boardSquares);

    //Como esta funcion es usada para iniciar el juego y reiniciarlo colocamos
    board.innerHTML = ''; //Para borrar lo que tenga el jugador
    emptySquares    = []; //Para quitar el progreso que se rellena a medida que usamos nuestro tablero

    //SE CREA MI TABLERO
    createBoard();
}

const startGame = () => {
    setGame();

    //Una vez se inicie un nuevo juego, se oculta la señal de que perdimos y el boton se vuelve impulsable
    gameOverSign.style.display = 'none';
    startButton.disabled = true;

    drawSnake();
    updateScore();
    createRandomFood();

    document.addEventListener('keydown', directionEvent) //ESTO ESTA POTENTISIMO, TE PASA EL CODIGO DE LA LETRA QUE ES PRESIONADO POR EL USUARIO como por ejemplo 'KeyA'

    moveInterval = setInterval( () => moveSnake(), gameSpeed);
}

startButton.addEventListener('click',startGame);