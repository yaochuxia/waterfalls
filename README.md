# waterfalls
js ,jquery,css3实现瀑布流效果

### css3实现瀑布流效果
使用 column-width 属性规定列的宽度来实现瀑布流效果    
1.css3方式不需要计算，浏览器自动计算，只需设置一列的宽，性能高。  
2.列宽随着浏览器宽口大小进行改变，用户体验不好。  
3.css3图片顺序是按照垂直排列，图片顺序打乱，没有图片加载功能，只有依赖js来加载图片功能的。

### jquery实现瀑布流效果 

### javascript实现瀑布流效果    
1.需要计算，列数＝浏览器窗口宽度/图片宽度。    
2.图片定位是根据每一列数据的高度计算接下来的图片位置。  
3.图片顺序是按照图片计算的位置横向排序，位置时计算出来的，比较规范
js实现的瀑布流不会有上面的两个缺点，但是性能相对要差！

 

