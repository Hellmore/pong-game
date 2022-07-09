//Variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha / 2;

//Variáveis Movimentação Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variáveis Raquetes
let larguraRaquete = 10;
let alturaRaquete = 90;

//Minha Raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;

//raqueteOponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Variável colisão bolinha/raquete biblioteca
let colidiu = false;

//Variáveis placar
let meusPontos = 0;
let pontosOponente = 0;

//Variáveis sons
let raquetada;
let ponto;
let trilha;

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  movimentoBolinha();
  colisaoBolinhaBorda();
  

  Raquetes(xMinhaRaquete, yMinhaRaquete);
  movimentoMinhaRaquete();
  //colisaoBolinhaRaquete();
  colisaoBolinhaRaqueteBiblioteca(xMinhaRaquete, yMinhaRaquete);

  Raquetes(xRaqueteOponente, yRaqueteOponente);
  movimentoRaqueteOponenteMultiplayer();
  //movimentoRaqueteOponenteSolo();
  colisaoBolinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);

  placar();
  marcaPonto();
}

function bolinha() {
  fill(color(72, 209, 204));
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentoBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinhaBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function Raquetes(x, y) {
  fill(color(255, 255, 255));
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentoMinhaRaquete() {
  if (keyIsDown(87)) {
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yMinhaRaquete += 10;
  }
}

function colisaoBolinhaRaquete() {
  if (
    xBolinha - raio < xMinhaRaquete + larguraRaquete &&
    yBolinha - raio < yMinhaRaquete + alturaRaquete &&
    yBolinha + raio > yMinhaRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoBolinhaRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    larguraRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    dBolinha
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteOponenteMultiplayer() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

function movimentoRaqueteOponenteSolo() {
  calculaChanceDeErrar();
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 44) {
      chanceDeErrar = 45;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

function placar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);

  fill(color(72, 209, 204));
  rect(150, 10, 40, 20);

  fill(255);
  text(meusPontos, 170, 26);

  fill(color(72, 209, 204));
  rect(450, 10, 40, 20);

  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}
