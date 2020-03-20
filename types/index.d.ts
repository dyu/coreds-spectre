declare global {
  /**
   * Based from `https://github.com/adamhaile/surplus` and `babel-plugin-jsx-dom-expressions`.
   */
  namespace JSX {
    interface Element extends HTMLElement {}

    // Let TS know the name of the `children` property in order for it to be able to type check them.
    // https://github.com/Microsoft/TypeScript/issues/18357
    interface ElementChildrenAttribute {
      children: {}
    }

    //type Child = Element | string | number | boolean | null | undefined
    //type Children = Child | Child[] | ( Child | Child[] )[] | ( () => Child ) | ( () => Child[] )

    interface EventHandler<T, E extends Event> {
      ( e: E & { currentTarget: T } ): void
    }

    // Intrinsic attributes enable us to define certain keys as attributes on an element, while
    // at the same time hiding them from the element's `props`.
    // https://github.com/Microsoft/TypeScript/issues/5478
    interface IntrinsicAttributes {
      forwardRef?: any
    }

    // https://github.com/ryansolid/babel-plugin-jsx-dom-expressions#special-binding
    //
    // NOTE: this is where we add custom attrs
    interface CustomAttributes<T> {
      forwardRef?: (el: T) => void
      $value?: (el: T, k: string, v: any) => void
    }

    // Lowercase events are considered directly bound events, while camelCased events are delegated.
    // https://github.com/ryansolid/babel-plugin-jsx-dom-expressions#oneventname--model
    interface DOMAttributes<T> extends CustomAttributes<T> {
      
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {
      
    }

    interface SVGAttributes<T> extends HTMLAttributes<T> {
      
    }

    interface IntrinsicElements {
      
    }
  }
}

export {}
