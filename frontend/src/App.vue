<template>
  <div id="app">
    <h1>Expense Tracker</h1>
    <ExpenseList />
  </div>
</template>

<script>
import ExpenseList from './components/ExpenseList.vue';

export default {
  name: 'App',
  components: {
    ExpenseList
  }
};
</script>
