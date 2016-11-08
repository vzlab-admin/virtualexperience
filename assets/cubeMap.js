function trace(msg) { console.log(msg); }

function Cubemap(array, container, options)
{
	options = options || {};

	this.interacting=false;
	
	this.pitch = 0;
	this.yaw = 0;
	//this.fov = 70;
	this.perspective = options.perspective || 300;
	this.speed = 0.25;
	this.faces = {};
	this.box_size = 512;
	this.border_margin = 0.4;

	var root = document.createElement("div");
	root.className = "cubemap";
	var parent = container;
	if(!parent) throw("parent node not found");
	parent.appendChild(root);
	this.root = root;
	var that = this;

	var rect = this.root.getClientRects()[0];
	if(options.width) root.style.width = "100%";//root.style.width = options.width + "px";
	else root.style.width = rect.width + "px";
	if(options.height) root.style.height = "100%"//options.height + "px";
	else root.style.height = rect.height + "px";
	root.style.backgroundColor = options.backgroundColor || "black";
	root.style.position = "relative";
	root.style.overflow = "hidden";

	root.addEventListener("mousedown",ondown);
	root.addEventListener("touchstart",ondown);
	var last_pos = [0,0];

	function ondown(e)
	{
		if(e.type == "touchstart")
		{
			root.addEventListener("touchmove",onmove);
			root.addEventListener("touchend",onup);
		}
		else
		{
			root.addEventListener("mousemove",onmove);
			root.addEventListener("mouseup",onup);
		}

		var rect = that.root.getClientRects()[0];
		last_pos = [ e.pageX - rect.left, e.pageY - rect.top ];

		e.stopPropagation();
		e.preventDefault();
		
		if(that.startCallback){
	        that.startCallback()
	    }
	    
	    that.interacting=true;
		
		return false;

	}

	function onmove(e){
		if(that.interacting){
		    var rect = that.root.getClientRects()[0];
			
			if(rect){
	    		var x = (e.pageX || e.touches[0].pageX) - rect.left;
	    		var y = (e.pageY || e.touches[0].pageY) - rect.top;
	    		var deltax = x - last_pos[0];
	    		var deltay = y - last_pos[1];
	    
	    		that.yaw -= (deltax * that.speed) || 0;
	    		that.pitch += (deltay * that.speed) || 0;
	    		
	    		that.pitch=Math.min(Math.max(that.pitch,-90),90);
	    		that.update();
			}
	    
			/*
			that.fov += deltay * that.speed;
			if(this.fov < 45) this.fov = 45;
			else if(this.fov > 100) this.fov = 100;
			*/
	
			last_pos = [x,y];
			e.stopPropagation();
			e.preventDefault();
		}
		return false;
	}

	function onup(e)
	{
		document.body.removeEventListener("mousemove",onmove);
		document.body.removeEventListener("mouseup",onup);
		document.body.removeEventListener("touchmove",onmove);
		document.body.removeEventListener("touchend",onup);

		e.stopPropagation();
		e.preventDefault();
		
		if(that.stopCallback){
	        that.stopCallback()
	    }
	    
	    that.interacting=false;
	    
		return false;
	}


	var center = document.createElement("div");
	center.className = "cubemapcenter";
	root.appendChild(center);
	this.center = center;
	this.center.style.transformStyle = "preserve-3d";
	this.center.style.mozTransformStyle = "preserve-3d";
	this.center.style.webkitTransformStyle = "preserve-3d";
	this.center.style.width = "100%";
	this.center.style.height = "100%";
	//this.center.innerHTML = "foo";

	//this.center.style.width = this.box_size + "px";
	//this.center.style.height = this.box_size + "px";

    
    this.loadArray(array)
    this.update();
}

Cubemap.RIGHT = 1;
Cubemap.LEFT = 3;
Cubemap.TOP = 4;
Cubemap.BOTTOM = 5;
Cubemap.FRONT = 0;
Cubemap.BACK = 2;

Cubemap.prototype.loadArray = function(array){
	this.buildFace("front",array[Cubemap.FRONT]);
	this.buildFace("right",array[Cubemap.RIGHT]);
	this.buildFace("back",array[Cubemap.BACK]);
	this.buildFace("left",array[Cubemap.LEFT]);
	this.buildFace("top",array[Cubemap.TOP]);
	this.buildFace("bottom",array[Cubemap.BOTTOM]);
}


Cubemap.prototype.buildFace = function(face, url)
{
	var element = document.createElement("div");
	element.className = "cubemapface " + face + "face";
	this.center.appendChild(element);

	var halfsize = this.box_size * 0.5 - this.border_margin;
	var transform = "";
	switch(face)
	{
		case 'front': transform = "translateZ(-"+halfsize.toFixed(1)+"px) rotateY(0deg) rotateX(0deg)"; break;
		case 'left': transform = "translateX(-"+halfsize.toFixed(1)+"px) rotateY(90deg) rotateX(0deg)"; break;
		case 'right': transform = "translateX("+halfsize.toFixed(1)+"px) rotateY(-90deg) rotateX(0deg)";break;
		case 'top': transform = "translateY(-"+halfsize.toFixed(1)+"px) rotateY(-0deg) rotateX(-90deg)";break;
		case 'bottom': transform = "translateY("+halfsize.toFixed(1)+"px) rotateX(90deg)";break;
		case 'back': transform = "translateZ("+halfsize.toFixed(1)+"px) rotateX(0deg) rotateY(180deg)";break;
		default: throw "wrong face";
	}

	element.style.position = "absolute";
	element.style.left = "0";
	element.style.top = "0";
	element.style.width = this.box_size + "px";
	element.style.height = this.box_size + "px";
	element.style.transform = transform;
	element.style.mozTransform = transform;
	element.style.webkitTransform = transform;

	//create image
	var that = this;
	var img = new Image();
	img.src = url;
	img.onload = function() {
		this.width = that.box_size;
		this.height = that.box_size;
	};

	element.appendChild(img);

	//store
	if(this.faces[face])
		this.faces[face].parentNode.removeChild(this.faces[face]);
	this.faces[face] = element;
}

Cubemap.prototype.update = function()
{
    requestAnimationFrame(function(){
    	var perspective = this.perspective;
    	//perspective = 100 / Math.atan(0.0174532925 * this.fov);
    	var distance = perspective;
    
    	this.root.style.perspective = perspective.toFixed(0) + "px";
    	this.root.style.webkitPerspective = perspective + "px";
    	this.root.style.mozPerspective = perspective + "px";
        
    	var rect = this.root.getClientRects()[0];
    	
    	
    	if(rect){
        	var offsetX = (rect.width - this.box_size) * 0.5;
        	var offsetY = (rect.height - this.box_size) * 0.5;
        	var transform = "translateZ("+distance+"px) rotateX("+this.pitch.toFixed(1)+"deg) rotateY("+this.yaw.toFixed(1)+"deg) translateX("+offsetX+"px) translateY("+offsetY+"px)";
        	this.center.style.transform = transform;
        	this.center.style.webkitTransform = transform;
        	this.center.style.mozTransform = transform;
    	}
    }.bind(this));
}