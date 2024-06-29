// Configuración de Firebase
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referencia a la colección de comentarios
const commentsRef = db.collection('comments');

// Cargar comentarios existentes
commentsRef.orderBy('timestamp', 'asc').onSnapshot(snapshot => {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    snapshot.forEach(doc => {
        const commentData = doc.data();
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentData.text;
        commentsContainer.appendChild(newComment);
    });
});

// Manejar envío de formulario
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value;

    if (commentText) {
        commentsRef.add({
            text: commentText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            commentInput.value = '';
        }).catch(error => {
            console.error('Error al añadir el comentario: ', error);
        });
    }
});
