import Vue from 'vue';
import { configure } from '@storybook/vue'

import Button from '../src/components/Button';

// Register custom components.
Vue.component(Button);

configure(require.context('../src', true, /\.stories\.js$/), module)
