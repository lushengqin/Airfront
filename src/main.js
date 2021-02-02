const header = document.querySelectorAll('#header')
console.log(header)
const $linkWarp = $('.linkWarp')
const $last = $linkWarp.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
console.log(x)
console.log(xObject)
const hashMap = xObject || [
   { logo:'A',url:'https://www.acfun.cn'},
   { logo:'b',url:'https://bilibili.com'},
   { logo:'c',url:'https://caobao.com'},
]

const remove = (url) => {
   return url.replace('http://', '')
      .replace('https://', '')
      .replace('wwww.', '')
      .replace(/\/.*/,'') //删除以/开头的后面所有内容  
}

const render = (x) => {
   $linkWarp.find('li:not(.last)').remove()  //先删除之前的 再添加
   hashMap.forEach((node, index) => {
      // console.log(index) //拿到页面数据的索引
      const $li = $(`<li>
         <a href="${node.url}">
            <div class="listBox">
               <div class="logo">${node.logo}</div>
               <div class="link">${remove(node.url)}</div>
            </div>
         </a>
         <span class= 'close'>
            <svg class="icon" >
               <use xlink:href="#icon-guanbi1"></use>
            </svg>
         </span>
      </li>`).insertBefore($last)
   
      $li.on('click', '.close', () => {
         // hashMap.splice(index, 1)
         console.log(hashMap)
         hashMap.splice(index, 1)
         render()
      })
   })

   
}


render()
$('.addBox').on('click', () => {
   let url = window.prompt('请输入你想要的网址')
   if (url.indexOf('http') !== 0) { //如果它不是http开头的
      url = 'https://'+url
   }
   console.log(url)
   hashMap.push({
      logo: remove(url)[0],
      url: url
   })
   render()

})

window.onbeforeunload = () => {
   const string = JSON.stringify(hashMap)
   localStorage.setItem('x',string)
}

$('#mainWarp').on('keypress', (e) => {
   // console.log(e.key) //找到用户按的是哪个键 
   const {key} = e //相当于const key = key.e
   for (let i = 0; i < hashMap.length; i++){
      if (hashMap[i].logo.toLowerCase() === key){
         window.open(hashMap[i].url) //
      }
   }
})

window.onload = () =>{
   function $(id){
       return document.getElementById(id);
   }//获取焦点
   $("searchmain").onfocus = ()=>{
       if($("searchmain").value == "请输入关键字~"){
           $("searchmain").value = "";
           $("searchmain").style.color = "#64afe0";
       }
   }
   $("searchmain").onblur = ()=>{
       if($("searchmain").value == ""){
           $("searchmain").value = "请输入关键字~";
           $("searchmain").style.color = "#ccc";
       }
   }
}