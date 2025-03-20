


function toggleOverlayMenu(overlay){
    const overlay = document.getElementById(overlay); // Das zu erscheinende overlay
    const mask = document.getElementById('mask-container'); // standard
    const mainContent = document.getElementById('main-container'); // standard
        overlay.classList.toggle('standard-overlay-hide'); //universelle klasse für alle overlays 
        mask.classList.toggle('d-none'); // standard
        mainContent.classList.toggle('disable-pointer-events'); // standard
}
