export const getSongs = async (schStr) => {
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${schStr}`, {
      method: "GET",
      crossDomain: true,
      headers: {
        'Content-Type':'application/json',
        "access-control-allow-origin" : "*"
      },
      mode:'cors'
    }).then(response => response.json());
    
    return response.results;
  }
  catch(error){
    throw error;
  }
}