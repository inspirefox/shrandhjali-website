window.jsPDF = window.jspdf.jsPDF;

function extractFormData(formData) {
    let obj = {};
    for (let [key, value] of formData.entries()) {
        if (key.includes('[')) {
            const result = key.split('[');
            const name = result[0];

            obj[name] = [...(obj[name] ?? []), value];
        }
        else if (key.includes('.')) {
            const result = key.split('.');
            const name = result[0];

            obj[name] = {
                ...(obj[name] ?? {}),
                [result[1]]: value,
            };
        }
        else {
            obj[key] = value;
        }
    }

    return obj;
}

function convertImageToUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.onerror = (e) => {
            reject(e.target.error);
        };

        reader.readAsDataURL(file);
    });
}

const downloadButton = document.getElementById('download_img');

downloadButton.addEventListener('click', async (e) => {
    const frame = document.getElementById("image-frame");

    const canvas = await html2canvas(frame, {
        scale: 3,
    });

    const image = canvas.toDataURL("image/jpeg", 1);

    const pdf = new jsPDF({
        format: [135, 240],
        compress: false,
    });

    const height = pdf.internal.pageSize.getHeight();
    const width = height * 1080 / 1920;

    pdf.addImage(image, 'JPEG', 0, 0, width, height);

    const pdfData = pdf.output('blob');

    const blobUrl = await convertImageToUrl(pdfData);

    const a = document.createElement('a');

    a.href = blobUrl;

    a.download = "besnu-card.pdf";

    a.click();
});

function inputFieldChange(e) {
    const name = e.target.getAttribute('name');

    document.getElementById(name).innerHTML = e.target.value;
}

async function handleFileChange(e) {
    const file = e.target.files[0];

    const value = URL.createObjectURL(file);
    document.getElementById('profile-img').style.backgroundImage = `url('${value}')`;
}

function onAyojakNameChange(e) {
    const result = e.target.getAttribute('name');

    const nameField = result.split('[');

    const name = nameField[0];
    const index = parseInt(nameField[1].split(']')[0]);

    const element = document.getElementById('extra-names').children[index].children;

    const child = name == 'name' ? element[0] : element[1];

    const mainElement = document.getElementById('ayojak-names').children[index].children;

    const placement = name == 'name' ? mainElement[0] : mainElement[1];

    placement.innerHTML = child.value;
}

function onFrameChange(element) {
    const src = element.target.getAttribute('src');

    const imageFrame = document.getElementById('image-frame-img');

    imageFrame.setAttribute('src', src);

    const container = document.getElementById('image-container');

    if (src.includes('4')) {
        container.style.color = 'white';
    }
    else {
        container.style.color = 'black';
    }

    imageFrame.classList.remove();
}

const bottomImages = document.getElementsByClassName('img_size');

for (let i = 0; i < bottomImages.length; i++) {
    bottomImages[i].addEventListener('mouseenter', (e) => {
        e.target.style.scale = '1.1';
    });

    bottomImages[i].addEventListener('mouseleave', (e) => {
        e.target.style.scale = '1';
    });
}

function onTabSelected(event, index) {
    const isSelected = event.target.classList.contains('selected');
    const parent = document.getElementById('tab-container');

    if (isSelected) return;

    event.target.classList.add('selected');
    parent.children[index].classList.remove('selected');

    const frame = document.getElementById('profile-img-container');

    frame.style.borderRadius = index == 0 ? '0' : '50%';
}