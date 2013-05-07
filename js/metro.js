var Metro = {};

Metro.setUpParameters=function(){
	Metro.blockWidth=$('.metroBlock').width();
	Metro.rightPadding=parseFloat($('.metroBlock').css('paddingRight'),10);
	Metro.leftPadding=parseFloat($('.metroBlock').css('paddingLeft'),10);
	Metro.rightMargin=parseFloat($('.metroBlock').css('marginRight'),10);
	Metro.colors=["metroGreen","metroBlue","metroOrange","metroDarkCyan","metroRed","metroPurple"];
}

/*
* blcokNumber: number of blocks that a metro will take
* caculates the width of the block and returns the result.
* Algorithm: the width of the metro block is the sum of the following:
* 1. sum of the width of all blocks it takes
* 2. the right padding of the first block
* 3. the left padding of the last block
* 4. all margins within the blocks
* 5. sum of left and right padding for each block other than the first and last
*/
Metro.caculateBlockWidth = function(blockNumber){
	var middleBlocks = blockNumber - 2;
	if (middleBlocks < 0) { middleBlocks = 0};
	var marginNumber = blockNumber - 1;

	var marginWidth = Metro.rightMargin * marginNumber;
	var width = blockNumber * Metro.blockWidth
				+ marginWidth
				+ Metro.rightPadding
				+ Metro.leftPadding
				+ middleBlocks * (Metro.rightPadding + Metro.leftPadding);
	return width;
}

Metro.layout=function(){
	var doubleBlockWidth=Metro.caculateBlockWidth(2);
	var tripleBlockWidth=Metro.caculateBlockWidth(3);
	var quadBlockWidth=Metro.caculateBlockWidth(4);
	$('.metroBlock-2').css('width',doubleBlockWidth);
	$('.metroBlock-3').css('width',tripleBlockWidth);
	$('.metroBlock-4').css('width',quadBlockWidth);
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
	Metro.wrapByHyperLink();
}

$(Metro.run);