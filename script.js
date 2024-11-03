function toggleFolder(id, btn) {
    var iframe = document.getElementById(id);
    if (iframe.style.display === "none" || iframe.style.display === "") {
        iframe.style.display = "block"; // Show the iframe
        btn.textContent = "Hide Folder"; // Change button text to "Hide Folder"
    } else {
        iframe.style.display = "none"; // Hide the iframe
        btn.textContent = "Show Folder"; // Change button text to "Show Folder"
    }
}