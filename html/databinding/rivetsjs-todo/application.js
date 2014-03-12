var Todos = Stapes.subclass({
  all: function() {
    return this.getAllAsArray()
  },

  active: function() {
    return _.select(this.all(), function(todo) {
      return !todo.get('done')
    })
  }
})

var Todo = Stapes.subclass({})

var ViewModel = Stapes.subclass({
  constructor: function(todos) {
    this.todos = todos
  },

  init: function() {
    _.bindAll(this, 'setTodos', 'showAll', 'showActive', 'setRemaining', 'add')
    
    this.todos.on('change', this.setTodos)
    this.todos.on('change', this.setRemaining)
    this.showAll()
    this.setRemaining()
  },

  setTodos: function() {
    this.set('todos', this.todos[this.get('filter')]())
  },

  showAll: function() {
    this.set('filter', 'all')
    this.setTodos()
  },

  showActive: function() {
    this.set('filter', 'active')
    this.setTodos()
  },

  setRemaining: function() {
    this.set('remaining', this.todos.active().length)
  },

  add: function(ev) {
    if(ev.keyCode === 13) {
      todo = new Todo()
      todo.set('summary', ev.currentTarget.value)
      ev.currentTarget.value = ''
      this.todos.push(todo)

      console.log("ev.currentTarget:"+JSON.stringify(ev.currentTarget))
    }
  }
})

$(document).ready(function() {
  app = new ViewModel(new Todos())
  app.init()
  rivets.bind($('#todo-list'), {app: app})
})