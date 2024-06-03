let localQuotes = [
    {
      text: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
      author: 'Thomas Edison',
    },
   
  ];

  (async()=>{
    // fetch quotes
    try{
      const res = await fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json")
      localQuotes = await res.json()
    }catch(e){
      console.log(e)
    }

    let count = 0;
    let quoteElement = document.querySelector(".quote_text span")
    let authorElement = document.querySelector(".quote_author")
    const twitterBtn = document.querySelector('.twitter')
    twitterBtn.addEventListener("click", ()=>{
      window.open(`https://twitter.com/intent/post?text=${quoteElement.innerText}\n - ${authorElement.innerText}`)
    })

    let maxLen = localQuotes.length
    console.log(maxLen)

    document.querySelector("#new_quote").addEventListener("click", ()=>{
      if(count === maxLen){
        count = 0
      }
        
        quoteElement.innerText = localQuotes[count].text
        authorElement.innerText = localQuotes[count].author
       
        count++
    })
  })()