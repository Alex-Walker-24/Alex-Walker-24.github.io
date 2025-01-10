window.onscroll=function()
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


const box = document.getElementById('box')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')



box.addEventListener('mouseenter',()=>
{
    box.classList.replace('rojo','verde')
})

box.addEventListener('mouseleave',()=>
{
    box.classList.replace('verde','rojo')
})



box2.addEventListener('mouseenter',()=>
{
    box2.classList.replace('rojo','verde')
})

box2.addEventListener('mouseleave',()=>
{
    box2.classList.replace('verde','rojo')
})



box3.addEventListener('mouseenter',()=>
{
    box3.classList.replace('rojo','verde')
})

box2.addEventListener('mouseleave',()=>
{
    box3.classList.replace('verde','rojo')
})




