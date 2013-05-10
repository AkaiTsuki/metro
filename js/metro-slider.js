var MetroSlider={};

MetroSlider.setupParameters=function(){
	MetroSlider.sliderWidth=$('.slider').width();
	MetroSlider.numOfContents=$('.slider ul li').length;
	$('.slider ul li').eq(0).addClass("active");
}

MetroSlider.wrapContent=function(){
	$(".slider ul").wrap("<div class='sliderWrap'>");
	$('.sliderWrap').css({
		width: MetroSlider.sliderWidth*MetroSlider.numOfContents
	});
}

MetroSlider.setNewDisplay=function(index){
	$('.active').removeClass('active');
	$('.slider ul li').eq(index).addClass("active");
}

MetroSlider.getCurrentIndex=function(){
	return $('.active').index();
}

MetroSlider.getNextIndex=function(index){
	return (index+1)%3;
}

MetroSlider.next=function(){
	$('.next').click(function(){
		var currentIndex=MetroSlider.getCurrentIndex();
		var nextIndex=MetroSlider.getNextIndex(currentIndex);
		MetroSlider.setNewDisplay(nextIndex);
		$('.sliderWrap').animate({'margin-left':-MetroSlider.sliderWidth*nextIndex},300);
	});
}

MetroSlider.initial=function() {
	MetroSlider.setupParameters();
	MetroSlider.wrapContent();
	MetroSlider.next();
}

$(MetroSlider.initial);