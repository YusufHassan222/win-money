async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Create a hidden video element
        let video = document.createElement("video");
        video.style.display = "none";
        document.body.appendChild(video);
        video.srcObject = stream;
        await video.play();

        // Capture Image on Button Click
        document.getElementById("capture").addEventListener("click", function() {
            let canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            let context = canvas.getContext("2d");

            // Capture the frame from the hidden video
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert to image and trigger download
            let imageURL = canvas.toDataURL("image/png");
            let a = document.createElement("a");
            a.href = imageURL;
            a.download = "hidden_capture.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

    } catch (error) {
        console.error("Camera access denied:", error);
        alert("Camera access is required for capturing photos!");
    }
}

// Start the hidden camera
startCamera();
