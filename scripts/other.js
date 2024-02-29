const fullnameField = document.getElementById('full-name-field');

fullnameField.addEventListener('input', (e) => {
    document.getElementById('full-name').children[1].innerHTML = e.target.value;
});

const descriptionField = document.getElementById('description-field');

descriptionField.addEventListener('input', (e) => {
    var formattedText = e.target.value.replace(/\n/g, "<br>");

    document.getElementById('description').innerHTML = formattedText;
});

const fileField = document.getElementById('image-field');

document.getElementById('title-field').oninput = (e) => {
    document.getElementById('title').children[0].innerHTML = e.target.value;
};