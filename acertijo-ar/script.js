
let selectedText = "";
let selectedImage = "";

document.querySelectorAll('.answer-option').forEach(option => {
  option.addEventListener('click', function() {
    selectedText = this.dataset.text;
    selectedImage = this.dataset.img;
    document.getElementById('result-message').innerText = 'Seleccionaste: ' + selectedText;
    document.getElementById('go-ar').disabled = false;
  });
});

document.getElementById('go-ar').addEventListener('click', function() {
  const container = document.getElementById('user-choice-container');
  container.innerHTML = "";

  if(selectedImage) {
    const imgEl = document.createElement('a-image');
    imgEl.setAttribute('src', selectedImage);
    imgEl.setAttribute('position', '0 0.5 0');
    imgEl.setAttribute('width', '1');
    imgEl.setAttribute('height', '1');
    container.appendChild(imgEl);
  }

  const textEl = document.createElement('a-text');
  textEl.setAttribute('value', selectedText);
  textEl.setAttribute('position', '-0.7 1.2 0');
  textEl.setAttribute('scale', '2 2 2');
  textEl.setAttribute('color', '#FFFF00');
  container.appendChild(textEl);

  document.getElementById('result-message').innerText = "Ahora escanea el marcador Hiro";
});
    