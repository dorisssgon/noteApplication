import dragElement from './dragElement.js'
class Note {
  constructor(text, top, left, height, width, color) {
    this.text = text || '';
    this.top = top || Math.floor(20*Math.random()*20);  
    this.left = left || Math.floor(30*Math.random()*30);  
    this.height = height || 300;
    this.width = width || 300;
    this.color = color ||'#'+Math.floor(Math.random()*16777215).toString(16);
    this.header = null;
    this.content = null;
    this.handle = null;
    this.el = this.createElement();
  }

  // note structure control
  render(node) {
    node.appendChild(this.el);
  }

  createElement(node) {
    const note = document.createElement('div');
    note.classList.add("note");
    note.style.height = this.height + 'px';
    note.style.width = this.width + 'px';
    note.style.top = this.top + 'px';
    note.style.left = this.left + 'px';
    note.style.backgroundColor = this.color;
    note.appendChild(this.createHeader());
    note.appendChild(this.createContent());
    note.appendChild(this.createHandle());
    dragElement(note);
    return note;
  }

  createHeader() {
    const header = document.createElement('div');
    header.style.width = this.width + 'px';
    header.style.height = '20px';
    header.style.backgroundColor = 'grey';
    header.classList.add("header");
    const closeButton = document.createElement('i');
    closeButton.onclick = this.destroy.bind(this);
    closeButton.classList.add('fas', 'fa-times');
    const settingButton = document.createElement('i');
    settingButton.onclick = function () {
      let color = prompt("Please enter your color", this.color);
      this.color = color || this.color;
      this.rerender()
    }.bind(this)
    settingButton.classList.add('fas', 'fa-cog');
    header.appendChild(closeButton);
    header.appendChild(settingButton);
    this.header = header;
    return header;
  }

  createContent() {
    const content = document.createElement('div');
    content.classList.add("content");
    content.style.width = this.width + 'px';
    content.style.height = '280px';
    content.innerHTML = this.text;
    content.setAttribute("contenteditable", true);
    this.content = content;
    return content;   
  }

  rerender() {
    this.el.style.backgroundColor = this.color;
    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';
    this.header.style.width = this.width + 'px';
    this.content.style.width = this.width + 'px';
    this.content.style.height = this.height - 20 + 'px';
  }

  destroy() {
    this.el.remove()
  }
  
  createHandle() {
    const handle = document.createElement('div');
    handle.classList.add('handle');
    handle.style.height = "0px";
    handle.style.width = "0px";
    
    // handle.style.backgroundColor = "black";
    handle.onmousedown = this.resizeMouseDown.bind(this);
    this.handle = handle;
    return handle;
  }

  // end

  // note resize control
  resizeMouseDown(e) {
    e = e || window.event;
    document.onmouseup = this.closeResizeElement.bind(this);
    document.onmousemove = this.elementResize.bind(this);
  }

  elementResize(e) {
    e = e || window.event;
    this.width = (e.clientX - this.left);
    this.height = (e.clientY - this.top);
    this.rerender()
  }

  closeResizeElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  // end
}

export default Note;