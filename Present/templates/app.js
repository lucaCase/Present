const layouts = document.querySelectorAll(".layout");
for (let i = 0; i < layouts.length; i++) {
    layouts[i].onclick = () => {
        sessionStorage.setItem("layout", layouts[i].id);
        window.location.href = "./project.html"
    }
}