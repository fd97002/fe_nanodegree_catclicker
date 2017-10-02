var Cat = function(name, src){
  		this.clickCount  = 0;
        this.name 		= name;
        this.imgsrc  	= src;
};


Cat.prototype.getname = function(){
	return this.name;
};

Cat.prototype.incrementCounter = function(){
	this.clickCount++;
};

//-----------------------------------------------------------------
var CatListModel = function() {
	this.currentCat = 0;
};

CatListModel.prototype.init = function(){
	var cat0 = new Cat('Mishu', 'images/cat0.jpg');
	var cat1 = new Cat('Misha', 'images/cat1.jpg');
	var cat2 = new Cat('Mishka', 'images/cat2.jpg');
	var cat3 = new Cat('Mishi', 'images/cat3.jpg');
	var cat4 = new Cat('Mishthi', 'images/cat4.jpg');

	this.cats = [cat0, cat1, cat2, cat3, cat4];
};

CatListModel.prototype.getCats = function(){
	return this.cats;
};

CatListModel.prototype.setCurrentCat = function(num){
	this.currentCat=num;
};

CatListModel.prototype.incrementCounter = function() {
	this.cats[this.currentCat].incrementCounter();
};

CatListModel.prototype.getCurrentCat = function(){
	return this.cats[this.currentCat];
};

//-----------------------------------------------------------------------------

var octopus = {

  	init: function(){
		catList.init();
		catView.init();
		catListView.init();
	},
  
  	incrementCounter: function(){
        catList.incrementCounter();
        catView.render();        
  	},
	
	setCurrentCat: function(index){
		catList.setCurrentCat(index);
	 	catView.render();
	},

	getCurrentCat: function(){
		return catList.getCurrentCat();
	},

	getCats: function(){
		return catList.getCats();
	}
};

//---------------------------------------------------------------
//---------------------------------------------------------------------------
//View for the CatView
var CatView = function(){
};

CatView.prototype.init = function(){
	this.catElem = $('#cat');
   	this.catNameElem = $('#cat-name');
    this.catImageElem = $('#cat-img');
    this.countElem = $('#cat-count');

    // on click, increment the current cat's counter
    this.catImageElem.on('click', function(){
        octopus.incrementCounter();
    });

    this.render();
};


//rander the view based on selected index
CatView.prototype.render = function(){
   	var currentCat = octopus.getCurrentCat();
   	this.countElem.html(currentCat.clickCount);
   	this.catNameElem.html(currentCat.name);
   	this.catImageElem.attr('src', currentCat.imgsrc);
};


//---------------------------------------------------------------
//View for the CatListView
//---------------------------------------------------------------
var CatListView = function(){
};

CatListView.prototype.init = function(){
 this.catListElem = $('#cat-list');
 this.render();
};

CatListView.prototype.render = function(){
	var cat, elem, i;
	var cats = octopus.getCats();

	for (i = 0; i < cats.length; i++) {
		cat = cats[i];


		var $li = $("<li>").text(cat.getname());

		$li.on('click', (function(catCopy) {
	    return function() {
	      	octopus.setCurrentCat(catCopy);
	    	};
		})(i));

		this.catListElem.append($li);
	}
};

//-------------------------------------------------------------------------------
var catList = new CatListModel();
var catView = new CatView();
var catListView= new CatListView();


octopus.init();


