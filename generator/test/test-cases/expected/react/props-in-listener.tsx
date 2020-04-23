function viewModel() { }

function view() { }

import React, { useCallback } from 'react';

interface Component {
  type?: string;
  onClick?: () => void;
  clickHandler: () => any;
  restAttributes: any;
}

export function Component(props: {
  type?: string,
  onClick?: () => void
}) {
  const clickHandler = useCallback(function clickHandler() {
    props.onClick!({
      type: props.type
    })
  }, [props.onClick, props.type]);
  const __restAttributes=useCallback(function __restAttributes(){
    const { onClick, type, ...restProps } = props;
    return restProps;
  }, [props]);

  return view(viewModel({
    ...props,
    clickHandler,
    restAttributes: __restAttributes()
  }));
}
