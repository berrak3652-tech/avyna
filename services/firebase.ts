
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCAnHYKPY6ILX0RoxhcbV2zkxO6Jy7TQD4",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "avyna-11c6e.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "avyna-11c6e",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "avyna-11c6e.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "597647622010",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:597647622010:web:068c1ffde612a19824e0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Firestore Collections & Helpers
export const PRODUCTS_COLLECTION = "products";
export const ORDERS_COLLECTION = "orders";

// Service Functions
export const FirebaseService = {
    // Products
    async getProducts() {
        const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("name"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async addProduct(product: any) {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
        return { id: docRef.id, ...product };
    },

    async deleteProduct(id: string) {
        await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    },

    // Orders
    async createOrder(order: any) {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...order,
            createdAt: new Date().toISOString(),
            status: 'pending'
        });
        return docRef.id;
    }
};
