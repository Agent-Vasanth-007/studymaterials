function renderFileStructure(data, parentElement, fileCounter = { count: 1 }) {
    const div = document.createElement('div');

    if (data.type === 'folder') {
        div.classList.add('folder');

        const dropdownIcon = document.createElement('span');
        dropdownIcon.classList.add('dropdown-icon');
        dropdownIcon.textContent = '▶';
        
        dropdownIcon.onclick = () => toggleVisibility(folderContentDiv, dropdownIcon);

        const folderName = document.createElement('span');
        folderName.textContent = data.name;
        folderName.style.cursor = 'pointer';
        folderName.onclick = () => toggleVisibility(folderContentDiv, dropdownIcon);

        const fileContainer = document.createElement('div');
        fileContainer.style.display = 'flex';
        fileContainer.style.justifyContent = 'flex-start';
        fileContainer.style.alignItems = 'center';

        const threeDotsContainer = document.createElement('div');
        threeDotsContainer.classList.add('three-dots-icon');
        threeDotsContainer.style.position = 'relative';
        const threeDotsImage = document.createElement('img');
        threeDotsImage.src = 'images/three-dots-icon.png';
        threeDotsImage.alt = 'Menu';
        threeDotsImage.style.width = '16px';
        threeDotsImage.style.cursor = 'pointer';
        threeDotsContainer.appendChild(threeDotsImage);
        threeDotsContainer.onclick = (e) => {
            e.stopPropagation();
            const dropdown = threeDotsContainer.querySelector('.dropdown-menu');
            if ($(dropdown).is(':visible')) {
                $(dropdown).fadeOut(100);
            } else {
                closeAllDropdowns();
                $(dropdown).fadeIn(100);
            }
        };

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        const showFilesOption = document.createElement('a');
        showFilesOption.textContent = 'Show files';
        showFilesOption.href = '#';
        showFilesOption.onclick = (e) => {
            e.stopPropagation();
            toggleVisibility(folderContentDiv, dropdownIcon);
        };

        const viewInDriveOption = document.createElement('a');
        viewInDriveOption.textContent = 'View folder in Drive';
        viewInDriveOption.href = data.link;
        viewInDriveOption.target = '_blank';

        const downloadOption = document.createElement('a');
        downloadOption.textContent = 'Download as Zip file (' + data.size + ')';
        downloadOption.href = data.downloadLink;
        downloadOption.target = '_blank';

        dropdownMenu.appendChild(downloadOption);
        dropdownMenu.appendChild(showFilesOption);
        dropdownMenu.appendChild(viewInDriveOption);
        dropdownMenu.appendChild(downloadOption);

        threeDotsContainer.appendChild(dropdownMenu);

        fileContainer.appendChild(dropdownIcon);
        fileContainer.appendChild(folderName);
        fileContainer.appendChild(threeDotsContainer);

        div.appendChild(fileContainer);
        parentElement.appendChild(div);

        const folderContentDiv = document.createElement('div');
        folderContentDiv.classList.add('folder-content');
        div.appendChild(folderContentDiv);

        const newCounter = { count: 1 };

        data.contents.forEach(item => {
            renderFileStructure(item, folderContentDiv, newCounter);
        });
    } else if (data.type === 'file') {
        const fileDiv = document.createElement('div');
        fileDiv.classList.add('file');

        const fileContainer = document.createElement('div');
        fileContainer.style.display = 'flex';
        fileContainer.style.justifyContent = 'space-between';
        fileContainer.style.alignItems = 'center';
        const fileNameContainer = document.createElement('span');
        fileNameContainer.textContent = `${fileCounter.count}. ${data.name}`;
        fileCounter.count++;
        fileNameContainer.classList.add('file-link');
        fileNameContainer.style.cursor = 'pointer';
        fileNameContainer.onclick = function () {
            window.open(data.link, '_blank');
        };

        const iconContainer = document.createElement('div');
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.marginLeft = 'auto';

        const fileSizeSpan = document.createElement('span');
        fileSizeSpan.textContent = ` (${data.size})`;
        fileSizeSpan.style.margin = '0 10px';

        const downloadButton = document.createElement('a');
        downloadButton.href = data.downloadLink;
        downloadButton.target = "_blank";
        downloadButton.classList.add('download-icon');

        const downloadImage = document.createElement('img');
        downloadImage.src = 'images/download-icon.png';
        downloadButton.appendChild(downloadImage);
        iconContainer.appendChild(downloadButton);
        
        fileContainer.appendChild(fileNameContainer);
        fileContainer.appendChild(fileSizeSpan);
        fileContainer.appendChild(iconContainer);

        fileDiv.appendChild(fileContainer);
        parentElement.appendChild(fileDiv);

    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

document.addEventListener('click', () => {
    closeAllDropdowns();
});

function toggleVisibility(folderContentDiv, dropdownIcon) {
    if ($(folderContentDiv).is(':visible')) {
        $(folderContentDiv).fadeOut(200);
        dropdownIcon.textContent = '▶';
    } else {
        $(folderContentDiv).fadeIn(200);
        dropdownIcon.textContent = '▼';
    }
}
