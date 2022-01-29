var btn_up;
var btn_down;
var btn_left;
var btn_right;
var btn_front;
var name_btn = ['CIMA', 'BAIXO', 'ESQUERDA', 'DIREITA', 'FRENTE'];
var video;
var cor = '#b52d24';
var status_txt = "Bloqueado";
var ok_brn;
var estado = 0;

function setup() {
    // Cria canvas
    var cnv = createCanvas(300, 260);
    cnv.style('margin-left', '50%');
    cnv.style('margin-top', '5%');
    // Cria botões
    criaBotao(btn_up, 0);
    criaBotao(btn_down, 1);
    criaBotao(btn_left, 2);
    criaBotao(btn_right, 3);
    criaBotao(btn_front, 4);

    ok_btn = select('#ok_btn');
    ok_btn.mousePressed(confirmaBtn);

    // Ativa vídeo
    video = createCapture(VIDEO);
    video.size(300,280);
    video.hide();

    // Pinta background
    background(cor);
}

function draw() {
    background(cor);
    image(video, 0, 0);
    textSize(20);
    text(status_txt, 95, height - 10);
}

function criaBotao(var_btn, dir){
    var_btn = createButton(name_btn[dir]);
    var_btn.id("botao");
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
