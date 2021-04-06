<template>
  <div class="todoApp">
	<h1>TODO</h1>
	<p>
	You have <strong>{{ todos.length }}</strong> tasks on your todo-list.
	</p>
	<input
	v-model="newTodo"
	@keyup.enter="addTodo"
	placeholder="What needs to be done?"
	autofocus
	/>
	<ol>
	<li class="m-b" v-for="todo in todos" :key="todo.id">
		<input type="checkbox" v-model="todo.done" @click="toggleDoneState(todo)"/>
		<label :class="{ done: todo.done }">{{ todo.title }}</label>
		<Button class="danger m-l" @click="removeTodo(todo)">Remove</Button>
	</li>
	</ol>
  </div>
</template>
<script>
import { Button } from '@/components/atoms';

const STORAGE_KEY = 'todos';
export default {
	components: { Button },
	data() {
		return {
			newTodo: '',
			todos: [],
		};
	},
	created() {
		this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	},
	methods: {
		addTodo() {
			this.todos.push({
				id: Date.now(),
				title: this.newTodo,
				done: false,
			});
			this.newTodo = '';
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
		},
		toggleDoneState(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1, {
				...todo,
				done: !todo.done,
			});
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
		},
		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
		},
	},
};
</script>
<style scoped>
.done {
	text-decoration: line-through;
	color:gray;
}
li {
	list-style-type: none;
}
</style>
