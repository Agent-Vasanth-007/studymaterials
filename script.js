document.addEventListener("DOMContentLoaded", function() {
            const toggleButtons = document.querySelectorAll(".toggle-btn");

            toggleButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const iframe = this.nextElementSibling; // Assumes iframe follows the button
                    if (iframe.classList.contains("show")) {
                        iframe.classList.remove("show");
                        this.textContent = "Show Materials"; // Change to "Show Materials" when hidden
                    } else {
                        iframe.classList.add("show");
                        this.textContent = "Hide Materials"; // Change to "Hide Materials" when shown
                    }
                });
            });
        });
