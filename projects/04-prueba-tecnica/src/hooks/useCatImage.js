import { useState, useEffect } from 'react'

// Crear un CUSTOM HOOK
export function useCatImage ({ fact }) {
    const [imageURL, setImageURL] = useState()
    
    // para recuperar la imagen con las 3 palabras
    useEffect(() => {
        if (!fact) return
        
        const threeFirstWord = fact.split(' ', 3).join(' ')
        console.log(threeFirstWord)

        fetch(`https://cataas.com/cat/says/${threeFirstWord}?json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageURL(url)
                console.log(url)
        })
    }, [fact])

    return { imageURL }
}   // { imageUrl: 'https://...' }