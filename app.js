async function removeBackground() {
    const imageInput = document.getElementById("imageInput").files[0];
    if (!imageInput) {
        alert("Please select an image file first.");
        return;
    }

    const apiKey = 'xxP4KjtyLXX84EsnRKxM3KUC'; // your API key
    const formData = new FormData();
    formData.append('image_file', imageInput);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob();

        // Display the processed image
        const outputImage = document.getElementById("outputImage");
        const imageUrl = URL.createObjectURL(blob);
        outputImage.src = imageUrl;

        // Enable download link
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = imageUrl;
        downloadLink.download = 'background-removed.png';
        downloadLink.style.display = 'inline';
        downloadLink.textContent = 'Download Image';

    } catch (error) {
        console.error(error);
        alert('An error occurred while removing the background.');
    }
}
