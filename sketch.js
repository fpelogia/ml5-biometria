var btn_up;
var btn_down;
var btn_left;
var btn_right;
var btn_front;
var name_btn = ['CIMA', 'BAIXO', 'ESQUERDA', 'DIREITA', 'FRENTE'];
var cor = '#b52d24';
var status_txt = "Bloqueado";
var estado = 0;
var save_btn;
var file_inp;
var loaded_data;

let video;
let videoSize = 64;
let ready = false;

let model;
let label = '';


let start_cadastro_senha;
let end_cadastro_senha;
let testa_acesso;

let vetor = []



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
    let pg = createP("<br>");

    // Botão para salvar dados de treinamento
    train_btn = select('#download_btn');
    train_btn.mousePressed(salvaDados);

    // Entrada de arquivo com dados de treinamento
    file_inp = select("#upload_file")
    file_inp.elt.value = '';
    file_inp.changed(carregaDados);

    // Botão para treinar modelo
    train_btn = select('#train_btn');
    train_btn.mousePressed(treinaModelo);

    btn_up.mousePressed(addExample);
    btn_down.mousePressed(addExample);
    btn_left.mousePressed(addExample);
    btn_right.mousePressed(addExample);
    btn_front.mousePressed(addExample);



    //para cadastro da nova senha
    start_cadastro_senha = select('#start_pw');
    start_cadastro_senha.mousePressed(cadastra_senha);

    end_cadastro_senha = select('#end_pw')
    end_cadastro_senha.mousePressed(cadastra_senha);

    testa_acesso = select('#guess_pw');
    testa_acesso.mousePressed(testa_acesso_sistema);




    // Ativa vídeo
    video = createCapture(VIDEO, () => {ready = true});
    video.size(videoSize, videoSize);
    video.hide();

    // ML5
    let options = {
      inputs: [64, 64, 4],
      task: 'imageClassification',
      debug: true,
      learning_rate: 0.5
    };
    model = ml5.neuralNetwork(options);

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
    textAlign(LEFT, CENTER);
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

  console.log(`ADD DATA : xs =$ ${inputImage}, ys =$ ${target}`)
  console.log(inputImage)
  model.addData(inputImage, target);
}

function loaded() {
    
  model.train(
    {
      epochs: 40,
    },
    finishedTraining
  );
}

function treinaModelo(){
    model.normalizeData();
    model.train(
      {
        epochs: 40,
      },
      finishedTraining
    );
}

function salvaDados(){
    // Salva dados coletados em um arquivo .json
    model.saveData("dados-treinamento");
}

function finishedTraining() {
  console.log('training complete');
  classifyVideo();
}

function classifyVideo() {
  let inputImage = {
    image: video,
  };
  model.classify(inputImage, gotResults);
}

function gotResults(error, results) {
  if (error) {
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function carregaDados(file){
    // Carrega dados a partir de arquivo .json
    model.loadData(file_inp.elt.files);
function cadastra_senha (){
    
	console.log (label);

}



function testa_acesso_sistema (){


}