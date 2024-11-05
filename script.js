const img = document.querySelector('#omid-pic img');
const popupMessage = document.getElementById('popup-message');

img.addEventListener('mouseover', () => {
    popupMessage.style.display = 'block'; 
});

img.addEventListener('mouseout', () => {
    popupMessage.style.display = 'none'; 
});