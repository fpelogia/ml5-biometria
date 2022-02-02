var btn_up;
var btn_down;
var btn_left;
var btn_right;
var btn_front;
var name_btn = ['CIMA', 'BAIXO', 'ESQUERDA', 'DIREITA', 'FRENTE'];
var cor = '#b52d24';
var status_txt = "Bloqueado";
var ok_brn;
var estado = 0;

let video;
let videoSize = 64;
let ready = false;

let pixelBrain;
let label = '';

function setup() {
    // Cria canvas
    var cnv = createCanvas(350, 300);
    cnv.style('margin-left', '50%');
    cnv.style('margin-top', '5%');
    let p = createP('<br>Cadastre suas fotos para treinamento do modelo:');
    p.style('font-size', '16px');
    // Cria botões
    btn_up = criaBotao(btn_up, 0);
    btn_down = criaBotao(btn_down, 1);
    btn_left = criaBotao(btn_left, 2);
    btn_right = criaBotao(btn_right, 3);
    btn_front = criaBotao(btn_front, 4);

    // Gambiarra (corrigir melhorando CSS)
    let pg = createP("<br><br><br>");

    // Botão para treinar modelo
    train_btn = select('#train_btn');
    train_btn.mousePressed(treinaModelo);

    btn_up.mousePressed(addExample);
    btn_down.mousePressed(addExample);
    btn_left.mousePressed(addExample);
    btn_right.mousePressed(addExample);
    btn_front.mousePressed(addExample);


    // Ativa vídeo
    video = createCapture(VIDEO, () => {ready = true});
    video.size(videoSize, videoSize);
    video.hide();

    // ML5
    let options = {
      inputs: [64, 64, 4],
      task: 'imageClassification',
      debug: true,
    };
    pixelBrain = ml5.neuralNetwork(options);

    // Pinta background
    background(cor);
}

function draw() {
    background(cor);
    image(video, 0, 0);
    textSize(20);
    text(status_txt, 95, height - 10);
     
    if (ready) {
      image(video, 0, 0, 350, 270);
    }

    textSize(20);
    textAlign(LEFT, LEFT);
    fill("green");
    text(label, 5, 20);
    fill(255);
}

function criaBotao(var_btn, dir){
    var_btn = createButton(name_btn[dir]);
    var_btn.id("botao"); //talvez seja melhor usar classe
    return var_btn;
}

function confirmaBtn(){
    if(estado == 0){
        cor = '#39b524';
        status_txt = 'Desbloqueado';    
    }else{
        cor = '#b52d24';
        status_txt = 'Bloqueado';
    }
    estado = 1 - estado;

}

function addExample() {
  var label = this.elt.innerText;
  let inputImage = {
    image: video,
  };
  let target = {
    label,
  };
  console.log('Novo exemplo: ' + label);
  pixelBrain.addData(inputImage, target);
}

function loaded() {
  pixelBrain.train(
    {
      epochs: 50,
    },
    finishedTraining
  );
}
function treinaModelo(){
    pixelBrain.normalizeData();
    pixelBrain.train(
      {
        epochs: 50,
      },
      finishedTraining
    );
}

function finishedTraining() {
  console.log('training complete');
  classifyVideo();
}

function classifyVideo() {
  let inputImage = {
    image: video,
  };
  pixelBrain.classify(inputImage, gotResults);
}

function gotResults(error, results) {
  if (error) {
    return;
  }
  label = results[0].label;
  classifyVideo();
}

