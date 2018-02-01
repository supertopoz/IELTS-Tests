const createDoc = (html) => {
    return new Promise ((resolve,reject) => {    	
   let data =  encodeURIComponent(html)	
   console.log(data)
   let secondScriptID = 'AKfycbzWjN3EqF6ERUJMJ0AnSvk9JAAp4XKS9KHPEKktBxiKM_LEAGee';
   axios.get("https://script.google.com/macros/s/" + secondScriptID + "/exec?html=" + data).then((response)=>{
     console.log(response.data)
     let id = response.data;
     $('#saved').show();
     $('#loading').hide();
     $('#warning1').hide();
     $('#warning2').hide();
     $('#link').append('<a target="_blank" href="https://drive.google.com/open?id='+ id + '" > Open Google Document</a>')
   }).catch(error =>{
     console.log(error)
   })
  })
}