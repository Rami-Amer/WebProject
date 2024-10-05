// Gets the main container element where the posts will be shown
const postContainer = document.getElementById('post-container')

/**
 * This function to get the posts from the API and retrieve a specific number of posts.
 */
function getPosts() {
    // Create a new XMLHttpRequest to load the posts from the JSON API
    const xmlHttpRequest = new XMLHttpRequest;

    // Create the API URL
    xmlHttpRequest.open('GET',`https://jsonplaceholder.typicode.com/posts`);

    // When the response to our request is successful
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            const posts = JSON.parse(xmlHttpRequest.responseText)

            // Iterate over the posts and create a new div element for each of them
            posts.forEach(post => {
                const postItem = document.createElement('div')
                // Add the style
                postItem.classList.add('post')

                // Create the post title and paragraph element into the div
                postItem.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>    
                `;

                // Append the title and paragraph element to the container
                postContainer.appendChild(postItem);
            });

        }
    };
    // Send our request to the JSON API
    xmlHttpRequest.send();
}

// Get the first set of posts from the API when the page is loaded
window.onload = function () {
    getPosts();
}