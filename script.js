//Hide the parametersBox initially
 let parametersBox = document.getElementById('parametersBox');
 parametersBox.style.display = 'none';

 //Utility functions :
 //1. utility function to get DOM element from string
 function  getelementfromstring(string){
    let div =document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
 }

 //initialise added paramaeters count
 let countaddparams = 0; 

//If the user clicks on paramsbox hide json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('jsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
//If the user clicks on jsonbox hide paramsbox
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('jsonBox').style.display = 'block';
})

//If the user clicks on + button add parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', (e) => {
  let params = document.getElementById('params');
  let str = `<form class="row g-3">
              <label>Parameter ${countaddparams + 2}</label>
              <div class="form-group col-md-4 my-3">
                  <input type="text" class="form-control" id="parameterKey${countaddparams + 2}" placeholder="enter parameter ${countaddparams + 2}  key">
              </div>
              <div class="form-group col-md-4">
                  <input type="text" class="form-control " id="parameterValue${countaddparams + 2}" placeholder="enter parameter ${countaddparams + 2} value">
              </div>
              <div class="form-group col-md-4">
                  <button class="btn btn-primary deleteParam">-</button>
              </div>
             </form>`;

  // Convert element string to DOM node
  let paramElement = getelementfromstring(str);
  params.appendChild(paramElement);

  let deleteParam = document.getElementsByClassName('deleteParam');
  for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.parentElement.remove();
    })
  }


  e.preventDefault();
  countaddparams++;
});

//If user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //show please wait 
    document.getElementById('responseJsonText').value = "Please wait..."
    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;

    console.log("URL is ",url);
    console.log("requestType is ",requestType);
    console.log("contentType is ",contentType);

    if(contentType == "params"){
        data={};
        for(i=0;i<countaddparams+1;i++){

            if(document.getElementById('parameterKey'+(i+1)) != undefined){

                let key = document.getElementById('parameterKey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
    
                data[key] = value;
             
            }
            data = JSON.stringify(data);
        }
    }
    else{
        data = document.getElementById('requestJsonText').value
    }
    console.log(data);

    if(requestType == "GET"){
        fetch(url,{
            method:'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        })
    }
    else{
        fetch(url,{
            method:'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        })
    }
})