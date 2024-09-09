import axios from 'axios';
let lastId = 0;
// Função para buscar dados da API e atualizar a tela
async function fetchData() {
     try {
          const response = await axios.get('http://localhost:3000/messages');
          let data = response.data;
          let data_ = data[data.length - 1];
          if (data_ && lastId != data_.id) {
               // Atualizar o conteúdo da tela
               const messageElement = document.getElementById('input');
               const listElement = document.getElementById('list');
               (messageElement as HTMLParagraphElement).textContent = "";
               const item = document.createElement('li');
               item.textContent = `Message: ${data_.message}, Date: ${data_.date}`;
               listElement?.append(item);
               lastId = data.id;
          }
     } catch (error) {
          console.error('Error fetching data:', error)
     }
}


async function sendData(m: any) {
     const body = {
          id: Math.random(),
          message: m,
          date: Date.now()
     }
     try {
          const response = axios.post('http://localhost:3000/messages', JSON.stringify(body));
          if ((await response).status) {
          }
          fetchData();
     } catch (error) {
          console.error('Error sending data:', error);
     }
}

setInterval(() => {
     fetchData();
}, 5000);


document.querySelector('#btn-send')?.addEventListener('click', function () {
     const input = document.getElementById('input');
     var data = (input as HTMLInputElement).value;
     sendData(data);
})

document.addEventListener('DOMContentLoaded', fetchData);