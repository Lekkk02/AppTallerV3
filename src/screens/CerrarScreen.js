import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const CerrarSesionScreen = ({ navigation }) => {
  useEffect(() => {
    const auth = FIREBASE_AUTH;

    const cerrarSesion = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    };

    cerrarSesion();
  }, []);

  return <></>;
};

export default CerrarSesionScreen;
