const addButton = document.getElementById('add-extra-names-button');
const extraNamesCol = document.getElementById('extra-names');

const row = (index) => {
    const element = document.getElementById('extra-names').children[0];
    const namePlaceholder = element.children[0].placeholder;
    const phoneNoPlaceholder = element.children[1].placeholder;

    const input1 = document.createElement('input');
    input1.type = "text";
    input1.classList.add("input_text", "text_name");
    input1.name = `name[${index}]`;
    input1.placeholder = namePlaceholder;
    input1.oninput = (e) => onAyojakNameChange(e);

    const input2 = document.createElement('input');
    input2.type = "tel";
    input2.classList.add("input_text", "mobileno");
    input2.name = `mobile-no[${index}]`;
    input2.placeholder = phoneNoPlaceholder;
    input2.oninput = (e) => onAyojakNameChange(e);

    const div = document.createElement('div');

    div.classList.add("d_flex");

    div.appendChild(input1);
    div.appendChild(input2);

    const parent = document.getElementById('ayojak-names');

    parent.innerHTML += `<div class="individual-name">
        <h5 class="ayojak-name"></h5>
        <h5 class="ayojak-phoneno"></h5>
      </div>`;

    return div;
};

addButton.addEventListener('click', (e) => {
    const rows = extraNamesCol.children.length;

    extraNamesCol.appendChild(row(rows));
});

function onAyojakNameChange(e) {
    const result = e.target.getAttribute('name');

    const nameField = result.split('[');

    const name = nameField[0];
    const index = parseInt(nameField[1].split(']')[0]);

    const element = document.getElementById('extra-names').children[index].children;

    const child = name == 'name' ? element[0] : element[1];

    const mainElement = document.getElementById('ayojak-names').children[index].children;

    const placement = name == 'name' ? mainElement[0] : mainElement[1];

    if (name == 'name') {
        placement.innerHTML = child.value + ' - ';
    }
    else {
        placement.innerHTML = child.value;
    }
}

function inputFieldChangeMine(event) {

    document.getElementById('full-name').innerHTML = document.getElementById('full-name-field').value;

    document.getElementById('full-name-2').innerHTML = document.getElementById('full-name-field').value;

    document.getElementById('death-date').innerHTML = document.getElementById('death-date-field').value;

    document.getElementById('death-date-2').innerHTML = document.getElementById('death-date-field').value;

    document.getElementById('death-time').innerHTML = document.getElementById('death-time-field').value;

    document.getElementById('death-datetime').innerHTML = document.getElementById('death-datetime-field').value;

    document.getElementById('besnu-date').innerHTML = document.getElementById('besnu-date-field').value;

    document.getElementById('besnu-datetime').innerHTML = document.getElementById('besnu-datetime-field').value;

    document.getElementById('besnu-starttime').innerHTML = document.getElementById('besnu-starttime-field').value;

    document.getElementById('besnu-endtime').innerHTML = document.
        getElementById('besnu-endtime-field').value;

    document.getElementById('title').children[0].innerHTML = document.getElementById('title-field').value;
}