var MetroSlider={};

MetroSlider.setupParameters=function(){
	MetroSlider.sliderWidth=$('.slider').width();
	MetroSlider.numOfContents=$('.sliderContent li').length;
	$('.sliderContent li').eq(0).addClass("active");
}

MetroSlider.wrapContent=function(){
	$(".sliderContent").wrap("<div class='sliderWrap'>");
	$('.sliderWrap').css({
		width: MetroSlider.sliderWidth*MetroSlider.numOfContents
	});
}

MetroSlider.setNewDisplay=function(index){
	$('.active').removeClass('active');
	$('.sliderContent li').eq(index).addClass("active");
	$('.paging ul li').eq(index).addClass('active');
}

MetroSlider.getCurrentIndex=function(){
	return $('.active').index();
}

MetroSlider.getNextIndex=function(index){
	return (index+1)%MetroSlider.numOfContents;
}

MetroSlider.getPreviouIndex=function(index){
	var pre=index-1;
	if(pre<0){
		pre=MetroSlider.numOfContents-1;
	}
	return pre%3;
}

MetroSlider.bindNextEvent=function(){
	$('.next').click(function(){
		MetroSlider.bindClickEvent(MetroSlider.next);
		return false;
	});
}

MetroSlider.bindPreviouEvent=function(){
	$('.pre').click(function() {	
		MetroSlider.bindClickEvent(MetroSlider.previou);
		return false;
	});
}

MetroSlider.bindPaging=function(){
	$('.paging ul li').click(function(){	
		MetroSlider.bindClickEvent(MetroSlider.paging,$(this));
		return false;
	});
}

MetroSlider.paging=function(target){
	var index=parseInt(target.text())-1;
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

MetroSlider.initial=function() {
	MetroSlider.setupParameters();
	MetroSlider.wrapContent();
	MetroSlider.bindNextEvent();
	MetroSlider.bindPreviouEvent();
	MetroSlider.bindPaging();
	MetroSlider.autoSwitch();
}

$(MetroSlider.initial);