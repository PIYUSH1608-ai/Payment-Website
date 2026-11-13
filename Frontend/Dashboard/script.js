const buttons = document.querySelectorAll(".nav-btn");

const pages = document.querySelectorAll(".page");

const title = document.getElementById("page-title");


buttons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Remove active class from all pages

        pages.forEach(page => {
            page.classList.remove("active");
        });


        // Activate clicked button

        this.classList.add("active");


        // Get the corresponding page ID

        const pageId = this.getAttribute("data-page");


        // Display the corresponding page

        document.getElementById(pageId).classList.add("active");


        // Update the heading

        title.textContent = this.textContent.trim();

    });

});