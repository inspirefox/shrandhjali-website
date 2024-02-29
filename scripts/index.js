const langs = ['english', 'hindi', 'gujarati', 'marathi', 'bengali'];
const langsContainer = document.querySelector('.lang-btns');

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (e) => {
    const last = langsContainer.getAttribute('selected-index');

    if (last != '-1') {
        langsContainer.children[parseInt(last)].classList.remove('a-hover');
        langsContainer.setAttribute('selected-index', '-1');
    }

    const text = e.target.value.toLowerCase();

    if (text == "") return;

    let searchResult = "";
    let i = 0;
    for (i = 0; i < langs.length; i++) {
        if (langs[i].includes(text)) {
            searchResult = langs[i];
            break;
        }
    }

    if (searchResult == "") return;

    langsContainer.setAttribute('selected-index', i);
    langsContainer.children[i].classList.add('a-hover');
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        const last = langsContainer.getAttribute('selected-index');

        if (last != '-1') {
            langsContainer.children[parseInt(last)].click();
        }
    }
});