var subtitleNumber = 0;
function addSubtitle() {
    subtitleNumber += 1;
    let subtitleList = document.getElementById("subtitle-list");
    if (subtitleList.childElementCount > 1) {
        alert("Erorr: Subtitle overflow!");
        return;
    }
    let subtitleItem = document.createElement("div");
    subtitleItem.className = "subtitle-item";
    subtitleItem.id = `subtitle-item-${subtitleNumber}`;
    subtitleItem.innerHTML = `
<select name="subtitle-${subtitleNumber}" id="subtitle-${subtitleNumber}">
    <option value="vi">Tiếng Việt</option>
    <option value="en">English</option>
</select>
<input type="url" name="subtitle-link-${subtitleNumber}" id="subtitle-link-${subtitleNumber}">
<button type="button" class="btn-red" onclick="removeSubtitle(${subtitleNumber})">Remove</button>`;
    subtitleList.appendChild(subtitleItem);
    genEmbedCode();
}

function removeSubtitle(id) {
    document.getElementById(`subtitle-item-${id}`).remove();
    genEmbedCode();
}

var embedCode = document.getElementById("embed-code");
function genEmbedCode() {
    let magnetLink = document.getElementById("magnet-link").value;
    let title = document.getElementById("title").value;
    let dataPath = document.getElementById("data-path").value;
    let subtitle = "";
    let subtitleList = document.getElementById("subtitle-list").children;
    for (let i = 0; i < subtitleList.length; i++) {
        // select element
        let selectNode = subtitleList[i].children[0];
        let selectValue = selectNode.value;
        let selectText = selectNode.options[selectNode.selectedIndex].text;
        // input element
        let inputValue = subtitleList[i].children[1].value;
        // append subtitle
        if (inputValue != "") {
            subtitle += `
<track srclang="${selectValue}" label="${selectText}" default src="${inputValue}">`;
        }
    }
    let code = `
<video controls src="${magnetLink}" data-title="${title}" data-path="${dataPath}">${subtitle}</video>
<script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charset="utf-8" async></script>`;
    if (magnetLink != "" && title != "" && dataPath != "") {
        embedCode.innerText = code;
    }
}

function resetForm() {
    subtitleNumber = 0;
    document.getElementById("form-info").reset();
    let subtitleItem = document.getElementsByClassName("subtitle-item");
    while (subtitleItem.length > 0) {
        subtitleItem[0].remove();
    }
    embedCode.innerText = "";
}

function copyCodeEmbed() {
    if (embedCode.value == "") {
        alert("Error: NULL value!");
        return;
    }
    embedCode.select();
    navigator.clipboard.writeText(embedCode.value);
    embedCode.focus();
}
