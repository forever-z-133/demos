Particle3D=function(material){
	THREE.Particle.call(this,material);
	this.velocity=new THREE.Vector3(0,0,0);//速度;
	this.velocity.rotateX(10);//旋转;
	this.gravity=new THREE.Vector3(0,0,0.5);//加速度;
	this.drag=1;//速度相乘系数;
};
//Particle:粒子;
//prototype:原形;
Particle3D.prototype=new THREE.Particle();
Particle3D.prototype.constructor=Particle3D;//构造函数
Particle3D.prototype.updatePhysics=function(){
	this.velocity.multiplyScalar(this.drag);//矢量相乘函数
	this.velocity.addSelf(this.gravity);//矢量相加函数
	this.position.addSelf(this.velocity);//矢量相加函数
}
var TO_RADIANS=Math.PI/180;//角度向弧度转换系数*
THREE.Vector3.prototype.rotateY=function(angle){
	//绕Y轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;
	var tempx=this.x;
	this.x=(tempx*cosRY)+(tempz*sinRY);
	this.z=(tempx*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateX=function(angle){
	//绕X轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempz*sinRY);
	this.z=(tempy*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateZ=function(angle){
	//绕Z轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempx=this.x;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempx*sinRY);
	this.x=(tempy*-sinRY)+(tempx*cosRY);
}
function randomRange(min,max){
	return((Math.random()*(max-min))+ min);
}
