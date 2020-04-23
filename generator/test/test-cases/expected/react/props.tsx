function view(model: Widget) {

}
declare type WidgetInput = {
    height: number;
    onClick: (a: number) => null
}
const WidgetInput: WidgetInput = {
    height: 10,
    onClick: () => null
};

import React, { useCallback } from 'react';
interface Widget {
    props: WidgetInput;
    getHeight: () => number;
    restAttributes: any;
}

export default function Widget(props: WidgetInput) {
    const getHeight = useCallback(function getHeight() {
        props.onClick(10)
        return props.height;
    }, [props.onClick, props.height]);

    const __restAttributes=useCallback(function __restAttributes(){
        const { height, onClick, ...restProps } = props;
        return restProps;
    }, [props]);

    return view(({
        props: { ...props },
        getHeight,
        restAttributes: __restAttributes()
    })
    );
}

Widget.defaultProps = {
    ...WidgetInput
}