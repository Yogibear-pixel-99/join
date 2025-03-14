function setActive(button, priority) {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
      button.querySelector('img').classList.remove('active');
      button.style.backgroundColor = '#ffffff'; 
      button.querySelector('img').style.filter = ''; 
      return;
    }
   
    const buttons = document.querySelectorAll('.btn-importance');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.querySelector('img').classList.remove('active');
      btn.style.backgroundColor = '#ffffff'; 
      btn.querySelector('img').style.filter = ''; 
    });
  
    button.classList.add('active');
    button.querySelector('img').classList.add('active');
    
    if (priority === 'prio') {
      button.style.backgroundColor = 'red'; 
    } else if (priority === 'medium') {
      button.style.backgroundColor = '#FFA800'; 
    } else if (priority === 'low') {
      button.style.backgroundColor = 'green'; 
    }
  
    button.querySelector('img').style.filter = 'brightness(0) saturate(100%) invert(1)';
  }
  
  