//strokeWeight()画笔大小
//background(,)背景颜色，可以达到残影效果
//line(,,,,)画线
//translate(,)
//rotate()弧度制
//radians()角度转弧度
//scale(,)
//push()和pop()之间受translate,rotate,scale影响(也写在里面)，这样之外的不受影响
//millis()获取毫秒数

var StartString = "F";
var now = StartString;
var times = 10;
var type = 0;
var showType = "FF+[+FFF]-[-F+F+F]";
var type0 = "FF+[+FFF]-[-F+F+F]";
var type1 = "G-[[F]+F]+G[+GF]-F";
var type2 = "G[+F][-F]GF";
var type3 = "G[+F]G[-F+F]";

var length = -11;
var theta = PI / 12.0;
var dlength = -1;
var dtheta = PI / 36.0;
function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);//创建画布
    setColor();
    theta = PI / 12.0;
}
function draw() {
    // put drawing code here
    background(255,90);
    push();
    translate(windowWidth *1.15/ 2, windowHeight);
    Render(length, theta);
    pop();
    setButton();
}
function mouseClicked() {
    if (mouseX > 287 && mouseX < 307 && mouseY < windowHeight - 76 && mouseY > windowHeight - 96) {
        length = length - 1;
        return;
    }
    if (mouseX > 236 && mouseX < 256 && mouseY < windowHeight - 76 && mouseY > windowHeight - 96) {
        length = length + 1;
        return;
    }
    if (mouseX > 287 && mouseX < 307 && mouseY < windowHeight - 16 && mouseY > windowHeight - 36) {
        theta = theta + PI / 36.0;
        return;
    }
    if (mouseX > 236 && mouseX < 256 && mouseY < windowHeight - 16 && mouseY > windowHeight - 36) {
        theta = theta - PI / 36.0;
        return;
    }
    if (mouseX > 95 && mouseX < 175 && mouseY < windowHeight - 25 && mouseY > windowHeight - 50) {
        now = StartString;
        return;
    }
}

function keyPressed() {
    if (key == 'a' || key == "A") {
        type = type + 1;
        type = type % 4;
        if (type == 0) {
            showType = type0;
        } else if (type == 1) {
            showType = type1;
        } else if (type == 2) {
            showType = type2;
        } else if (type == 3) {
            showType = type3;
        }
    } else if (key == "B" || key == "b") {
        NewString();
    }
}

function NewString() {
    if (type == 0) {
        LSystem1();
    } else if (type == 1) {
        LSystem2();
    } else if (type == 2) {
        LSystem3();
    } else if (type == 3) {
        LSystem4();
    }
}

function LSystem1()
{
    var next = "";
    for (var i = 0; i < now.length; i++) {
        var c = now.substring(i, i + 1);
        if (c == 'F') {
            next = next + "FF+[+FFF]-[-F+F+F]";
        }
        else {
            next = next + c;
        }
    }
    now = next;
}
function LSystem2() {
    var next = "";
    for (var i = 0; i < now.length; i++) {
        var c = now.substring(i, i + 1);
        if (c == 'F') {
            next = next + "G-[[F]+F]+G[+GF]-F";
        }
        else if (c=="G"){
            next = next + "GG";
        }
        else {
            next = next + c;
        }
    }
    now = next;
}
function LSystem3() {
    var next = "";
    for (var i = 0; i < now.length; i++) {
        var c = now.substring(i, i + 1);
        if (c == 'F') {
            next = next + "G[+F][-F]GF";
        }
        else if (c == "G") {
            next = next + "GG";
        }
        else {
            next = next + c;
        }
    }
    now = next;
}
function LSystem4() {
    var next = "";
    for (var i = 0; i < now.length; i++) {
        var c = now.substring(i, i + 1);
        if (c == 'F') {
            next = next + "G[+F]G[-F+F]";
        }
        else if (c == "G") {
            next = next + "GG";
        }
        else {
            next = next + c;
        }
    }
    now = next;
}

function Render(len, theta1) {
    for (var i = 0; i < now.length; i++) {
        var c = now.substring(i, i + 1);
        if (c == "F" || c == "G") {
            line(0, 0, 0, len);
            translate(0, len);
        } else if (c == "+") {
            rotate(theta1);
        } else if (c == "-") {
            rotate(-theta1);
        } else if (c == "[") {
            push();
        } else if (c == "]") {
            pop();
        }
    }
}
function RenderType(len, theta1) {
    push();
    translate(60, windowHeight-30);
    for (var i = 0; i < showType.length; i++) {
        var c = showType.substring(i, i + 1);
        if (c == "F" || c == "G") {
            line(0, 0, 0, len);
            translate(0, len);
        } else if (c == "+") {
            rotate(theta1);
        } else if (c == "-") {
            rotate(-theta1);
        } else if (c == "[") {
            push();
        } else if (c == "]") {
            pop();
        }
    }
    pop();
}
function setColor() {
    fill(0);//填充颜色
    stroke(165, 135, 255);//边框颜色是紫色,降低了透明度
}

function setButton() {
    textSize(20);
    fill(255);
    rect(0, windowHeight - 130, 220, 120);
    rect(225, windowHeight - 130, 90, 120);
    rect(95, windowHeight - 50, 80, 25);
    rect(287, windowHeight - 96, 20, 20);
    rect(236, windowHeight - 96, 20, 20);
    rect(287, windowHeight - 36, 20, 20);
    rect(236, windowHeight - 36, 20, 20);
    fill(0);
    text(type, 20, windowHeight - 30);
    text("ReStart", 100, windowHeight - 30);
    text("Press \"A\" change Type", 0, windowHeight - 110);
    text("Press \"B\" grow", 0, windowHeight - 90);
    text("Length:", 230, windowHeight - 110);
    text("Theta:", 230, windowHeight - 50);
    text("+", 290, windowHeight - 20);
    text("-", 240, windowHeight - 20);
    text("+", 290, windowHeight - 80);
    text("-", 240, windowHeight - 80);
    strokeWeight(2.0);
    RenderType(-10, theta);
    strokeWeight(1.0);
    //text(length, 100, windowHeight - 330);
    //text(theta, 150, windowHeight - 330);
}