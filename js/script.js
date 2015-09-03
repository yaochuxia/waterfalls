	// window.onload=function(){
	// 	waterfall('content','box');
	// }

	// function waterfall(parent,box){
	// 	var oPraent = document.getElementById('parent');//父级对象
	// 	var oboxs = getByClass(oPraent,box);//获取存储块框box的数组oboxs
	// 	//计算整改页面显示的列数（页面宽／box宽）
	// 	var oboxW = oboxs[0].offsetWidth;//一个块框obox的宽
	// 	var cols = document.documentElement.clientWidth/oboxW;//每行中能容纳的obox个数【窗口宽度除以一个块框宽度】
	// 	oPraent.style.cssText='width:'+ oboxW*cols+'px;margin:0 auto';//设置父级居中样式：定宽+自动水平外边距
	// 	var hArr=[];///用于存储 每列中的所有块框相加的高度。
	// 	for(var i=0;i<oboxs.length;i++){//遍历oboxs的每个框块元素
	// 		if(i<cols){
	//             hArr.push(oboxs[i].offsetHeight);//第一行中的cols个框块box,先添加进数组hArr
	// 	    }else{
	// 			var minH=Math.min.apply(null,hArr);//求数组当中最小的值（Math.min只能求一组数据），借助于apply方法，改变函数或者是方法中this的指向，传两个参数
	// 			var index=getMinhIndex(hArr,minH);
	// 			oboxs[i].style.position='absolute';//设置绝对位移
	// 			oboxs[i].style.top=minH+'px';
	// 			oboxs[i].style.left=oboxs[index].offsetLeft+'px';// oboxs[i].style.left=oboxW*index+'px';//数组最小高元素的高＋添加上的oboxs[i]块框高
	// 			hArr[index]+=oboxs[i].offsetHeight;//更新添加了块框后的列高
	// 	    }
	//     }
	// } 

 //   //根据class获取元素
 //   function getByClass(parent,className){
 //     var boxArr = [];//用来存储获取到所有class为box的元素
 //     var oElements = parent.getElementsByTagName('*');////获取 父级的所有子集
 //      for(var i=0; i<oElements.length; i++){
	//       	if(oElements[i].className==className){//遍历子元素、判断类别、压入数组
	//       		boxArr.push(oElements[i]);
	//       	}
 //        }
 //      return boxArr;
 //    }

 //    function getMinhIndex(arr,val){
 //        for(var i in arr){
 //           if(arr[i]==val){
 //             return i;
 //           }
 //        }
 //    }


window.onload=function(){

    waterfall('content','box');

    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    
    window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('content');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //添加 元素节点
                oPin.className='box';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('content','box');
        };
    }
}

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent,box){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getClassObj(oParent,box);// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//设置绝对位移
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}


function checkscrollside(){
    var oParent=document.getElementById('content');
    var aPin=getClassObj(oParent,'box');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}