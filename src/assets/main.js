//here we receive the api and contain it
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCTSbqSJJOUH782VpV1FWtlg&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content');//here we call id: content and we put the data brought from our api in this content already created with tailwind

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${key}`,
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};//the method to tell if we are giving or getting data from the api, and specify the key and the host of the api.

async function fetchData(urlApi) //we create the function fetchData
{
    const response = await fetch(urlApi,options)
    const data = await response.json();
    return data;
}

//here is what we are going to see when everything works well or if there is any error, if everything goes well, it should show the structure that we did
(async () => {

    try {
        const videos = await fetchData(API);
        let view = ` 
        ${videos.items.map(video => `
        <div class ="group relative">
            <div class= "w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md
            overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src= "${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full"> 
            </div>
            <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
            </h3>
            </div> 
        </div>
        `).slice(0,4).join('')}`;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();
