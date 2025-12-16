import { Injectable } from '@angular/core';
import { collection, getDocs } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from '../../environments/environment.development';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app = initializeApp(environment.firebase);
 // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);
  auth = getAuth(this.app)



  async getFirebase(){
    const querySnapshot = await getDocs(collection(this.db, "todos"));
    const userName = ''
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())} user`);
    });
  }


}
