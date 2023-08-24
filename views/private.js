//Função para ocultar e mostrar conteúdo dos cards da section dos treinos
const buttonsContainer = document.body;

buttonsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('toggle-button')) {
        const formId = event.target.dataset.form;

        // Encontre o formulário correspondente pelo ID
        const form = document.getElementById(formId);

        // Encontre o card correspondente ao botão clicado
        const card = event.target.closest('.card');

        // Alterne a exibição do formulário quando o botão for clicado
        form.style.display = form.style.display === 'none' ? 'block' : 'none';

    }
});

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav li');
const navLink2 = document.querySelectorAll('nav a');

navLinks[0].classList.add('active');
navLink2[0].classList.add('active');

navLinks.forEach((link, index) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    sections.forEach((section) => {
      section.classList.remove('active');
    });
    sections[index].classList.add('active');
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    link.classList.add('active');
  });
});

// Função para mostrar os submenus
const workoutsLink = document.getElementById('workoutsLink');
const nutritionLink = document.getElementById('nutritionLink');
const topbarLinksWorkouts = document.getElementById('topbarLinksWorkouts');
const topbarLinksNutrition = document.getElementById('topbarLinksNutrition');
const homeLink = document.getElementById('home');

homeLink.addEventListener('click', () => {
    topbarLinksNutrition.style.display = 'none';
    topbarLinksWorkouts.style.display = 'none';
})

workoutsLink.addEventListener('click', () => {
    topbarLinksWorkouts.style.display = 'block';
    topbarLinksNutrition.style.display = 'none';
});

nutritionLink.addEventListener('click', () => {
    topbarLinksNutrition.style.display = 'block';
    topbarLinksWorkouts.style.display = 'none';
});

// Função para diminuir e aumentar o tamanho do nav e ajustar o tamanho do main
const toggleNavWidthButton = document.getElementById('toggleNavWidth');
const mainElement = document.querySelector('main');
const nav = document.querySelector('nav')

let isNavCollapsed = false; 

toggleNavWidthButton.addEventListener('click', () => {
    nav.classList.toggle('collapsed');
    isNavCollapsed = !isNavCollapsed; 

    if (isNavCollapsed) {
        toggleNavWidthButton.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
        toggleNavWidthButton.style.margin = '70px 0px 40px 20px';
        mainElement.style.width = 'calc(100% - 80px)';
        mainElement.style.left = '80px';
    } else {
        toggleNavWidthButton.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
        toggleNavWidthButton.style.margin = '70px 0px 40px 160px';
        
        mainElement.style.width = 'calc(100% - 200px)';
        mainElement.style.left = '200px';
        
    }
});

// Função para abrir janela oculta do usuário
const userImage = document.getElementById('userImage');
const userModal = document.getElementById('userModal');
const closeModal = document.getElementById('closeModal');
const imageInput = document.getElementById('imageInput');

userImage.addEventListener('click', () => {
    userModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    userModal.style.display = 'none';
});

imageInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    // Aqui você pode fazer algo com o arquivo selecionado, como enviar para o servidor, etc.
});



// Função para enviar os dados do card para o servidor e salvar no MongoDB Atlas
async function salvarDados() {
    const cards = document.querySelectorAll('.card');
    const data = [];

    cards.forEach((card, index) => {
        const nome = card.querySelector(`#nome${index + 1}`).value;
        const descricao = card.querySelector(`#descricao${index + 1}`).value;
        const exercicio = card.querySelector(`#exercicio${index + 1}`).value;
        const series = card.querySelector(`#series${index + 1}`).value;
        const repeticoes = card.querySelector(`#repeticoes${index + 1}`).value;
        const peso_max = card.querySelector(`#peso_max${index + 1}`).value;
        const repeticoes_peso_max = card.querySelector(`#repeticoes_peso_max${index + 1}`).value;
        const data_completado = card.querySelector(`#data_completado${index + 1}`).value;

        data.push({
            nome,
            descricao,
            exercicio,
            series,
            repeticoes,
            peso_max,
            repeticoes_peso_max,
            data_completado
        });
    });

    try {
        // Substitua a URL abaixo pela URL do seu servidor/API que irá salvar os dados no MongoDB Atlas
        const response = await axios.post(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ffottnq.mongodb.net/?retryWrites=true&w=majority`, { data });
        console.log('Treino salvo com sucesso'); 
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }
}