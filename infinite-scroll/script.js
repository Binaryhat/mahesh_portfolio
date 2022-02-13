const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded=0;
let totalImages =0;
let photosArray=[];
let isInitialLoad = true;
const initialCount  = 5;
const apiKey='iTXi3iV7Fp6ZAtwpCDBQVb4Vqcflviy0iYHm9kQ61eY';
// Unsplash API
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount }`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }
//check if all images were loaded
function imageLoaded(){    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;       
    }
} 


//Helper function to set attribute on dom elements
function commonSetAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// create elements for links and photos, add to dom
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    
    // runs functio for each object in photos array
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        commonSetAttributes(item,{
            heref:photo.links.html,
            target:'_blank'
        });



        // create <img> for photo

        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        commonSetAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

        // Event listner, check when each is finished loading
        img.addEventListener('load',imageLoaded);
        //put <img> inside <a> , then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
         

// Get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray =await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad=false;
        }
    }catch(error){
        // catch error here
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
   if(window.innerHeight+window.scrollY >= document.body.offsetHeight -1000 && ready){
       ready=false;
       getPhotos();       
   }
})
// On load

getPhotos();