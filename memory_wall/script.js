// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyD1LUD2zR2RPB73JY_ZNX7Ot7AswGyFPy0",
    authDomain: "gallery-9abdb.firebaseapp.com",
    projectId: "gallery-9abdb",
    storageBucket: "gallery-9abdb.firebasestorage.app",
    messagingSenderId: "724509582545",
    appId: "1:724509582545:web:ff2f2457c91080deb1d1f0",
    measurementId: "G-L73WEKXJXW"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Function to upload image
async function uploadImage() {
    const file = document.getElementById("imageUpload").files[0];
    const caption = document.getElementById("caption").value;
    const user = new URLSearchParams(window.location.search).get('user');
    
    if (!file) return alert("Please select an image!");

    const storageRef = storage.ref(`${user}/images/${file.name}`);
    await storageRef.put(file);
    const imageUrl = await storageRef.getDownloadURL();

    // Save image details to Firestore
    await db.collection("users").doc(user).collection("memories").add({
        url: imageUrl,
        caption: caption,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Image uploaded successfully!");
    displayImages(user); // Refresh gallery
}

// Function to display images
async function displayImages(user) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";  // Clear the gallery

    const snapshot = await db.collection("users").doc(user).collection("memories")
                             .orderBy("timestamp", "desc")
                             .get();

    snapshot.forEach(doc => {
        const data = doc.data();
        const imageCard = `
            <div class="image-card">
                <img src="${data.url}" alt="Memory">
                <p>${data.caption}</p>
            </div>
        `;
        gallery.innerHTML += imageCard;
    });
}
