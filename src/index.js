console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded',()=>{
    const images= document.getElementById('dog-image-container')
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const breeds = document.getElementById('dog-breeds')
    const select =  document.getElementById('breed-dropdown')

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
      }

    fetch(imgUrl).then(res=>res.json())
    .then(data=>{
        
        data.message.forEach(element => {
            const img = document.createElement('img')
            img.setAttribute('src', element)
            images.appendChild(img)
        });
    })

    // fetch(breedUrl).then(res=>res.json())
    // .then(data=>{

    //     Object.keys(data.message).forEach(el=>{
    //         const li = document.createElement('li')
    //         li.innerHTML =`<button class='breed'>${el}</button>`
    //         breeds.appendChild(li)
            
    //     })
    //     const btn = document.getElementsByClassName('breed')
    //     Array.from(btn).forEach(button=>{
    //         button.addEventListener('click', (e)=>{
    //             const randomColor= getRandomColor()
    //             e.target.style.background= randomColor
    //         })
    //     })
    // })
    fetchBreeds()
    select.addEventListener('change',(e)=>{
        const char = e.target.value
        fetchBreeds(char)

    })
    function fetchBreeds(breed= ""){
            fetch(breedUrl).then(res=>res.json())
            .then(data=>{
                const breedArr=Object.keys(data.message)
                const char= breed.toLocaleLowerCase()
                const selected = breedArr.filter(bd=>{
                    return bd.startsWith(char)
                })
                if(breed===""){
                    breeds.innerHTML=""
                    breedArr.forEach(el=>{
                    const li = document.createElement('li')
                    li.innerHTML =`<button class='breed'>${el}</button>`
                    breeds.appendChild(li)
                    
                })}
                else{
                    breeds.innerHTML=""
                    selected.forEach(el=>{
                        const li = document.createElement('li')
                        li.innerHTML =`<button class='breed'>${el}</button>`
                        breeds.appendChild(li)
                        
                    })
                }
                const btn = document.getElementsByClassName('breed')
                Array.from(btn).forEach(button=>{
                    button.addEventListener('click', (e)=>{
                        const randomColor= getRandomColor()
                        e.target.style.background= randomColor
                    })
                }) 
            }) 
    }
})