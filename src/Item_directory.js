import React, { Component } from "react";
import Item_disp from "./Item_disp";
import Radium, { StyleRoot } from "radium";
import { fadeInLeft, fadeOutLeft } from "react-animations";

import $ from "jquery";

const defaultDirect = {
  direct: "null",
  year: 0,
  season: "null"
};

const styles = {
  fadeInLeft: {
    animation: "x 0.3s",
    animationName: Radium.keyframes(fadeInLeft, "fadeInLeft")
  },

  fadeOutLeft: {
    animation: "x 0.3s",
    animationName: Radium.keyframes(fadeOutLeft, "fadeOutLeft")
  }
};

class Item_directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isItemShow: false,
      isRender: false
    };
  }

  toggleItem = () => {
    this.setState({
      isItemShow: !this.state.isItemShow
    });
  };

  onMenuClicked = ev => {
    // 被点击的<h1>
    let node = $(ev.target);

    // 属于<h1>的相邻子菜单列表
    let subMenu = node.next();

    // 显示/隐藏这个列表
    subMenu.css("display", subMenu.css("display") == "none" ? "block" : "none");
    subMenu.css("margin-left", 20);
    this.setState({
      isRender: true
    });
  };

  generateMenu = data => {
    let dom = [];

    if (data.type == "dir") {
      let list = [];
      if (this.state.isRender) {
        for (let item of data.children) {
          list.push(this.generateMenu(item));
        }
      }
      dom.push(
        <div
          className="Directory"
          key={data.name ? data.name : defaultDirect.direct}
        >
          <div
            onClick={this.onMenuClicked}
            key={data.name ? data.name + 1 : defaultDirect.direct + 1}
          >
            <i
              className="far fa-folder-open"
              key={data.name ? data.name + 2 : defaultDirect.direct + 2}
            ></i>
            {data.name ? data.name : defaultDirect.direct}
          </div>
          <div
            style={{ display: "none" }}
            key={data.name ? data.name + 3 : defaultDirect.direct + 3}
          >
            <div
              style={styles.fadeInLeft}
              key={data.name ? data.name + 4 : defaultDirect.direct + 4}
            >
              {list}
            </div>
          </div>
        </div>
      );
    } else {
      dom.push(
        <div className="itemContainer">
          <Item_disp item={data.data} />
        </div>
      );
    }

    return dom;
  };

  render() {
    return (
      <div>
        <StyleRoot>{this.generateMenu(this.props.item)}</StyleRoot>
      </div>
    );
  }
}

export default Item_directory;
