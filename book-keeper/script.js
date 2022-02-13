const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalclose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmark-container');

let bookmarks = [];

//show modal, focus on input 
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

//modal event listner
modalShow.addEventListener('click',showModal);
modalclose.addEventListener('click',()=> modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=> (e.target === modal ? modal.classList.remove('show-modal') : false));

//validate form
function validate(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('please submit values for both fields');
        return false;
    }

    if(!urlValue.match(regex)){
        alert('please provide valid web address');
        return false;
    }
    return true;
}
//build bookmarks DOm
function buildBookmarks(){
    //remove all bookmark elements
    bookmarksContainer.textContent = '';
    //build items
    bookmarks.forEach((bookmark)=>{
        const {name,url} = bookmark;
        console.log(name,url);
        //item
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        //favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','favicon');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;
        //append to bookmarks container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);

    });
}
//fetch bookmarks from local storage
function fetchBookmarks(){
    //fetch if avalable
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // create bookmark array in local storage
        bookmarks =[
            {
                name: 'DesignYuga',
                url:'http://designyuga.com',
            },
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

//delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url === url){
            bookmarks.splice(i, 1);
        }
    });
    //update bookmark array in localstorage and repopulate the DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
//handle data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('https://') && !urlValue.includes('http://')){
        urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue,urlValue)){
        return false;
    }
    const bookmark ={
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();

}

//event listener
bookmarkForm.addEventListener('submit', storeBookmark);

//on load
fetchBookmarks();