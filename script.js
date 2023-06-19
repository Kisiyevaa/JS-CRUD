const firstName =document.querySelector("#firstname")
const lastName = document.querySelector("#lastname")
const email = document.querySelector("#email")
const submitBtn = document.querySelector("#submitBtn")
const ID=document.querySelector("#ID")
const tableTbody=document.querySelector("table tbody")
const updateBtn=document.querySelector("#updateBtn")
 updateBtn.style.display="none"

let data=localStorage.getItem("data")  ? JSON.parse(localStorage.getItem("data")) : []
submitBtn.addEventListener("click", add)

function add(e){
 e.preventDefault()
  if(chekValue(firstName) && chekValue(lastName) && chekValue(email) && chekValue(ID)){
      objectData(ID,firstName,lastName,email)
      data.push(obj)
      localStorage.setItem("data",JSON.stringify(data))
      addToData()
      clear()
  }else{
    alert("xanalar bosdur")
  }
}

function chekValue(element){
   return  element.value.trim() ? element.value.trim() : null
}

function clear(){
    firstName.value=""
    lastName.value=""
    email.value=""
    ID.value=""
}
let obj
function objectData(ID,name,surname,mail){
    obj={
     iD:ID.value,
     firstname:name.value,
     lastname:surname.value,
     email:mail.value
    }
}

function addToData(){
    tableTbody.innerHTML=""
 data.forEach(item => {
    tableTbody.innerHTML+=`<tr>
    <td>${item.iD}</td>
    <td>${item.firstname}</td> 
    <td>${item.lastname}</td>
    <td>${item.email}</td>
    <td><i class="fa-solid fa-pen" onclick="updateItem(${item.iD})"></i><i class="fa-solid fa-trash px-1" onclick="deletElement(${item.iD})"></i></td>
    </tr>`
 });
}
addToData()
function deletElement(number){
  data=data.filter(item=>item.iD!=number)
  localStorage.setItem("data",JSON.stringify(data))
  addToData()
}

function updateItem(number){
  let edit=data.find(item=>item.iD==number)
  firstName.value=edit.firstname
  lastName.value=edit.lastname
  email.value=edit.email
  ID.value=edit.iD
  submitBtn.style.display="none"
  updateBtn.style.display="block"

  updateBtn.addEventListener("click",change)
  function change(e){
    e.preventDefault()
    let newUpdate={
      firstname:firstName.value,
      lastname:lastName.value,
      email:email.value,
      iD:edit.iD
    }
   data=data.map(item=>{
    if(item.iD==newUpdate.iD){
      item={...newUpdate}
    }
    return item
    })
    localStorage.setItem("data",JSON.stringify(data))
    addToData(data)
    submitBtn.style.display="block"
    updateBtn.style.display="none"
  }
}