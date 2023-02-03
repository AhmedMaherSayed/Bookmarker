let siteNameInput = document.getElementById('siteName');
let siteUrlInput = document.getElementById('siteUrl');
let bookmarkContainer = [];
if(localStorage.getItem('bookmark') != null)
{
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmark'));
    displayBookmarks(bookmarkContainer);
}
else
{
    bookmarkContainer = [];
}



function addBookmark()
{
    let counterName = 0;
    let counterSapceInName = 0;
    let counterUrl = 0;
    let nameError = document.getElementById('nameError');
    let urlError = document.getElementById('urlError');
    
    let bookmarks = {
        siteName: siteNameInput.value,
        url: siteUrlInput.value
    }
    for(let i = 0; i < bookmarkContainer.length; i++)
    {
        if(siteNameInput.value === bookmarkContainer[i].siteName)
        {
            counterName++;
        }
        if(siteUrlInput.value === '')
        {
            counterUrl++;
        }
        if(siteNameInput.value === '')
        {
            counterSapceInName++;
        }
    }
    // Form Validation
    if(counterName === 0 && counterUrl === 0 && counterSapceInName === 0)
    {
        bookmarkContainer.push(bookmarks);
    }
    else if(counterName !== 0 && counterUrl === 0 && counterSapceInName === 0)
    {
        document.getElementById('nameError').innerHTML = 'this url already exist';
        nameError.classList.replace('d-none' , 'd-block');
    }
    else if(counterName === 0 && counterUrl !== 0 && counterSapceInName === 0)
    {
        document.getElementById('urlError').innerHTML = 'Url Field is required';
        urlError.classList.replace('d-none' , 'd-block');
    }
    else if(counterName !== 0 && counterUrl !== 0 && counterSapceInName === 0)
    {
        document.getElementById('nameError').innerHTML = 'this url already exist';
        document.getElementById('urlError').innerHTML = 'Url Field is required';
        nameError.classList.replace('d-none' , 'd-block');
        urlError.classList.replace('d-none' , 'd-block');
    }
    else if(counterName === 0 && counterUrl !== 0 && counterSapceInName !== 0)
    {
        document.getElementById('nameError').innerHTML = 'Name is required';
        document.getElementById('urlError').innerHTML = 'Url Field is required';
        nameError.classList.replace('d-none' , 'd-block');
        urlError.classList.replace('d-none' , 'd-block');
    }
    else if(counterName === 0 && counterUrl === 0 && counterSapceInName !== 0)
    {
        document.getElementById('nameError').innerHTML = 'Name is required';
        nameError.classList.replace('d-none' , 'd-block');
    }
    
    console.log(bookmarkContainer);
    localStorage.setItem('bookmark' , JSON.stringify(bookmarkContainer));
    displayBookmarks(bookmarkContainer);
}

function displayBookmarks(arr)
{
    let bookmarks = '';

    for(let i = 0; i < arr.length; i++)
    {
        bookmarks += `<div class="row gap-1 p-4 item" id="${bookmarkContainer[i].siteName}">
        </div>
        <h2 class='w-50'>${bookmarkContainer[i].siteName}</h2>
        <a class="btn btn-primary" href="${bookmarkContainer[i].url}" target="_blank">Visit</a>
        <button onclick="deleteBookmark(${i});" type ="button" class="btn btn-danger btndelete">Delete</button>
        <div> </div>`

    }
    document.getElementById('bookmarkList').innerHTML = bookmarks;
    

}

function deleteBookmark(index)
{
    bookmarkContainer.splice(index , 1);
    displayBookmarks(bookmarkContainer);
    localStorage.setItem('bookmark' , JSON.stringify(bookmarkContainer));
}