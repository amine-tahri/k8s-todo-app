import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || '';

const styles = {
  container: {
    maxWidth: 640,
    margin: '40px auto',
    padding: '0 16px',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  form: {
    display: 'flex',
    gap: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    fontSize: 15,
    border: '1.5px solid #e0e0e0',
    borderRadius: 10,
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.15s',
  },
  addBtn: {
    padding: '10px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    transition: 'background 0.15s',
  },
  filters: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: (active) => ({
    padding: '5px 14px',
    fontSize: 13,
    border: '1.5px solid',
    borderColor: active ? '#2563eb' : '#e0e0e0',
    borderRadius: 20,
    background: active ? '#eff6ff' : '#fff',
    color: active ? '#2563eb' : '#666',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s',
  }),
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  card: (completed) => ({
    background: '#fff',
    border: '1.5px solid',
    borderColor: completed ? '#d1fae5' : '#e0e0e0',
    borderRadius: 12,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'border-color 0.15s',
  }),
  checkbox: {
    width: 20,
    height: 20,
    accentColor: '#2563eb',
    cursor: 'pointer',
    flexShrink: 0,
  },
  todoText: (completed) => ({
    flex: 1,
    fontSize: 15,
    color: completed ? '#9ca3af' : '#1a1a1a',
    textDecoration: completed ? 'line-through' : 'none',
  }),
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#d1d5db',
    fontSize: 18,
    lineHeight: 1,
    padding: '2px 6px',
    borderRadius: 6,
    transition: 'color 0.15s, background 0.15s',
  },
  date: {
    fontSize: 11,
    color: '#c0c0c0',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#aaa',
    fontSize: 15,
  },
  stats: {
    display: 'flex',
    gap: 16,
    marginBottom: 20,
    fontSize: 13,
    color: '#666',
  },
  statItem: {
    background: '#fff',
    border: '1.5px solid #e0e0e0',
    borderRadius: 8,
    padding: '6px 14px',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    borderRadius: 8,
    padding: '10px 14px',
    marginBottom: 16,
    fontSize: 14,
  },
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API}/api/todos`);
      if (!res.ok) throw new Error('Erreur serveur');
      setTodos(await res.json());
      setError('');
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez que le backend tourne.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const res = await fetch(`${API}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input }),
      });
      if (!res.ok) throw new Error();
      const todo = await res.json();
      setTodos(prev => [todo, ...prev]);
      setInput('');
    } catch {
      setError('Erreur lors de l\'ajout.');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`${API}/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setTodos(prev => prev.map(t => t.id === id ? updated : t));
    } catch {
      setError('Erreur lors de la mise à jour.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/api/todos/${id}`, { method: 'DELETE' });
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const doneCount = todos.filter(t => t.completed).length;

  const formatDate = (iso) => new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>K8s Todo App</h1>
        <p style={styles.subtitle}>Node.js · React · PostgreSQL — fil rouge Kubernetes</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <form style={styles.form} onSubmit={addTodo}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          maxLength={200}
        />
        <button style={styles.addBtn} type="submit">Ajouter</button>
      </form>

      <div style={styles.stats}>
        <span style={styles.statItem}>Total : {todos.length}</span>
        <span style={styles.statItem}>Terminées : {doneCount}</span>
        <span style={styles.statItem}>Restantes : {todos.length - doneCount}</span>
      </div>

      <div style={styles.filters}>
        {['all','active','done'].map(f => (
          <button
            key={f}
            style={styles.filterBtn(filter === f)}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Toutes' : f === 'active' ? 'En cours' : 'Terminées'}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={styles.empty}>Chargement...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.empty}>Aucune tâche ici.</p>
      ) : (
        <ul style={styles.list}>
          {filtered.map(todo => (
            <li key={todo.id} style={styles.card(todo.completed)}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <div style={{ flex: 1 }}>
                <div style={styles.todoText(todo.completed)}>{todo.title}</div>
                <div style={styles.date}>{formatDate(todo.created_at)}</div>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTodo(todo.id)}
                title="Supprimer"
              >×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
