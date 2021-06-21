
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
