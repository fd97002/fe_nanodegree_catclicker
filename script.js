var Cat = function(name, src){
  		this.clickCount  = 0;
        this.name 		= name;
        this.imgsrc  	= src;
};


Cat.prototype.getname = function(){
	return this.name;
};

Cat.prototype.setCurrentCatName = function(str){
	return this.name = str;
};

Cat.prototype.setImgSrc = function(src){
	return this.imgsrc = src;
};

Cat.prototype.setClickCount = function(count){
	return this.clickCount = count;
};

Cat.prototype.incrementCounter = function(){
	this.clickCount++;
};

//-----------------------------------------------------------------
var CatListModel = function() {
	this.currentCat = 0;
    this.adminShow	= false;
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

CatListModel.prototype.setCurrentCatName = function(str){
	this.cats[this.currentCat].setCurrentCatName(str);
};

CatListModel.prototype.setClickCount = function(count){
	this.cats[this.currentCat].setClickCount(count);
};

CatListModel.prototype.setImgSrc = function(src){
	this.cats[this.currentCat].setImgSrc(src);
};

CatListModel.prototype.incrementCounter = function() {
	this.cats[this.currentCat].incrementCounter();
};

CatListModel.prototype.getCurrentCat = function(){
	return this.cats[this.currentCat];
};

CatListModel.prototype.getAdminShow = function(){
	return this.adminShow;
};

CatListModel.prototype.setAdminShow = function(val){
	this.adminShow = val;
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
	},

    //function runs when 'Admin' button is clicked.
    adminDisplay: function(){
        if (catList.getAdminShow() === false) {
            catList.setAdminShow(true);
            adminView.show(); //displays the admin input boxes and buttons
        }
        else if (catList.getAdminShow() === true) {
            catList.setAdminShow(false);
            adminView.hide(); //displays the admin input boxes and buttons
        }
    },
    
    //hides admin display when cancel button is clicked.
    adminCancel: function(){
        adminView.hide();
    },
    
    //hides admin display and saves new cat data when save button is clicked.
    adminSave: function(){
        catList.setCurrentCatName(adminCatName.value);
        catList.setClickCount(adminCatClicks.value);
        catList.setImgSrc(adminCatURL.value);
        catView.render();
        catListView.render();
        adminView.hide();
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
	this.catListElem.empty();

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
var adminView = {
    init: function(){
        this.adminCatName = $('.adminCatName');
        this.adminCatURL = $('.adminCatURL');
        this.adminCatClicks = $('.adminCatClicks');
        var admin = $('#admin');
        
        this.adminBtn = $('#adminBtn');
        this.adminCancel = $('#adminCancel');
        this.adminSave = $('#adminSave');
        
        this.adminBtn.on('click', function(){ //shows the admin display.
            octopus.adminDisplay();
        });
        
        this.adminCancel.on('click', function(){ //hides the admin display without saving any new cat data.
            octopus.adminCancel();
        });
        
        this.adminSave.on('click', function(){ //hides the admin display and saves new cat data.
            octopus.adminSave();
        });
        
        this.render();
    },
    
    render: function(){
        var currentCat = octopus.getCurrentCat(); //calls current cat
        this.adminCatName.value = currentCat.name;
        this.adminCatURL.value = currentCat.imgSrc;
        this.adminCatClicks.value = currentCat.clickCount;
    },
    
    show: function(){
            admin.style.display = 'block'; //shows the admin div on index.html
        },
        
    hide: function(){
        admin.style.display = 'none';
    }
};


//-------------------------------------------------------------------------------
var catList = new CatListModel();
var catView = new CatView();
var catListView= new CatListView();


octopus.init();
adminView.init();


