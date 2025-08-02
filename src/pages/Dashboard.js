import React, { useState, useEffect } from 'react';
import { todoAPI } from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [stats, setStats] = useState({
    total_todos: 0,
    completed_todos: 0,
    pending_todos: 0,
    completion_rate: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchTodos();
      await fetchStats();
    };
    loadData();
  }, [filter, sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const params = {
        sort_by: sortBy,
        order: sortOrder,
      };

      if (filter === 'completed') {
        params.completed = true;
      } else if (filter === 'pending') {
        params.completed = false;
      }

      const response = await todoAPI.getTodos(params);
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await todoAPI.getTodoStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos(prev => [response.data.todo, ...prev]);
      toast.success('Todo added successfully!');
      fetchStats(); // Update stats
    } catch (error) {
      console.error('Failed to add todo:', error);
      toast.error('Failed to add todo');
      throw error;
    }
  };

  const handleUpdateTodo = async (todoId, updateData) => {
    try {
      const response = await todoAPI.updateTodo(todoId, updateData);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? response.data.todo : todo
        )
      );
      toast.success('Todo updated successfully!');
      fetchStats(); // Update stats
    } catch (error) {
      console.error('Failed to update todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await todoAPI.deleteTodo(todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
      toast.success('Todo deleted successfully!');
      fetchStats(); // Update stats
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  const handleBulkComplete = async () => {
    const pendingTodos = todos.filter(todo => !todo.completed);
    if (pendingTodos.length === 0) {
      toast.info('No pending todos to complete');
      return;
    }

    try {
      const todoIds = pendingTodos.map(todo => todo.id);
      await todoAPI.bulkUpdateTodos({
        todo_ids: todoIds,
        updates: { completed: true }
      });
      
      setTodos(prev =>
        prev.map(todo =>
          todoIds.includes(todo.id) ? { ...todo, completed: true } : todo
        )
      );
      
      toast.success(`Marked ${todoIds.length} todos as completed!`);
      fetchStats();
    } catch (error) {
      console.error('Failed to bulk complete todos:', error);
      toast.error('Failed to complete todos');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner">Loading your todos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Enhanced Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome back! 👋</h1>
            <p className="welcome-subtitle">Let's make today productive</p>
          </div>
          <div className="date-section">
            <p className="current-date">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="stats-container">
          <div className="stat-card total">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>{stats.total_todos}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{stats.pending_todos}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="stat-card completed">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.completed_todos}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-card rate">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{stats.completion_rate}%</h3>
              <p>Success Rate</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.completion_rate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Enhanced Form Section */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-header">
              <h2>✨ Add New Task</h2>
              <p>What would you like to accomplish today?</p>
            </div>
            <TodoForm onAddTodo={handleAddTodo} />
          </div>
        </div>

        {/* Enhanced Todos Section */}
        <div className="todos-section">
          <div className="todos-header">
            <div className="section-title">
              <h2>📝 Your Tasks</h2>
              <p className="task-count">{filteredTodos.length} {filter === 'all' ? 'total' : filter} tasks</p>
            </div>
            
            <div className="todos-controls">
              <div className="control-group">
                <div className="filter-controls">
                  <label>🔍 Filter:</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="modern-select"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="sort-controls">
                  <label>📊 Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="modern-select"
                  >
                    <option value="created_at">Date Created</option>
                    <option value="updated_at">Last Updated</option>
                    <option value="title">Title</option>
                    <option value="completed">Status</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="modern-select"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>

              {stats.pending_todos > 0 && (
                <button
                  onClick={handleBulkComplete}
                  className="bulk-complete-btn"
                >
                  🚀 Complete All ({stats.pending_todos})
                </button>
              )}
            </div>
          </div>

          <div className="todos-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {filter === 'all' ? '📝' : filter === 'completed' ? '🎉' : '⏳'}
                </div>
                <h3>
                  {filter === 'all' 
                    ? 'No tasks yet!' 
                    : filter === 'completed' 
                      ? 'No completed tasks' 
                      : 'No pending tasks'}
                </h3>
                <p>
                  {filter === 'all'
                    ? 'Start your productivity journey by adding your first task!'
                    : filter === 'completed'
                      ? 'Complete some tasks to see them here.'
                      : 'Great job! All tasks are completed.'}
                </p>
              </div>
            ) : (
              <div className="todos-grid">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
