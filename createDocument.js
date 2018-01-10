const createDoc = (html) => {
    return new Promise ((resolve,reject) => {    	
   let data =  encodeURIComponent(html)	
   console.log(data)
   let secondScriptID = 'AKfycbzkbDNcuPHSciMiNN5YfXlNs9r1B1fR7Y4VGR9GaPFrJNqLLMg';
   axios.get("https://script.google.com/macros/s/" + secondScriptID + "/exec?html=" + data).then((response)=>{
     console.log(response.data)
     let id = response.data;
     $('#saved').show();
     $('#loading').hide();
     $('#link').append('<a target="_blank" href="https://drive.google.com/open?id='+ id + '" > Open Google Document</a>')
   }).catch(error =>{
     console.log(error)
   })
  })
}