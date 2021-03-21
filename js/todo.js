const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  PENDING_KEY = 'PENDING',
  FINISHED_KEY = 'FINISHED',
  PENDING_SELECTOR = ".js-pendingList",
  FINISHED_SELECTOR = ".js-finishedList";

class ToDo {
  constructor(key, selector) {
    this.key = key;
    this.list = document.querySelector(selector);
    this.array = [];
    this.buttonInfos = [];
  }

  load() {
    const loaded = localStorage.getItem(this.key);
    if (loaded) {
      const parsed = JSON.parse(loaded);
      parsed.forEach(item => this.paint(item.id, item.text));
    }
  };

  paint(id, text) {
    const buttons = this.buttonInfos.map(button => this.makeButton(button.text, button.handler.bind(this)));
    const span = this.makeSpan(text);
    const li = this.makeLi(id, span, buttons);
    this.list.appendChild(li);

    this.push(id, text);
    this.save();
  };

  makeButton(text, handler) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.addEventListener("click", handler);
    return button;
  };

  makeSpan(text) {
    const span = document.createElement("span");
    span.innerText = text;
    return span;
  };

  makeLi(id, span, buttons) {
    const li = document.createElement("li");
    buttons.forEach(button => li.appendChild(button));
    li.appendChild(span);
    li.id = id;
    return li;
  };

  push(id, text) {
    this.array.push({ id: id, text: text });
  };

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.array));
  };

  addButton(text, handler) {
    this.buttonInfos.push({ text: text, handler: handler });
  }
};

function clear(from) {
  return function(event) {
    const btn = event.target;
    const li = btn.parentNode;
    from.list.removeChild(li);
    from.array = from.array.filter(item => item.id !== li.id);
    from.save();
  };
}

function move(from, to) {
  return function(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    to.paint(li.id, span.innerHTML);
    clear(from)(event);
  };
}

const pending = new ToDo(PENDING_KEY, PENDING_SELECTOR);
const finished = new ToDo(FINISHED_KEY, FINISHED_SELECTOR);

pending.addButton('❌', clear(pending));
pending.addButton('✅', move(pending, finished));

finished.addButton('❌', clear(finished));
finished.addButton('⏪', move(finished, pending));

function submitHandler(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const id = `${Date.now()}`;
  pending.paint(id, currentValue);
  toDoInput.value = "";
}

function loadData() {
  pending.load();
  finished.load();
}

function init() {
  loadData();
  toDoForm.addEventListener("submit", submitHandler);
}

init();