import React from "react";
import "./WebPreviewArea.css";

// TODO: copulate the data in on_click()
//try to parse and get data from handleClick() callback ()
// in propsPanel Component.
class WebPreviewArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.dragover_handler = this.dragover_handler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.on_click = this.on_click.bind(this);
    this.drag_start = this.drag_start.bind(this);
  }

  on_click(e, data) {
    this.props.handleClick(e.target.outerHTML);
    console.log(e.target.outerHTML);
  }

  componentDidMount() {
    // set height in pixels after element is scaled to 100% of height, for adding scrollbar
    var e = document.getElementById("prev");
    var h = e.clientHeight;
    e.style.height = h + "px";
  }
  drag_start(e) {}

  drop_handler(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("attributes");
    data = JSON.parse(data);
    var ele = React.createElement(
      data.tag,
      { ...data, onClick: this.on_click, onDragStart: this.drag_start },
      data.content
    );
    this.setState((state, props) => ({
      data: [...state.data, ele]
    }));
  }

  dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  render() {
    return (
      <div
        id="prev"
        className="dragArea"
        onDrop={this.drop_handler}
        onDragOver={this.dragover_handler}
      >
        {this.state.data}
      </div>
    );
  }
}

export default WebPreviewArea;
