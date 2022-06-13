const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

console.log("deleteText + thumbText")

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCharacter)
})


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