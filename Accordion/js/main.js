/**
 * Created by lWX314826 on 2018/9/17.
 */
(function(w){
  w.onload = function(){
    var dom = document.getElementById('subject');
    var lis = dom.getElementsByTagName('li');
    for(var i=0;i<lis.length;i++){
      (function(i){
        lis[i].onmouseover=function(e){
          mouseover(e);
        }
      })(i)
    }
    
    function mouseover(e){
      var target = e.target;
      while(target.tagName !='LI'){
        target = target.parentNode;
      }
      for(var j=0;j<lis.length;j++){
        lis[j].className='';
      }
      target.className='active';
    }
    
  }
})(window);
