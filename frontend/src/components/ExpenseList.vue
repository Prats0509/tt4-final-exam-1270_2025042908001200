<template>
  <div>
    <h2>Expense List</h2>

    <!-- Form for creating or editing an expense -->
    <form @submit.prevent="isEditing ? updateExpense() : createExpense()">
      <input
        v-model.trim="form.name"
        type="text"
        placeholder="Expense name"
        required
      />
      <input
        v-model.number="form.amount"
        type="number"
        placeholder="Amount"
        required
      />
      <input
        v-model.trim="form.category"
        type="text"
        placeholder="Category"
        required
      />
      <input
        v-model.trim="form.description"
        type="text"
        placeholder="Description"
        required
      />
      <button type="submit">
        {{ isEditing ? 'Update' : 'Add' }} Expense
      </button>
      <button v-if="isEditing" type="button" @click="cancelEdit()">
        Cancel
      </button>
    </form>

    <!-- List of expenses with Edit/Delete actions -->
    <ul>
      <li v-for="expense in expenses" :key="expense.id">
        {{ expense.name }} — ${{ expense.amount }}
        ({{ expense.category }} • {{ expense.description }})
        <button @click="editExpense(expense)">Edit</button>
        <button @click="deleteExpense(expense.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ExpenseService from '../services/ExpenseService';

export default {
  name: 'ExpenseList',
  data() {
    return {
      expenses: [],
      form: { name: '', amount: null, category: '', description: '' },
      isEditing: false,
      editingId: null,
    };
  },
  async mounted() {
    await this.fetchExpenses();            // initial load
  },
  methods: {
    /* ---------- shared ---------- */
    async fetchExpenses() {
      const { data } = await ExpenseService.getAllExpenses();
      this.expenses = data;
    },

    /* ---------- CREATE ---------- */
    async createExpense() {
      await ExpenseService.addExpense(this.form);
      await this.fetchExpenses();          // auto-refresh
      this.resetForm();
    },

    /* ---------- UPDATE ---------- */
    async updateExpense() {
      await ExpenseService.updateExpense(this.editingId, {
        ...this.form,
        id: this.editingId,
      });
      await this.fetchExpenses();          // auto-refresh
      this.cancelEdit();
    },

    /* ---------- DELETE ---------- */
    async deleteExpense(id) {
      if (!confirm('Delete this expense?')) return;
      await ExpenseService.deleteExpense(id);
      await this.fetchExpenses();          // auto-refresh
    },

    /* ---------- helpers ---------- */
    editExpense(expense) {
      this.isEditing = true;
      this.editingId = expense.id;
      this.form = {
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
      };
    },

    cancelEdit() {
      this.resetForm();
      this.isEditing = false;
      this.editingId = null;
    },

    resetForm() {
      this.form = { name: '', amount: null, category: '', description: '' };
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 1em;
}
form input {
  margin-right: 0.5em;
}
button {
  margin-left: 0.5em;
}
</style>
