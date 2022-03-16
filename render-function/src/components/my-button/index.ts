import Vue, { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import './style.scss';
@Component({

})
export class MyButton extends Vue {
  user = {
    name: 'alex',
  };
  footer = {
    type: 'footer',
  };

  showFooter = true;
  on = {} as any;

  created() {
    this.on.click = function (this: MyButton) {
      console.log('clicked');
      this.showFooter = !this.showFooter;
    }.bind(this);

    // this is for v-model
    this.$on('from-input', (e: string) => {
      this.footer.type = e;
    });

  }


  render(h: CreateElement) {
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    // const self = this;
    return h('div', [
      h('div', [this.$slots.default]),
      h('div', {
        staticStyle: {
          'display': 'flex',
          'justify-content': 'center',
        }
      }, [
        h('label', {
          attrs: {
            for: 'test-input'
          },
          staticStyle: {
            'margin-right': '16px'
          },
        }, 'example of v-model inside render function:'),
        h('input', {
          attrs: {
            id: 'test-input',
          },
          domProps: {
            value: this.footer.type,
          },
          on: {
            input: (event: Event) => {
              const target = (<HTMLInputElement>event.target);
              // this.footer.type = target.value;
              this.$emit('from-input', target.value);
            },
          },
        }),
        // this.$scopedSlots.footer!({
        //   footer: this.footer,
        // }),
      ]),
      this.$scopedSlots.default!({
        user: this.user,
        on: this.on,
      }),
      h('div', {
        staticStyle: {
          'display': 'flex',
          'justify-content': 'center',
        },
        staticClass: 'footer',
        style: this.showFooter ? 'display:flex' : 'display:none',
      }, this.$scopedSlots.footer!({
        footer: this.footer,
      })),
    ]);
  }
}
