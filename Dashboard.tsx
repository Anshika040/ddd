import { BarChart3, Clock, Flame, ListChecks, MessageCircle, X } from "lucide-react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ProgressChart from "../components/Charts/ProgressChart";
import ACChart from "../components/Charts/XPChart";
import PerformanceMeter from "../components/Charts/PerformanceMeter";
import MiniGames from "../components/Gamification/MiniGames";
import Courses from "../components/Dashboard/Courses";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Streak from "../components/Dashboard/Streak";
import Badges from "../components/Dashboard/Badges";
import EducationalChatbot from "./DDD-chatbot";
import "./styles.css";
import { useEffect, useState } from "react";

const metrics = [
  {
    icon: <Clock size={24} />,
    title: "Watch Time",
    value: "12h 30m",
    subtitle: "Weekly Total",
    change: "+5.4%",
  },
  {
    icon: <ListChecks size={24} />,
    title: "Videos Completed",
    value: "36",
    subtitle: "In This Week",
    change: "+8.2%",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Evaluation Completed",
    value: "59%",
    subtitle: "Average",
    change: "+1.5%",
  },
  {
    icon: <Flame size={24} />,
    title: "Current Streak",
    value: "7 Days",
    subtitle: "Daily Activity",
    change: "🔥",
  },
];

const DashboardOverview = () => {
  const [theme, setTheme] = useState("light");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="dashboard-new">
      <div className="dashboard-header">
        <h1 className="dashboard-heading">
          PES Dashboard
          <b>
            <div className="label">Welcome to your Dashboard!</div>
          </b>
        </h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Top Metrics */}
      <div className="metrics-row">
        {metrics.map((m) => (
          <DashboardCard
            key={m.title}
            icon={m.icon}
            title={m.title}
            value={m.value}
            subtitle={m.subtitle}
            change={m.change}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="vertical-charts">
        <div className="dashboard-card">
          <div className="card-content">
            <ProgressChart />
            <div className="label">Weekly Progress</div>
            <div className="sublabel">Your learning growth</div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <ACChart />
            <div className="label">XP Performance</div>
            <div className="sublabel">Weekly Accuracy</div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <PerformanceMeter />
            <div className="label">Today's Meter</div>
            <div className="sublabel">Activity Summary</div>
          </div>
        </div>
      </div>

      {/* Mini Games */}
      <div className="dashboard-card minigames-card">
        <div className="card-content">
          <h3 className="label">Mini Games</h3>
          <MiniGames />
        </div>
      </div>
      <div className="dashboard-card minigames-card">
        <div className="card-content">
          <Courses/>
          <h3 className="label">Courses </h3>
        </div>
      </div>

      {/* Streak & Badges Section */}
      <div className="streaks-badges-section">
        <div className="dashboard-card">
          <div className="card-content">
            <Streak />
            <h3 className="label">Your Streak</h3>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-content-badges">
            <Badges />
             <h3 className="label">Achievement Badges</h3>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="dashboard-card leaderboard-card">
        <div className="card-content">
          <Leaderboard />
          <h3 className="label">Leaderboard</h3>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div 
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#4f46e5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
      >
        <MessageCircle color="white" size={24} />
      </div>

      {/* Floating Chat Window */}
      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '400px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          {/* Chat Header */}
          <div style={{
            background: '#4f46e5',
            color: 'white',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '600' }}>DDD Assistant</span>
            <button 
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Content */}
          <div style={{ height: 'calc(100% - 56px)' }}>
            <EducationalChatbot />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
