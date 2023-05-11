import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  
  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(newUser => {
        
        setData([...data, newUser]);
       
        setFormData({
          name: '',
          email: ''
        });
      });
  }

 
  function handleClearHistory() {
    setData([]);
  }

  return (
    <div className="App">
      <h2>Liste des utilisateurs</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <button onClick={handleClearHistory}>Effacer l'historique</button>
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default App;
