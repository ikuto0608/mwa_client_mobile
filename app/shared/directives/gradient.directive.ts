import { Directive, ElementRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as application from 'application';
import { Color } from 'color';
import { Page } from 'ui/page';
import { View } from 'ui/core/view';

declare var android: any;
declare var NSMutableArray: any;
declare var CAGradientLayer: any;
declare var interop: any;

@Directive({
  selector: '[gradient]'
})
export class GradientDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input('gradient')
  start: string;

  @Input('endColor')
  end: string;

  private loadedEventFn: () => void;

  constructor(private el: ElementRef, private page: Page) {
  }

  ngOnInit() {
    const view = this.el.nativeElement;
    const startColor: Color = new Color(this.start);
    view.backgroundColor = startColor;

    this.loadedEventFn = () => {
      this.setGradient();
    };

    this.page.on(Page.loadedEvent, this.loadedEventFn);

    try {
      const oldOnSizeChangedFn = this.el.nativeElement._onSizeChanged;
      if (this.el.nativeElement.ios) {
        this.el.nativeElement._onSizeChanged = () => {
          oldOnSizeChangedFn.call(this.el.nativeElement);

          this.setGradient();
        };
      }
    } catch (exp) {
      console.log(exp);
    }
  }

  ngAfterViewInit() {
    this.setGradient();
  }

  ngOnDestroy() {
    console.log(`GradientDirective.ngOnDestroy()`);

    this.page.off(Page.loadedEvent, this.loadedEventFn);
  }

  public setGradient() {
    console.log(`GradientDirective.setGradient()`);

    const startColor: Color = new Color(this.start);
    const endColor: Color = new Color(this.end);

    const view = this.el.nativeElement;
    if (view.android) {
      let backgroundDrawable = view.android.getBackground();
      const orientation = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
      const LINEAR_GRADIENT: number = 0;

      // If it isn't already gradient... make it so.
      if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
        backgroundDrawable = new android.graphics.drawable.GradientDrawable();
        backgroundDrawable.setColors([startColor.android, endColor.android]);
        backgroundDrawable.setGradientType(LINEAR_GRADIENT);
        backgroundDrawable.setOrientation(orientation);
        this.el.nativeElement.android.setBackgroundDrawable(backgroundDrawable);
      }
    } else if (view.ios && view._nativeView && view._nativeView.bounds) {
      const nativeView = view._nativeView;
      const colorsArray = NSMutableArray.alloc().initWithCapacity(2);
      colorsArray.addObject(interop.types.id(startColor.ios.CGColor));
      colorsArray.addObject(interop.types.id(endColor.ios.CGColor));

      const gradientLayer = CAGradientLayer.layer();
      gradientLayer.colors = colorsArray;
      gradientLayer.frame = nativeView.bounds;
      nativeView.layer.insertSublayerAtIndex(gradientLayer, 0);
    }
  }
}
