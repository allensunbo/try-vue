import Component from "vue-class-component";
import Vue from "vue";
import template from './template.vue';
import { MyButton } from "@/components/my-button";

@Component({
  components: {
    MyButton
  },
})
export default class HomeView extends Vue.extend(template) {

}