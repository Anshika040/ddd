import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

type FeedbackEntry = {
  label: string;
  MERN: number;
  ProblemSolving: number;
  SQLAnalytics: number;
};

const weeklyData: FeedbackEntry[] = [
  { label: 'Week 1', MERN: 8, ProblemSolving: 7, SQLAnalytics: 6 },
  { label: 'Week 2', MERN: 9, ProblemSolving: 8, SQLAnalytics: 7 },
  { label: 'Week 3', MERN: 7, ProblemSolving: 9, SQLAnalytics: 8 },
  { label: 'Week 4', MERN: 8, ProblemSolving: 7, SQLAnalytics: 9 },
];

const monthlyData: FeedbackEntry[] = [
  { label: 'Jan', MERN: 7, ProblemSolving: 6, SQLAnalytics: 5 },
  { label: 'Feb', MERN: 8, ProblemSolving: 7, SQLAnalytics: 7 },
  { label: 'Mar', MERN: 9, ProblemSolving: 8, SQLAnalytics: 8 },
  { label: 'Apr', MERN: 9, ProblemSolving: 9, SQLAnalytics: 9 },
];

const FeedbackTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const data = selectedPeriod === 'weekly' ? weeklyData : monthlyData;

  const getAverage = (key: keyof Omit<FeedbackEntry, 'label'>) => {
    const sum = data.reduce((total, entry) => total + entry[key], 0);
    return (sum / data.length).toFixed(1);
  };

  const summary =
    selectedPeriod === 'weekly'
      ? `You’re steadily improving in MERN and Problem Solving this week.`
      : `Your monthly trend shows consistent growth in SQL & Analytics skills.`;

  return (
    <div style={{ padding: '32px', paddingLeft: '230px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b' }}>📈 Technical Skill Trends</h1>
        <p style={{ color: '#64748b' }}>Track your performance growth across key tech skill areas</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontWeight: 500, fontSize: '14px', color: '#334155', marginRight: '12px' }}>Select Period:</label>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as 'weekly' | 'monthly')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            color: '#1e293b'
          }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LineChart width={650} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="MERN" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="ProblemSolving" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="SQLAnalytics" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </div>

      <div style={{ marginTop: '30px', color: '#475569' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>📊 Average Scores</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '15px' }}>
          <li>MERN: {getAverage('MERN')}/10</li>
          <li>Problem Solving: {getAverage('ProblemSolving')}/10</li>
          <li>SQL & Analytics: {getAverage('SQLAnalytics')}/10</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '24px',
          background: '#e2e8f0',
          padding: '16px',
          borderRadius: '10px',
          fontStyle: 'italic',
          color: '#1e293b',
          lineHeight: '1.6'
        }}
      >
        💡 <strong>Insight:</strong> {summary}
      </div>
    </div>
  );
};

export default FeedbackTrends;
