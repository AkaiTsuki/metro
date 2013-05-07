var Metro = {};

Metro.setUpParameters=function(){
	Metro.blockWidth=$('.metroBlock').width();
	Metro.rightPadding=parseFloat($('.metroBlock').css('paddingRight'),10);
	Metro.leftPadding=parseFloat($('.metroBlock').css('paddingLeft'),10);
	Metro.rightMargin=parseFloat($('.metroBlock').css('marginRight'),10);

	Metro.blockHeight=$('.metroBlock').height();
	Metro.topPadding=parseFloat($('.metroBlock').css('paddingTop'),10);
	Metro.bottomPadding=parseFloat($('.metroBlock').css('paddingBottom'),10);
	Metro.bottomMargin=parseFloat($('.metroBlock').css('marginBottom'),10);

	Metro.colors=["metroGreen","metroBlue","metroOrange","metroDarkCyan","metroRed","metroPurple"];
}

/*
* columns: number of columns that a metro will take
* caculates the width of the block and returns the result.
* Algorithm: the width of the metro block is the sum of the following:
* 1. sum of the width of all blocks it takes
* 2. the right padding of the first block
* 3. the left padding of the last block
* 4. all margins within the blocks
* 5. sum of left and right padding for each block other than the first and last
*/
Metro.caculateBlockWidth = function(columns){
	return Metro.caculateBlockDimension(columns,Metro.blockWidth,Metro.rightPadding,Metro.leftPadding,Metro.rightMargin);
}

Metro.caculateBlockHeight = function(rows){
	return Metro.caculateBlockDimension(rows,Metro.blockHeight,Metro.bottomPadding,Metro.topPadding,Metro.bottomMargin);
}

Metro.caculateBlockDimension = function(blocks, basic,firstPadding,lastPadding,margin){
	var middleBlocks = blocks - 2;
	if (middleBlocks < 0) { middleBlocks = 0};
	var marginNumber = blocks - 1;

	var marginWidth = margin * marginNumber;
	var result = blocks * basic
				+ marginWidth
				+ firstPadding
				+ lastPadding
				+ middleBlocks * (firstPadding + lastPadding);
	return result;
}

Metro.layout=function(){
	var doubleBlockWidth=Metro.caculateBlockWidth(2);
	var tripleBlockWidth=Metro.caculateBlockWidth(3);
	var quadBlockWidth=Metro.caculateBlockWidth(4);

	var doubleBlockHeight= Metro.caculateBlockHeight(2);
	var tripleBlockHeight= Metro.caculateBlockHeight(3);

	$('.col-2').css('width',doubleBlockWidth);
	$('.col-3').css('width',tripleBlockWidth);
	$('.col-4').css('width',quadBlockWidth);

	$('.row-2').css('height',doubleBlockHeight);
	$('.row-3').css('height',tripleBlockHeight);
}

Metro.addClearDiv=function(){
	$('.metro').each(function(){
		var clearDiv=$("<div>").addClass('clear');
		$(this).append(clearDiv);
	});
}

Metro.addColor=function(){
	$('.metroBlock').each(function(){
		var index=Math.floor((Math.random()*Metro.colors.length));
		$(this).addClass(Metro.colors[index]);
	});
}

Metro.wrapByHyperLink=function(){
	$('.metroBlock').each(function(){
		$(this).wrap("<a href='#'>");
	});
}

Metro.run=function(){
	Metro.setUpParameters();
	Metro.layout();
	Metro.addColor();
	//Metro.wrapByHyperLink();
	Metro.addClearDiv();
}

$(Metro.run);