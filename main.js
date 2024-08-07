var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");

var bookmarTable = document.getElementById("bookmarTable");


var bookMarksList = [];

// *****************************Display from localStorage*****************************

if (localStorage.getItem("Bookmarks")!==null){
    bookMarksList = JSON.parse(localStorage.getItem("Bookmarks")); 
    display();
 
 }

// Add new Bookmark
function addMark(){
       if (!validateForm(siteName.value, siteUrl.value)) {
        return false;
    }
    var bookmark={
        name: siteName.value,
        url: siteUrl.value,

    }
    bookMarksList.push(bookmark);
    console.log(bookMarksList)
    localStorage.setItem("Bookmarks", JSON.stringify(bookMarksList));
    display();
    clearData()
}

function display(){
    var allBMarks= "";
    for (var i=0 ; i< bookMarksList.length;i++){
        allBMarks+=`
         <tr>
        <th> ${i +1}</th>
        <th>${bookMarksList[i].name}</th>
        <td> <a target="_blank" href="${bookMarksList[i].url}" ><button class="btn btn-primary"> Visit </button> </a></td>
        <td> <button onclick = "deleteItem(${i})" class="btn btn-danger"> Delete </button> </a></td>

        </th>
      </tr> 
        `
    }
    bookmarTable.innerHTML = allBMarks;
}


function clearData(){
    siteName.value=null;
    siteUrl.value=null;
};

//***********************delete*********************** */

function deleteItem(indexItem){
    bookMarksList.splice(indexItem , 1);
    console.log(bookMarksList)
    localStorage.setItem("Bookmarks" , JSON.stringify(bookMarksList));
    display();
 }
 
 /**********************search************************* */
var searchInput=document.getElementById("searchInput");

function searchItem(){
   var term = searchInput.value;

   var allBMarks= "";
   for (var i=0 ; i< bookMarksList.length;i++){
    if(bookMarksList[i].name.toLowerCase().includes(term.toLowerCase()))

       allBMarks+=`
        <tr>
       <th> ${i +1}</th>
       <th>${bookMarksList[i].name}</th>
       <td> <a target="_blank" href="${bookMarksList[i].url}" ><button class="btn btn-primary"> Visit </button> </a></td>
       <td> <button onclick = "deleteItem(${i})" class="btn btn-danger"> Delete </button> </a></td>

       </th>
     </tr> 
       `
   }
   bookmarTable.innerHTML = allBMarks;
}

function validateForm(name, url) {
    // Check if name and URL are not empty
    if (!name || !url) {
        alert("Please fill in both fields");
        return false;
    }

    // Regular expression to validate URL
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (!urlPattern.test(url)) {
        alert("Please enter a valid URL");
        return false;
    }

    return true;
}