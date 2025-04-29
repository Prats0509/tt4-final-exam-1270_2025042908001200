<template>
  <div class="container py-4">
    <h2 class="h3 mb-4">Expense List</h2>

    <!-- Create / Edit form -->
    <form @submit.prevent="isEditing ? updateExpense() : createExpense()"
          class="row gy-2 gx-3 align-items-center mb-5">

      <div class="col-12">
        <input v-model.trim="form.name"
               class="form-control"
               placeholder="Expense name"
               required />
      </div>

      <div class="col-12 col-sm-6">
        <input v-model.number="form.amount" type="number"
               class="form-control"
               placeholder="Amount"
               required />
      </div>

      <div class="col-12 col-sm-6">
        <input v-model.trim="form.category"
               class="form-control"
               placeholder="Category"
               required />
      </div>

      <div class="col-12">
        <input v-model.trim="form.description"
               class="form-control"
               placeholder="Description"
               required />
      </div>

      <div class="col-12 d-flex gap-2">
        <button type="submit"
                class="btn btn-primary flex-grow-1">
          {{ isEditing ? 'Update' : 'Add' }} Expense
        </button>
        <button v-if="isEditing"
                type="button"
                class="btn btn-secondary flex-grow-1"
                @click="cancelEdit">
          Cancel
        </button>
      </div>
    </form>

    <!-- List of expenses -->
    <ul class="list-group">
      <li v-for="e in expenses"
          :key="e.id"
          class="list-group-item d-flex justify-content-between align-items-start">

        <div class="me-3">
          <div class="fw-bold">
            {{ e.name }} — ${{ e.amount }}
          </div>
          <small class="text-muted">
            {{ e.category }} • {{ e.description }}
          </small>
        </div>

        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-primary"
                  @click="editExpense(e)">
            Edit
          </button>
          <button class="btn btn-outline-danger"
                  @click="deleteExpense(e.id)">
            Delete
          </button>
        </div>
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
      form: {
        name: '', amount: null, category: '', description: ''
      },
      isEditing: false,
      editingId: null
    };
  },

  async mounted() {
    await this.fetchExpenses();        // initial load
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
      await this.fetchExpenses();      // refresh list
      this.resetForm();
    },

    /* ---------- UPDATE ---------- */
    async updateExpense() {
      await ExpenseService.updateExpense(
        this.editingId,
        { ...this.form, id: this.editingId }
      );
      await this.fetchExpenses();      // refresh list
      this.cancelEdit();
    },

    /* ---------- DELETE ---------- */
    async deleteExpense(id) {
      if (!confirm('Delete this expense?')) return;
      await ExpenseService.deleteExpense(id);
      await this.fetchExpenses();      // refresh list
    },

    /* ---------- helpers ---------- */
    editExpense(e) {
      this.isEditing = true;
      this.editingId = e.id;
      this.form = {
        name: e.name,
        amount: e.amount,
        category: e.category,
        description: e.description
      };
    },

    cancelEdit() {
      this.resetForm();
      this.isEditing = false;
      this.editingId = null;
    },

    resetForm() {
      this.form = {
        name: '', amount: null, category: '', description: ''
      };
    }
  }
};
</script>

<style scoped>

</style>
