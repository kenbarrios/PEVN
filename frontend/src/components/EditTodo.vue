<template>
  <div>
    <h2>Edit: {{ h2 }}</h2>
    <br />
    <br />
    <div>
      <input type="text" v-model="title">
      <button @click="updateTodo">Edit</button>
    </div>
    <br />
    <div>
      <h3>Add Item</h3>
    </div>
    <br />
    <div>
      <h3>Item List</h3>
      <ul>
        <li v-for="(item, i) in todoItems" :key="item.id">
          <input type="text" v-model="todoItems[i].content">
          <button @click="updateItemContent(item.id, i)">Edit</button>
          <button @click="updateItemComplete(item.id, i)">{{ todoItems[i].complete }}</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import TodoService from '@/http/TodoService'
import TodoItemService from '@/http/TodoItemService'

export default {
  name: 'EditTodo',
  data () {
    return {
      h2: '',
      title: '',
      todoItems: []
    }
  },

  mounted () {
    this.fetchTodo()
  },

  methods: {
    async fetchTodo () {
      const resp = await TodoService.fetchTodo({
        todoId: this.$route.params.todoId
      })
      this.h2 = resp.data.title
      this.title = this.h2
      this.todoItems = resp.data.todoItems
    },

    async updateTodo () {
      const resp = await TodoService.updateTodo({
        todoId: this.$route.params.todoId,
        title: this.title
      })
      this.h2 = resp.data.title
      this.title = this.h2
      this.todoItems = resp.data.todoItems
    },

    async updateItemContent (itemId, i) {
      await TodoItemService.updateItem({
        todoId: this.$route.params.todoId,
        itemId: itemId,
        content: this.todoItems[i].content
      })
    },

    async updateItemComplete (itemId, i) {
      const resp = await TodoItemService.updateItem({
        todoId: this.$route.params.todoId,
        itemId: itemId,
        complete: !this.todoItems[i].complete
      })
      this.todoItems[i].complete = resp.data.complete
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  width: 90%;
  margin: 10px auto;
  list-style: none;
  }

ul li input {
  width: 100%;
  text-align: center;
}
</style>
