interface ClickableIf {
  isClickable: boolean;
  hovering: boolean;
  onClick: Function;
  onMouseEnter: Function;
  onMouseLeave: Function;
  onMouseUp: Function;
  onMouseDown: Function;

  judgeHover(event: MouseEvent): boolean;
  isHover(): boolean;
}

export default ClickableIf;
