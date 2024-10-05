// Gets the main container element where the posts will be shown
const postContainer = document.getElementById('post-container');

// Variable for holds the page number , form the first page
let pageNumber = 1;

// Variable for holds the number of posts per page
const postsPerPage = 6;

/**
 * This function to get the posts from the API and retrieve a specific number of posts.
 */
function getPosts() {
    // Create a new XMLHttpRequest to load the posts from the JSON API
    const xmlHttpRequest = new XMLHttpRequest;

    // Create the API URL
    xmlHttpRequest.open('GET', `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${postsPerPage}`, true);

    // When the response to our request is successful
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            const posts = JSON.parse(xmlHttpRequest.responseText);

            // Iterate over the posts and create a new div element for each of them
            posts.forEach(post => {
                const postItem = document.createElement('div');
                // Add the style
                postItem.classList.add('post');

                // Create the post title and paragraph element into the div
                postItem.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>    
                `;

                // Append the title and paragraph element to the container
                postContainer.appendChild(postItem);
            });
            // load the next page
            pageNumber++;

        }
    };
    // Send our request to the JSON API
    xmlHttpRequest.send();
}

// Get the first set of posts from the API when the page is loaded
window.onload = function () {
    getPosts();
}

// This function to check if the user scrolls to the bottom of the page
function checkScrollBottom() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        getPosts();
    }
}

// This function to check if the user scrolls down.
window.onscroll = function () {
    checkScrollBottom();
}