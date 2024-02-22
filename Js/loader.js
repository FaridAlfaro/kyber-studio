document.addEventListener("DOMContentLoaded", function() {
    // List of image and gif URLs to preload
    const resourcesToLoad = [
        "/IMG/fotos/072a2371-209a-4c63-b9c0-69bb9cc94981.jpg",
        "/IMG/fotos/f9be799c-7f85-45bf-952a-7da022147bfd.jpg",
        "/IMG/fotos/trabajos%20(1).gif",
        "/IMG/fotos/6aa4df7a-fe40-4aa1-a3f2-db413af1a8f1.jpg",
        "https://i.pinimg.com/originals/07/0c/4a/070c4ae0e59af72c222e2756c87baa1a.gif",
        "https://i.pinimg.com/originals/76/c7/02/76c702c553f2264e6480b170dc8630a5.gif",
        "https://i.pinimg.com/originals/d2/1a/4b/d21a4b636e92277873e8f8870777be06.gif"
    ];

    // Function to preload resources
    function preloadResources() {
        return Promise.all(resourcesToLoad.map(url => {
            return new Promise((resolve, reject) => {
                if (url.endsWith('.gif') || url.endsWith('.jpg')) {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = reject;
                } else {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = resolve;
                    xhr.onerror = reject;
                    xhr.send();
                }
            });
        }));
    }

    // Show loader
    const loaderWrapper = document.getElementById("loader-wrapper");
    const content = document.body;
    loaderWrapper.style.display = "flex";
    content.style.display = "none";

    // Load resources with a minimum display time of 3 seconds
    Promise.all([preloadResources(), new Promise(resolve => setTimeout(resolve, 3000))])
        .then(() => {
            // Hide loader and show content after resources are loaded
            loaderWrapper.style.display = "none";
            content.style.display = "block";
        });
});