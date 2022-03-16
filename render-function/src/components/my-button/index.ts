import Vue, { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';

@Component({

})
export class MyButton extends Vue {
  user = {
    name: 'alex',
  };
  footer = {
    type: 'footer',
  };

  show = true;
  on = {} as any;

  created() {
    this.on.click = function (this: MyButton) {
      console.log('clicked');
      // console.log(this);
      // this.$emit.call(this, 'aaaa');
      this.show = !this.show;
      // console.log(this);
    }.bind(this);
  }

  // mounted() {
  //   console.log('***', this.$slots, this.$scopedSlots);
  // }

  render(h: CreateElement) {
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    // const self = this;

    this.$on('input', (e: any) => {
      this.footer.type = e;
    });
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
        }, 'example of v-model'),
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
              this.$emit('input', target.value);
            },
          },
        }),
        this.$scopedSlots.footer!({
          footer: this.footer,
        }),
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
        style: this.show ? 'display:flex' : 'display:none',
      }, this.$scopedSlots.footer!({
        footer: this.footer,
      })),
    ]);
  }
}
