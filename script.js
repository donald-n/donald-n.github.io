function searchPosts() {
    let input = document.getElementById('searchBar').value;
    input = input.toLowerCase();
    let game = document.getElementsByClassName('game');
      
    for (i = 0; i < game.length; i++) { 
        if (!game[i].innerHTML.toLowerCase().includes(input)) {
            game[i].style.display="none";
        }
        else {
            game[i].style.display="list-item";                 
        }
    }
}

function genNavBar() {
    navBar = document.createElement('nav');
    navBar.innerHTML = `<ul class="navbar-menu">
            <li class="navbar-item">
                <a href="/" class="navbar-links">home</a>
            </li>
            <li class="navbar-item">
                <a href="/game" class="navbar-links">games</a>
            </li>
            <li class="navbar-item">
                <a href="/blog" class="navbar-links">blog</a>
            </li>
        </ul>`
    document.body.insertBefore(navBar, document.body.firstChild);
}