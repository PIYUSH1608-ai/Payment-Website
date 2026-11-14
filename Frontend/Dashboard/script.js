const buttons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("page-title");

buttons.forEach(button => {
    button.addEventListener("click",
                function() {
                    buttons.forEach(btn => {
                        btn.classList.remove("active");
                    });

                    pages.forEach(page => {
                        page.classList.remove("active");
                    });

                    this.classList.add("active");

                    const pageId = this.getAttribute("data-page");
                    document.getElementById(pageId).classList.add("active");

                    title.textContent = this.textContent.trim();
    });
});
