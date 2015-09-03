$(window).on("load",function(){
	waterfall('warp','box');
    var dataInt ={'data':[{'src':'img_7.jpg'},{'src':'img_5.jpg'},{'src':'img_3.jpg'},{'src':'img_4.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oBox = $('<div>').addClass('box').appendTo( $( "#warp" ) );
                var $oPic = $('<div>').addClass('pic').appendTo( $oBox );
                $('<img>').attr('src','../images/' + $( value).attr( 'src') ).appendTo($oPic);
            });
            waterfall();
        };
    }
})

function waterfall(){
     var boxs = $("#warp>div");//warp下面的一级子元素
         w = boxs.eq(0).outerWidth();//获取每一列的宽度，//outerWidth()获取包含padding和border在内的宽度;
         cols = Math.floor($(window).width()/w)//获取整改窗口的宽度除以每一列的宽等于列数,Math.floor取整数
         $("#warp").width(w*cols).css('margin','0 auto');//计算warp的宽并且样式居中
     var hArr =[];//每一列高度的集合
         boxs.each(function(index,value){//遍历box，index遍历每一个参数的索引，value遍历每一个参数
         	var h =boxs.eq(index).outerHeight();//获取每个box元素的高
         	//如果index小于列数的
            if(index<cols){//把前5个数据块的高塞到数组内
               hArr[index]=h;//前5张的高度
            }else{
            	var minH = Math.min.apply(null,hArr);//求前5张最小的值
            	    minHIndex = $.inArray(minH,hArr);//最小值在数据中的索引, $.inArray()方法可以判断一个值在数组中出现的索引，解释两个参数，第一个参数是判断谁，第二个参数在哪个数组中
	            $(value).css({//将DOM对象转换成jQuery对象,才能继续使用jQuery方法;
	            	'position':'absolute',
	            	'top':minH+'px',
	            	'left':minHIndex*w+'px',
	            })
	            hArr[minHIndex]+= boxs.eq(index).outerHeight();//改变数组的值,最低高元素的高度+刚添加到最低高度下的元素的高度=新的列高;
            }
         })    
}


function checkscrollside(){
    var boxs = $( "#warp>div" );
    var lastPinH = boxs.last().get(0).offsetTop + Math.floor(boxs.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).width();//页面高度
    return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}