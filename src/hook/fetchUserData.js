import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("Token no encontrado");
    }

    const res = await fetch(
      "https://tesis-back.azurewebsites.net/api/users/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data.user;
    } else {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Error al obtener datos del usuario"
      );
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario", error);
    throw error;
  }
};

export default fetchUserData;
