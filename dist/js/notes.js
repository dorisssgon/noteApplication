var Note = (function () {
  'use strict';

  function dragElement(element) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    element.children[0].onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (element.offsetTop - pos2 > 0) {
        element.style.top = element.offsetTop - pos2 + "px";
      } else {
        element.style.top = 0;
      }
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Note = function () {
    function Note(text, top, left, height, width, color) {
      classCallCheck(this, Note);

      this.text = text || '';
      this.top = top || Math.floor(20 * Math.random() * 20);
      this.left = left || Math.floor(30 * Math.random() * 30);
      this.height = height || 300;
      this.width = width || 300;
      this.color = color || '#' + Math.floor(Math.random() * 16777215).toString(16);
      this.header = null;
      this.content = null;
      this.handle = null;
      this.el = this.createElement();
    }

    // note structure control


    createClass(Note, [{
      key: 'render',
      value: function render(node) {
        node.appendChild(this.el);
      }
    }, {
      key: 'createElement',
      value: function createElement(node) {
        var note = document.createElement('div');
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
    }, {
      key: 'createHeader',
      value: function createHeader() {
        var header = document.createElement('div');
        header.style.width = this.width + 'px';
        header.style.height = '20px';
        header.style.backgroundColor = 'grey';
        header.classList.add("header");
        var closeButton = document.createElement('i');
        closeButton.onclick = this.destroy.bind(this);
        closeButton.classList.add('fas', 'fa-times');
        var settingButton = document.createElement('i');
        settingButton.onclick = function () {
          var color = prompt("Please enter your color", this.color);
          this.color = color || this.color;
          this.rerender();
        }.bind(this);
        settingButton.classList.add('fas', 'fa-cog');
        header.appendChild(closeButton);
        header.appendChild(settingButton);
        this.header = header;
        return header;
      }
    }, {
      key: 'createContent',
      value: function createContent() {
        var content = document.createElement('div');
        content.classList.add("content");
        content.style.width = this.width + 'px';
        content.style.height = '280px';
        content.innerHTML = this.text;
        content.setAttribute("contenteditable", true);
        this.content = content;
        return content;
      }
    }, {
      key: 'rerender',
      value: function rerender() {
        this.el.style.backgroundColor = this.color;
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.header.style.width = this.width + 'px';
        this.content.style.width = this.width + 'px';
        this.content.style.height = this.height - 20 + 'px';
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.el.remove();
      }
    }, {
      key: 'createHandle',
      value: function createHandle() {
        var handle = document.createElement('div');
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

    }, {
      key: 'resizeMouseDown',
      value: function resizeMouseDown(e) {
        e = e || window.event;
        document.onmouseup = this.closeResizeElement.bind(this);
        document.onmousemove = this.elementResize.bind(this);
      }
    }, {
      key: 'elementResize',
      value: function elementResize(e) {
        e = e || window.event;
        this.width = e.clientX - this.left;
        this.height = e.clientY - this.top;
        this.rerender();
      }
    }, {
      key: 'closeResizeElement',
      value: function closeResizeElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
      // end

    }]);
    return Note;
  }();

  return Note;

}());
