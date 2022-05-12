import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "./config/firebase";

function App() {
  const initialValues = {
    name: "",
    age: "",
    phone: "",
    church: "",
  };
  const [values, setValue] = useState(initialValues);
  const [colection, setColection] = useState([]);

  const infoNotes = query(collection(db, "inscriptions"));

  const handleInfo = async () => {
    const querySnapshot = await getDocs(infoNotes);
    setColection(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValue(newValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "inscriptions"), {
        name: values.name,
        age: values.age,
        phone: values.phone,
        church: values.church,
      });
    } catch (error) {
      console.log(error);
    }
    setValue(initialValues);
  };

  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, "inscriptions", id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleInfo();
  }, [colection]);
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <main className="App-main">
        <section className="App-main-form">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={handleSubmit} className="App-form">
            <label htmlFor="name">Escribe tu nombre</label>
            <input
              id="name"
              value={values.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Nombre"
            />

            <label htmlFor="age">Escribe tu edad</label>
            <input
              id="age"
              value={values.age}
              onChange={handleChange}
              name="age"
              type="number"
              placeholder="Edad"
            />

            <label htmlFor="phone">Escribe tu Telefono</label>
            <input
              id="phone"
              value={values.phone}
              onChange={handleChange}
              name="phone"
              type="number"
              placeholder="Telefono"
            />

            <label htmlFor="church">Escribe tu Iglesia</label>
            <input
              id="church"
              value={values.church}
              onChange={handleChange}
              name="church"
              type="text"
              placeholder="Iglesia"
            />
            <input type="submit" value="submit" className="button" />
          </form>
        </section>
        <section className="App-main-list">
          <div className="App-main-count">
            <p>Los que se han inscrito son:</p>
            <h1 className="count">{colection.length}</h1>
          </div>
          {colection.map((data) => (
            <div key={data.id} className="App-main-map">
              <h1>{data.data.name}</h1>
              <button onClick={() => deleteDocument(data.id)}>Eliminar</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
