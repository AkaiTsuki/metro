var MetroSlider={};

/*
* Set up default parameters for slider.
*/
MetroSlider.setupParameters=function(){
	MetroSlider.sliderWidth=$('.metroSlider').width();
	MetroSlider.numOfContents=$('.sliderContent li').length;
	$('.sliderContent li').eq(0).addClass("active");
}

/*
* wrap a div out of slider contents. The width of div is
* based on the total width of contents.
*/
MetroSlider.wrapContent=function(){
	$(".sliderContent").wrap("<div class='sliderWrap'>");
	$('.sliderWrap').css({
		width: MetroSlider.sliderWidth*MetroSlider.numOfContents,
		marginLeft: -MetroSlider.sliderWidth
	});
}

/*
* Set the content indicated by index to active.
*/
MetroSlider.setNewDisplay=function(index){
	$('.active').removeClass('active');
	$('.sliderContent li').eq(index).addClass("active");
	$('.paging ul li').eq(index-1).addClass('active');
}

/*
* Get the index of active content.
*/
MetroSlider.getCurrentIndex=function(){
	return $('.active').index();
}

/*
* Get the next index of current active element.
*/
MetroSlider.getNextIndex=function(index){
	return (index+1)%MetroSlider.numOfContents;
}

/*
* Get the previous index of current active element.
*/
MetroSlider.getPreviouIndex=function(index){
	return (index-1)%MetroSlider.numOfContents;
}

/*
* Bind the next click event
*/
MetroSlider.bindNextEvent=function(){
	$('.next').click(function(){
		MetroSlider.bindClickEvent(MetroSlider.next);
		return false;
	});
}

/*
* Bind the previou click event
*/
MetroSlider.bindPreviouEvent=function(){
	$('.pre').click(function() {	
		MetroSlider.bindClickEvent(MetroSlider.previou);
		return false;
	});
}

/*
* Bind the click event on pages
*/
MetroSlider.bindPaging=function(){
	$('.paging ul li').click(function(){	
		MetroSlider.bindClickEvent(MetroSlider.paging,$(this));
		return false;
	});
}

MetroSlider.paging=function(target){
	var index=parseInt(target.text());
	MetroSlider.setNewDisplay(index);
	$('.sliderWrap').animate({'margin-left':-MetroSlider.sliderWidth*index},300);
}

MetroSlider.next=function(){
	var currentIndex=MetroSlider.getCurrentIndex();
	var nextIndex=MetroSlider.getNextIndex(currentIndex);
	MetroSlider.setNewDisplay(nextIndex);
	$('.sliderWrap').animate({'margin-left':-MetroSlider.sliderWidth*nextIndex},300);
}

MetroSlider.previou=function(){
	var currentIndex=MetroSlider.getCurrentIndex();
	var preIndex=MetroSlider.getPreviouIndex(currentIndex);
	MetroSlider.setNewDisplay(preIndex);
	$('.sliderWrap').animate({'margin-left':-MetroSlider.sliderWidth*preIndex},300);
}

MetroSlider.bindClickEvent=function(func,arg){
	clearInterval(MetroSlider.interval);
	if (arg) {
		func(arg);
	}else{
		func();
	}
	MetroSlider.autoSwitch();
}

MetroSlider.autoSwitch=function(){
	MetroSlider.interval=setInterval("MetroSlider.next()",4000);
}

MetroSlider.addPagination=function(){
	var paging=MetroSlider.createPagination();
	$('.metroSlider').append(paging);
}

MetroSlider.createPagination=function(){
	var paging=$('<div>').addClass('paging');
	var pre=$('<a href="">pre</a>').addClass('pre');
	var next=$('<a href="">next</a>').addClass('next');
	var pages=$('<ul>');
	var numberOfPages=$('.sliderContent').children().length;
	for (var i = 0; i < numberOfPages; i++) {
		pages.append("<li>"+(i+1)+"</li>");
	};

	pages.children().eq(0).addClass('active');
	paging.append(pre);
	paging.append(pages);
	paging.append(next);
	return paging;
}

MetroSlider.appendContentCopy=function(){
	var first=$('.sliderContent li').first().clone().addClass('endless-end');
	var last=$('.sliderContent li').last().clone().addClass('endless-first');
	$('.sliderContent').append(first);
	$('.sliderContent').prepend(last);
}

MetroSlider.initial=function() {
	MetroSlider.setupParameters();
	MetroSlider.wrapContent();
	MetroSlider.appendContentCopy();
	MetroSlider.addPagination();
	MetroSlider.bindNextEvent();
	MetroSlider.bindPreviouEvent();
	MetroSlider.bindPaging();
	MetroSlider.autoSwitch();
}

$(MetroSlider.initial);