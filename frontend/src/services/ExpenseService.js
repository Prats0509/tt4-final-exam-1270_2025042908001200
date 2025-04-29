// /src/services/ExpenseService.js
import axios from 'axios';

const API_URL = 'http://localhost:5086/api/expenses';

export default {
  // CREATE
  addExpense(expense) {
    // expense: { name: string, amount: number }
    return axios.post(API_URL, expense);
  },

  // READ all
  getAllExpenses() {
    return axios.get(API_URL);
  },

  // READ one
  getExpense(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  // UPDATE
  updateExpense(id, expense) {
    // expense must include the matching ID
    return axios.put(`${API_URL}/${id}`, expense);
  },

  // DELETE
  deleteExpense(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
