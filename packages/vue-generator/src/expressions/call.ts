import { PropertyAccessChain } from '@devextreme-generator/angular';
import {
  Identifier,
  ObjectLiteral,
  PropertyAssignment,
  SimpleExpression,
  SyntaxKind,
  Call as BaseCall,
} from '@devextreme-generator/core';

import { toStringOptions } from '../types';

export class Call extends BaseCall {
  compileTypeArguments() {
    return '';
  }

  compileHasOwnProperty(value: string, _options?: toStringOptions): string {
    return `this.props.${value} !== undefined || this.$options.propsData.hasOwnProperty("${value}")`;
  }
}
export class New extends Call {
  toString(options?: toStringOptions): string {
    const componentInputs = options?.componentInputs || [];
    if (componentInputs.length) {
      const matchedInput = componentInputs.find(
        (c) => c.name === this.expression.toString(),
      );
      if (matchedInput?.members.some((m) => m.isNested)) {
        const defaultValue = new PropertyAccessChain(
          this.expression,
          SyntaxKind.QuestionDotToken,
          new Identifier('__defaultNestedValues.default()'),
        );
        return defaultValue.toString();
      }
      if (matchedInput?.members?.length) {
        const objectFields = matchedInput.members.map(
          (prop) => new PropertyAssignment(
            prop._name,
            new PropertyAccessChain(
              this.expression,
              SyntaxKind.QuestionDotToken,
              new PropertyAccessChain(
                prop._name,
                SyntaxKind.QuestionDotToken,
                new SimpleExpression('default()'),
              ),
            ),
          ),
        );
        return new ObjectLiteral(objectFields, true).toString(options);
      }
      if (matchedInput) {
        return this.expression.toString();
      }
    }
    return `${SyntaxKind.NewKeyword} ${super.toString(options)}`;
  }
}
