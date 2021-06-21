function aaym() {
  const alink=document.querySelectorAll('ul.list_post li a');
  let newDiv = document.createElement('table');
  let ym_subTitle = document.createElement('tr')
  ym_subTitle.innerHTML = `<th width="50%">제목</th><th width="8%">발행일</th><th>링크</th>`
  newDiv.appendChild(ym_subTitle);

  let dataFinal = [];

  alink.forEach((item) => {
      let datam = {};
      let ttt = item.querySelector('span.desc_post strong.tit_post');  //타이틀
      let ddd = item.querySelector('span.data_info span.txt_date');  //날짜
  
      datam.title = ttt.innerHTML; 
      datam.link = item.getAttribute("href");
      datam.date = ddd.textContent;
      dataFinal.push(datam);
  
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
  
      td1.innerHTML = datam.title;
      td2.innerHTML = datam.date;
      td3.innerHTML = datam.link;
   
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      newDiv.appendChild(tr);
  })
  // document.body.appendChild(newDiv);
  document.querySelector('.blog_list').insertBefore(newDiv,document.querySelector('.blog_list').firstChild);
  newDiv.setAttribute('id','ymtable');
  
  let ymStyle = document.createElement('style');
  ymStyle.innerHTML = `
  #ymtable{
      width: 90%;
      margin: 20px 50px;
      background-color: #f3f3f3;
      table-layout: fixed;
      word-break:break-all;
  }
  #ymtable th{
      height: 30px;
      line-height: 30px;
      background-color: #f39c12;
      border-color:#e67e22;
  }
  #ymtable tr{
      height: 20px;
      line-height: 20px;
  }
  #ymtable tr:nth-child(odd){
      background-color: #e6e6e6;
  }
  
  #ymtable td{
      padding-left: 15px;
  }
  `
  document.body.appendChild(ymStyle);
  
}
aaym();
console.log('화면을 맨 위로 올려보세요. 결과가 나옵니다.');
