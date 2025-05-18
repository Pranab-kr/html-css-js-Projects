    async function getRandomImage() {
      try {
        const response = await fetch('https://api.waifu.im/search?included_tags=raiden-shogun');
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          document.getElementById('raidenImg').src = data.images[0].url;
        } else {
          console.error('No image found');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
