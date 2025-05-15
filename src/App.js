
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/data/2025BowmanChecklist.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  const filtered = data.filter(entry =>
    entry.player.toLowerCase().includes(search.toLowerCase()) ||
    entry.team.toLowerCase().includes(search.toLowerCase()) ||
    entry.category.toLowerCase().includes(search.toLowerCase()) ||
    entry.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
    entry.year.toString().includes(search)
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>2025 Bowman Checklist</h1>
      <input
        type="text"
        placeholder="搜尋球員、卡號、分類、球隊、年份"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: 400 }}
      />
      <div style={{ marginTop: 20 }}>
        {filtered.map((entry, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <strong>{entry.player}</strong><br />
            Team: {entry.team}<br />
            Card #: {entry.cardNumber}<br />
            Category: {entry.category}<br />
            Year: {entry.year}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
