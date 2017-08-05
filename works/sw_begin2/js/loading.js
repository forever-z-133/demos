var canvas = document.getElementById("loading_canvas");
var stage = new createjs.Stage(canvas);

var manifest;
var preload;
var progressText = new createjs.Text("", "14px Arial", "#000000");
progressText.x = 30-progressText.getMeasuredWidth() / 2;
progressText.y = 50;
stage.addChild(progressText);
stage.update();

//定义相关JSON格式文件列表
function setupManifest() {
    manifest = [
	         {src:  "img/img1.png", id: "img1"},
	         {src:  "img/img2.png", id: "img2"},
	         {src:  "img/img3.png", id: "img3"},
	         {src:  "img/img4.png", id: "img4"},
	         {src:  "img/img5.png", id: "img5"},
	         {src:  "img/1.gif", id: "1"},
	         {src:  "img/2.gif", id: "2"},
	         {src:  "img/3.gif", id: "3"},
	         {src:  "img/4.gif", id: "4"},
	         {src:  "img/bg.jpg", id: "bg"},
	         {src:  "img/index_11.png", id: "index_11"},
	         {src:  "img/jt1.png", id: "jt1"},
	         {src:  "img/jt2.png", id: "jt2"},
	         {src:  "img/jt3.png", id: "jt3"},
	         {src:  "img/jt4.png", id: "jt4"},
	         {src:  "img/jt5.png", id: "jt5"},
	         {src:  "img/m1.png", id: "m1"},
	         {src:  "img/people3.png", id: "people3"},
	         {src:  "img/people4.png", id: "people4"},
	         {src:  "img/people1.png", id: "people1"},
	         {src:  "img/people2.png", id: "people2"},
	         {src:  "img/pic1_00.png", id: "pic1_00"},
	         {src:  "img/m_01.png", id: "m_01"},
	         {src:  "img/m_02.png", id: "m_02"},
	         {src:  "img/san1.png", id: "san1"},
	         {src:  "img/share.png", id: "share"},
	         {src:  "img/logo.jpg", id: "logo"},
	         {src:  "img/pic3.png", id: "pic3"},
	         {src:  "img/pic6.png", id: "pic6"},
	         {src:  "img/ta1.png", id: "ta1"}	
    ];
}

//开始预加载
function startPreload() {
    preload = new createjs.LoadQueue(true);
    //注意加载音频文件需要调用如下代码行
    preload.installPlugin(createjs.Sound);         
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
 
}

//处理单个文件加载
function handleFileLoad(event) {
    console.log("文件类型: " + event.item.type);
    if(event.item.id == "logo"){
        console.log("logo图片已成功加载");
    }
}
 
//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
function loadError(evt) {
    console.log("加载出错！",evt.text);
}
 
//已加载完毕进度 
function handleFileProgress(event) {
     progressText.text = (preload.progress*100|0) + "%";
    $("#progress-bar").css("width",progressText.text );
   
    stage.update();
    
    
}

//全度资源加载完毕
function loadComplete(event) {
  console.log("已加载完毕全部资源");
  
	$("#loading").css("display","none");
	$("#page_1").css("opacity","1")	;  
    setTimeout(function(){ audio.play(); }, 2000);

}

setupManifest();
startPreload();