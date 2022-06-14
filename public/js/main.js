
const deleteText = document.querySelectorAll('.fa-trash')
const updateBTN = document.querySelectorAll('.updateBTN')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCharacter)
})

Array.from(updateBTN).forEach((element)=>{
    element.addEventListener('click', updateCharacter)
    element.addEventListener('click', (ev)=>{
        ev.preventDefault()
    })
})

async function updateCharacter(){
    const uName = this.parentNode.updatedName.value
    const uRace = this.parentNode.updatedRace.value
    const uAge = this.parentNode.updatedAge.value
    const ids = this.parentNode._id.value
    try{
        const response = await fetch('updateCharacter',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'ids' : ids,
                'uName' : uName,
                'uRace' : uRace,
                'uAge' : uAge
            })
        })
        const data = await response.json()
        console.log(`${uName} ${uRace} ${uAge} ${ids}`)
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}


async function deleteCharacter(){
    const ids = this.parentNode.id
    try{
        const response = await fetch('deleteCharacter',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'ids': ids
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
} 