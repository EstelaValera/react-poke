import React, { useState, useEffect } from 'react'
import './App.css';

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!searchTerm) {
        setPokemon(null);
        setError('');
        return;
      }

      setLoading(true)
      setError('')

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        if (!response.ok) throw new Error('Pokémon no encontrado')

        const data = await response.json()
        setPokemon(data)
      } catch (err) {
        setError(err.message)
        setPokemon(null)
      } finally{
        setLoading(false)
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchPokemon();
    }, 200);
  
        return () => clearTimeout(delayDebounceFn);
      }, [searchTerm]);

  return (
    <div className='app'>
      <h1>Buscar Pokémon</h1>
      <form onSubmit={setPokemon} >
        <label htmlFor='nombre'>Nombre del Pokémon</label>
      <input 
      type='text'
      id='nombre'
      name='nombre'
      placeholder='Busca un Pokémon'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>

      {loading && <p>Cargando</p>}
      {error && <p className='error'>{error}</p>}
      {pokemon && (
        <div className='pokemon'>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  )
}

export default App;
