var app = new function() {
  this.el = document.getElementById('tasks');
  this.tasks = [];

  this.FetchAll = function() {
    var data = '';
    if (this.tasks.length > 0) {
      for (var i = 0; i < this.tasks.length; i++) {
        data += '<tr class="row">';
        data += '<td>' + (i + 1) + '. ' + this.tasks[i] + '</td>';
        data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-warning">Edit</button></td>'
        data += '<td><button onclick="app.Delete(' + i + ')" class="btn btn-danger">Delete</button></td>'
        data += '</tr>'
      }
    }
    this.Count(this.tasks.length);
    return this.el.innerHTML = data
  };

  this.Add = function() {
    el = document.getElementById('add-todo');
    var task = el.value;
    if (task) {
      this.tasks.push(task.trim());
      el.value = '';
      this.ResetEdit()
      this.FetchAll();
    }
  };

  this.Edit = function(item) {
    el = document.getElementById('edit-todo');
    el.value = this.tasks[item]
    let targ = document.querySelector('#tasks');
    targ.rows[item].appendChild(document.getElementById('edit-box'))
    document.getElementById('edit-box').style.display = 'block';
    self = this;
    document.getElementById('save-edit').onsubmit = function() {
      var task = el.value;
      self.ResetEdit()
      if (task) {
        self.tasks.splice(item, 1, task.trim());
        self.FetchAll();
        CloseInput();
      }
    }
  };

  this.Delete = function(item) {
    this.ResetEdit()
    this.tasks.splice(item, 1)
    this.FetchAll();
    CloseInput();
  };

  this.ResetEdit = function() {
    document.querySelector('body').appendChild(document.getElementById('edit-box'))
    document.getElementById('edit-box').style.display = 'none';
  }

  this.Count = function(data) {
    var el = document.getElementById('counter');
    var name = 'Tarefas';
    var trecho = document.getElementById('afazeres');
    if (data) {
      if (data == 1) {
        name = 'Tarefa';
      }
      trecho.innerHTML = name;
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = 'Sem ' + name;
      trecho.innerHTML = '';
    }
  };

}

app.FetchAll();

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}