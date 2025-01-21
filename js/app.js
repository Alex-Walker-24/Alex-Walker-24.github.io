//Primero capturamos el elemento del DOM con el id que definimos en el html
const text = document.getElementById("animate-text");
let str = text.innerHTML;
text.innerHTML = "";

//Declaramos una varible en la que asignaremos un valor para que sea el tiempo en ms que durará la función setTimeout
const speed = 40;
let i = 0;

//Esta función recorre todos los caracteres nuestro texto
const typeWriter = () => {
  if (i < str.length) {
    text.innerHTML += str.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
};

//Acá ejecutamos la función
setTimeout(typeWriter, speed);




document.querySelectorAll('.button').forEach(button => {

  let div = document.createElement('div'),
      letters = button.textContent.trim().split('');

  function elements(letter, index, array) {

      let element = document.createElement('span'),
          part = (index >= array.length / 2) ? -1 : 1,
          position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
          move = position / (array.length / 2),
          rotate = 1 - move;

      element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
      element.style.setProperty('--move', move);
      element.style.setProperty('--rotate', rotate);
      element.style.setProperty('--part', part);

      div.appendChild(element);

  }

  letters.forEach(elements);

  button.innerHTML = div.outerHTML;

  button.addEventListener('mouseenter', e => {
      if(!button.classList.contains('out')) {
          button.classList.add('in');
      }
  });

  button.addEventListener('mouseleave', e => {
      if(button.classList.contains('in')) {
          button.classList.add('out');
          setTimeout(() => button.classList.remove('in', 'out'), 950);
      }
  });

});













particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjQ0JENUUxIiBoZWlnaHQ9IjgwMHB4IiB3aWR0aD0iODAwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgCgkgdmlld0JveD0iMCAwIDE5MCAxOTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBkPSJNMy41MywwaDE4Mi45NHY0NC43OGgtMzIuNDM5VjMyLjQzOUg3My4wMTdMMTI1LjQyLDk1bC01Mi40MDMsNjIuNTYxaDgxLjAxNVYxNDUuMjJoMzIuNDM5VjE5MEgzLjUzbDc5LjU3NC05NUwzLjUzLDB6Ii8+Cjwvc3ZnPg==",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 10,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);





{
    if($("#menu").offset().top > 100)
        {
            document.getElementById('menu').style.background = 'rgba(255,159,69,0.85) 100%';
            document.getElementById('menu').style.transition = '0.5s';
            document.getElementById('CambioTexto').style.color = '#F6F6F6';
            document.getElementById('CambioTexto2').style.color = '#F6F6F6';
            document.getElementById('CambioTexto3').style.color = '#F6F6F6';
            document.getElementById('CambioTexto4').style.color = '#F6F6F6';
        }
        else
        {
            document.getElementById('menu').style.background = '';
            document.getElementById('CambioTexto').style.color = '#F76E11';
            document.getElementById('CambioTexto2').style.color = '#F76E11';
            document.getElementById('CambioTexto3').style.color = '#F76E11';
            document.getElementById('CambioTexto4').style.color = '#F76E11';
        }
}





