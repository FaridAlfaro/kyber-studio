document.addEventListener("DOMContentLoaded", function () {
    const resourcesToLoad = [
        "/IMG/fotos/072a2371-209a-4c63-b9c0-69bb9cc94981.jpg",
        "/IMG/fotos/f9be799c-7f85-45bf-952a-7da022147bfd.jpg",
        "/IMG/fotos/trabajos%20(1).gif",
        "/IMG/fotos/6aa4df7a-fe40-4aa1-a3f2-db413af1a8f1.jpg",
        "https://i.pinimg.com/originals/07/0c/4a/070c4ae0e59af72c222e2756c87baa1a.gif",
        "https://i.pinimg.com/originals/76/c7/02/76c702c553f2264e6480b170dc8630a5.gif",
        "https://i.pinimg.com/originals/d2/1a/4b/d21a4b636e92277873e8f8870777be06.gif"
    ];

    const loaderWrapper = document.getElementById("loader-wrapper");
    const content = document.body;
    const loaderImage = document.getElementById("loader-image");

    // Function to preload resources
    function preloadResource(url) {
        return new Promise((resolve, reject) => {
            const resource = url.endsWith('.gif') || url.endsWith('.jpg') ? new Image() : new XMLHttpRequest();

            resource.onload = resolve;
            resource.onerror = reject;

            if (resource instanceof Image) {
                resource.src = url;
            } else if (resource instanceof XMLHttpRequest) {
                resource.open('GET', url, true);
                resource.send();
            }
        });
    }

    // Show loader
    loaderWrapper.style.display = "flex";

    // Load resources
    const loadResourcesPromise = Promise.all(resourcesToLoad.map(preloadResource));

    // Ensure a minimum display time of 3 seconds
    const minDisplayTimePromise = new Promise(resolve => setTimeout(resolve, 1000));

    // When both resource loading and minimum display time are complete
    Promise.all([loadResourcesPromise, minDisplayTimePromise])
        .then(() => {
            // Hide loader after resources are loaded and minimum display time has passed
            loaderWrapper.style.display = "none";

            // Display content
            content.style.display = "block";
        })
        .catch((error) => {
            console.error("Error loading resources:", error);

            // Even if there's an error, ensure the loader is hidden
            loaderWrapper.style.display = "none";
        });

    // Apply opacity animation to loader image
    loaderImage.style.animation = "fadeIn 3s ease-out, repeatOpacity 3s infinite";

    // Animation to repeat opacity every 3 seconds
    const keyframes = [
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 }
    ];

    loaderImage.animate(keyframes, {
        duration: 1000,
        iterations: Infinity
    });
});



